"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FileText, Type, Loader2, Save, Video, Hash, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { LessonFormData, lessonSchema } from "../schemas/lesson-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { lessonDto } from "@/dtos/lesson-dto";
import { lessonService } from "@/service/lessons-api";

type LessonFormProps = {
  courseId: number;
  creatorId: number;
  lessonId?: number;
  initialData?: Omit<lessonDto, "id" | "course_id" | "creator_id"> & {
    id?: number;
    course_id?: number;
    creator_id?: number;
  };
  onSuccess?: (savedLesson: lessonDto) => void;
};

export const LessonForm = ({ courseId, creatorId, lessonId, initialData, onSuccess }: LessonFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: existingLesson, isLoading: isLoadingLesson } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      if (!lessonId) return undefined;
      const lesson = await lessonService.getById(lessonId);
      if (!lesson) throw new Error("Aula não encontrada");
      return lesson;
    },
    initialData: initialData,
    enabled: !!lessonId && !initialData,
  });

  const { mutate: saveLesson, isPending: isSaving } = useMutation({
    mutationFn: async (data: LessonFormData) => {
      if (lessonId) {
        return lessonService.update(lessonId, { ...data, course_id: courseId, creator_id: creatorId });
      }
      return lessonService.create({ ...data, course_id: courseId, creator_id: creatorId });
    },
    onSuccess: (savedLesson) => {
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
      toast.success(lessonId ? "Aula atualizada com sucesso!" : "Aula criada com sucesso!");
      onSuccess?.(savedLesson);
      if (!lessonId) {
        router.back();
      }
    },
    onError: (error) => {
      console.error("Erro ao salvar aula:", error);
      toast.error("Ocorreu um erro ao salvar a aula. Tente novamente.");
    },
  });

  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "draft",
      order: 1,
      video_url: "",
      duration: 30,
    },
  });

  useEffect(() => {
    if (existingLesson) {
      form.reset({
        title: existingLesson.title,
        description: existingLesson.description,
        status: existingLesson.status,
        order: existingLesson.order,
        video_url: existingLesson.video_url,
        duration: existingLesson.duration,
      });
    }
  }, [existingLesson, form]);

  const handleSubmit = (data: LessonFormData) => {
    saveLesson(data);
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoadingLesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-amber-50">
                <Type className="h-4 w-4 text-green-400" />
                Título da Aula
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ex: Introdução aos Hooks"
                  disabled={isSaving || isLoadingLesson}
                  className={`h-12 bg-black/40 backdrop-blur-sm border-2 text-white placeholder:text-gray-500 transition-all duration-200 ${
                    fieldState.error
                      ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                      : "border-gray-700/50 focus:border-green-500/50 focus:ring-green-500/20 hover:border-gray-600/50"
                  }`}
                />
              </FormControl>
              <div className="min-h-[1.25rem] mt-1 text-red-500 text-sm">
                <FormMessage />
              </div>
              <p className="text-xs text-gray-500">Mínimo de 3 caracteres</p>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-amber-50">
                <FileText className="h-4 w-4 text-green-400" />
                Descrição
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Detalhes da aula..."
                  disabled={isSaving || isLoadingLesson}
                  className={`min-h-[120px] bg-black/40 backdrop-blur-sm border-2 text-white placeholder:text-gray-500 transition-all duration-200 resize-none ${
                    fieldState.error
                      ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                      : "border-gray-700/50 focus:border-green-500/50 focus:ring-green-500/20 hover:border-gray-600/50"
                  }`}
                />
              </FormControl>
              <div className="min-h-[1.25rem] mt-1 text-red-500 text-sm">
                <FormMessage />
              </div>
              <p className="text-xs text-gray-500">
                {field.value?.length || 0}/1000 caracteres
                {(field.value?.length ?? 0) > 900 && (
                  <span className="text-yellow-400 ml-2">({1000 - (field.value?.length ?? 0)} restantes)</span>
                )}
              </p>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-amber-50">
                  <Clock className="h-4 w-4 text-green-400" />
                  Status
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <select
                      {...field}
                      disabled={isSaving || isLoadingLesson}
                      className={`h-12 w-full bg-black/40 backdrop-blur-sm border-2 text-white placeholder:text-gray-500 transition-all duration-200 appearance-none pl-3 pr-8 rounded-md ${
                        fieldState.error
                          ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                          : "border-gray-700/50 focus:border-green-500/50 focus:ring-green-500/20 hover:border-gray-600/50"
                      }`}
                    >
                      <option value="draft">Rascunho</option>
                      <option value="published">Publicado</option>
                      <option value="archived">Arquivado</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </FormControl>
                <div className="min-h-[1.25rem] mt-1 text-red-500 text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order"
            render={({ field, fieldState }) => {
              const value = Number(field.value) || 1;
              return (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-amber-50">
                    <Hash className="h-4 w-4 text-green-400" />
                    Ordem
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      value={value}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      disabled={isSaving || isLoadingLesson}
                      className={`h-12 bg-black/40 backdrop-blur-sm border-2 text-white transition-all duration-200 ${
                        fieldState.error
                          ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                          : "border-gray-700/50 focus:border-green-500/50 focus:ring-green-500/20 hover:border-gray-600/50"
                      }`}
                    />
                  </FormControl>
                  <div className="min-h-[1.25rem] mt-1 text-red-500 text-sm">
                    <FormMessage />
                  </div>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="video_url"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-amber-50">
                  <Video className="h-4 w-4 text-green-400" />
                  URL do Vídeo
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://youtube.com/..."
                    disabled={isSaving || isLoadingLesson}
                    className={`h-12 bg-black/40 backdrop-blur-sm border-2 text-white placeholder:text-gray-500 transition-all duration-200 ${
                      fieldState.error
                        ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                        : "border-gray-700/50 focus:border-green-500/50 focus:ring-green-500/20 hover:border-gray-600/50"
                    }`}
                  />
                </FormControl>
                <div className="min-h-[1.25rem] mt-1 text-red-500 text-sm">
                  <FormMessage />
                </div>
                <p className="text-xs text-gray-500">Cole a URL do vídeo (YouTube, Vimeo, etc.)</p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field, fieldState }) => {
              const value = Number(field.value) || 30;
              return (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-amber-50">
                    <Clock className="h-4 w-4 text-red-400" />
                    Duração (min)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        max={240}
                        value={value}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 30)}
                        disabled={isSaving || isLoadingLesson}
                        className={`h-12 bg-black/40 backdrop-blur-sm border-2 text-white transition-all duration-200 ${
                          fieldState.error
                            ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                            : "border-gray-700/50 focus:border-green-500/50 focus:ring-green-500/20 hover:border-gray-600/50"
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-400 text-sm">min</span>
                      </div>
                    </div>
                  </FormControl>
                  <div className="min-h-[1.25rem] mt-1 text-red-500 text-sm">
                    <FormMessage />
                  </div>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving || isLoadingLesson}
            className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSaving || isLoadingLesson}
            className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold shadow-lg shadow-green-500/25 transition-all duration-200"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {lessonId ? "Salvando..." : "Criando..."}
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                {lessonId ? "Salvar Alterações" : "Criar Aula"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
