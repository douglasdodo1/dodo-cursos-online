"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FileText, Type, Loader2, Save, Video, Hash, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { lessonDto } from "@/dtos/lesson-dto";
import { LessonFormData, lessonSchema } from "../schemas/lesson-schema";

export const LessonForm = ({ courseId, creatorId }: { courseId: number; creatorId: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const router = useRouter();

  const mockLesson: lessonDto = {
    id: 1,
    title: "React Avançado",
    status: "published",
    description: "Curso de React Avançado",
    order: 1,
    video_url: "https://www.youtube.com/watch?v=1",
    duration: 120,
    course_id: courseId,
    creator_id: creatorId,
  };

  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: mockLesson,
  });

  const handleSubmit = async (data: LessonFormData) => {
    setIsLoading(true);
    console.log("Enviando:", data);
    await sleep(2000);
    setIsLoading(false);
  };

  const handleCancel = () => {
    router.back();
  };

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
                  disabled={isLoading}
                  className={`h-12 bg-black/40 backdrop-blur-sm border-2 text-white placeholder:text-gray-500 ${
                    fieldState.error
                      ? "border-red-500/50 focus:border-red-400"
                      : "border-gray-700/50 focus:border-green-500/50"
                  }`}
                />
              </FormControl>
              <FormMessage />
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
                  disabled={isLoading}
                  className={`min-h-[100px] bg-black/40 backdrop-blur-sm border-2 text-white ${
                    fieldState.error ? "border-red-500/50" : "border-gray-700/50 focus:border-green-500/50"
                  }`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-amber-50">Status</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="published | draft | archived"
                    disabled={isLoading}
                    className="h-12 bg-black/40 backdrop-blur-sm border-2 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-amber-50">
                  <Hash className="h-4 w-4 text-green-400" />
                  Ordem
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    disabled={isLoading}
                    className="h-12 bg-black/40 backdrop-blur-sm border-2 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-amber-50">
                  <Video className="h-4 w-4 text-green-400" />
                  URL do Vídeo
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://youtube.com/..."
                    disabled={isLoading}
                    className="h-12 bg-black/40 backdrop-blur-sm border-2 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-amber-50">
                  <Clock className="h-4 w-4 text-red-400" />
                  Duração (min)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    disabled={isLoading}
                    className="h-12 bg-black/40 backdrop-blur-sm border-2 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 h-12 border-gray-700 text-gray-300 bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 text-black"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Salvar Aula
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
