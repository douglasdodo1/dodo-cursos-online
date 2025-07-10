import { z } from "zod";

export const lessonSchema = z.object({
  title: z.string({ required_error: "Titulo é obrigatório" }).min(3, "Titulo deve ter pelo menos 3 caracteres"),
  status: z.enum(["published", "draft", "archived"], {
    required_error: "Status é obrigatório",
  }),
  order: z.number({ required_error: "Ordem é obrigatória" }),
  video_url: z.string({ required_error: "URL do video é obrigatória" }),
  duration: z.number({ required_error: "Duracao é obrigatória" }),
  description: z.string().max(500, "Descrição deve ter no máximo 500 caracteres").optional(),
});

export type LessonFormData = z.infer<typeof lessonSchema>;
