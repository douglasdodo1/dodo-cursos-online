"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FileText, Type, Loader2, Save, CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import { CourseFormData, courseSchema } from "../schemas/course-schema";
import { CourseDto } from "@/dtos/course-dto";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const CourseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const router = useRouter();

  const mockCourse: CourseDto = {
    id: Math.floor(Math.random() * 1000) + 1,
    name: "React Avançado",
    description: "Curso de React Avançado",
    start_date: new Date(),
    end_date: new Date(),
    instructors: [],
  };

  const refinedSchema = courseSchema.refine((data) => data.start_date <= data.end_date, {
    message: "Data de início deve ser anterior ou igual à data de término",
    path: ["start_date"],
  });

  const form = useForm<CourseFormData>({
    resolver: zodResolver(refinedSchema),
    defaultValues: mockCourse,
  });

  const handleSubmit = async (data: CourseFormData) => {
    setIsLoading(true);
    console.log(data);
    await sleep(2000);
    const stored = localStorage.getItem("courses");

    if (stored) {
      const parsed = JSON.parse(stored);
      const updatedCourses = [...parsed, data];
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }

    router.push("/dashboard");
    setIsLoading(false);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-amber-50">
                <Type className="h-4 w-4 text-green-400" />
                Nome do Curso
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Ex: React Avançado - Hooks e Performance"
                  disabled={isLoading}
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
                  placeholder="Descreva o conteúdo e objetivos do curso..."
                  disabled={isLoading}
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
                {field.value?.length || 0}/500 caracteres
                {(field.value?.length ?? 0) > 450 && (
                  <span className="text-yellow-400 ml-2">({500 - (field.value?.length ?? 0)} restantes)</span>
                )}
              </p>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-amber-50">
                  <CalendarIcon className="h-4 w-4 text-green-400" />
                  Data de Início
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={null}
                        className="h-12 w-full bg-black/40 backdrop-blur-sm border-2 border-gray-700 text-white placeholder:text-gray-500 px-3 flex items-center"
                        disabled={isLoading}
                      >
                        {field.value ? format(field.value, "dd/MM/yyyy") : "Escolha data"}
                        <CalendarIcon className="ml-auto h-5 w-5 text-gray-400" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 bg-black/90 rounded-lg shadow-lg">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                      className="bg-black/90 text-white rounded-lg"
                    />
                  </PopoverContent>
                </Popover>
                <div className="min-h-[1.25rem] mt-1 text-red-500 text-sm">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-amber-50">
                  <CalendarIcon className="h-4 w-4 text-red-400" />
                  Data de Término
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={null}
                        disabled={isLoading}
                        className="h-12 w-full bg-black/40 backdrop-blur-sm border-2 border-gray-700 text-white placeholder:text-gray-500 px-3 flex items-center"
                      >
                        {field.value ? format(field.value, "dd/MM/yyyy") : "Escolha data"}
                        <CalendarIcon className="ml-auto h-5 w-5 text-gray-400" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0 bg-black/90 rounded-lg shadow-lg">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                      className="bg-black/90 text-white rounded-lg"
                    />
                  </PopoverContent>
                </Popover>
                <div className="min-h-[1.25rem] mt-1 text-red-500 text-sm">
                  <FormMessage />
                </div>
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
            className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold shadow-lg shadow-green-500/25 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Criando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Criar Curso
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
