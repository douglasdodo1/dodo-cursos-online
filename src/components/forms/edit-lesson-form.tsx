"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { lessonSchema } from "../schemas/lesson-schema";
import { z } from "zod";
import { lessonDto } from "@/dtos/lesson-dto";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Loader2, Save } from "lucide-react";

const partialLessonSchema = lessonSchema.partial();
type PartialLessonFormData = z.infer<typeof partialLessonSchema>;

type EditLessonFormProps = {
  initialData: lessonDto;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLessons: React.Dispatch<React.SetStateAction<lessonDto[]>>;
};

export function EditLessonForm({ initialData, setIsOpen, setLessons: setLesson }: EditLessonFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PartialLessonFormData>({
    resolver: zodResolver(partialLessonSchema),
    defaultValues: initialData,
  });

  const handleSubmit = async (data: PartialLessonFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLesson((prevLessons) =>
      prevLessons.map((lesson) => (lesson.id === initialData.id ? { ...lesson, ...data } : lesson))
    );
    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} className="bg-black/40 text-white border-gray-700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} className="bg-black/40 text-white border-gray-700" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-black/40 text-white border-gray-700" />
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
                <FormLabel>Ordem</FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="bg-black/40 text-white border-gray-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL do Vídeo</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-black/40 text-white border-gray-700" />
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
                <FormLabel>Duração</FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="bg-black/40 text-white border-gray-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" onClick={() => setIsOpen(false)} variant="outline" className="border-gray-700">
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-500 text-black">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
