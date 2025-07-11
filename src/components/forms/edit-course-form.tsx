"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import { FileText, Type, Loader2, Save, CalendarIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { courseSchema } from "../schemas/course-schema";
import { z } from "zod";
import { CourseDto } from "@/dtos/course-dto";

const partialCourseSchema = courseSchema.partial();
export type PartialCourseFormData = z.infer<typeof partialCourseSchema>;

interface EditCourseFormProps {
  initialData: PartialCourseFormData;
  setOpen: (value: boolean) => void;
  setCurrentCourse: React.Dispatch<React.SetStateAction<CourseDto>>;
}

export const EditCourseForm = ({ initialData, setOpen, setCurrentCourse }: EditCourseFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PartialCourseFormData>({
    resolver: zodResolver(partialCourseSchema),
    defaultValues: initialData,
  });

  const handleSubmit = async (data: PartialCourseFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setCurrentCourse((prev) => ({ ...prev, ...data }));
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-amber-50">
                <Type className="h-4 w-4 text-green-400" /> Nome do Curso
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nome do curso"
                  disabled={isLoading}
                  className={`bg-black/40 text-white border-gray-700 ${
                    fieldState.error ? "border-red-500 focus:border-red-400" : "focus:border-green-500"
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
                <FileText className="h-4 w-4 text-green-400" /> Descrição
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descrição do curso"
                  disabled={isLoading}
                  className={`bg-black/40 text-white border-gray-700 resize-none min-h-[100px] ${
                    fieldState.error ? "border-red-500 focus:border-red-400" : "focus:border-green-500"
                  }`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-amber-50">
                  <CalendarIcon className="h-4 w-4 text-green-400" /> Início
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={null}
                        className="h-12 w-full bg-black/40 border-gray-700 text-white px-3 flex items-center justify-between"
                        disabled={isLoading}
                      >
                        {field.value ? format(field.value, "dd/MM/yyyy") : "Escolha a data"}
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-amber-50">
                  <CalendarIcon className="h-4 w-4 text-red-400" /> Término
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={null}
                        className="h-12 w-full bg-black/40 border-gray-700 text-white px-3 flex items-center justify-between"
                        disabled={isLoading}
                      >
                        {field.value ? format(field.value, "dd/MM/yyyy") : "Escolha a data"}
                        <CalendarIcon className="h-5 w-5 text-gray-400" />
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold shadow-lg shadow-green-500/25"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" /> Salvar
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
