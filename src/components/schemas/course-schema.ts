import { z } from "zod";

export const courseSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }).min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().max(500, "Descrição deve ter no máximo 500 caracteres").optional(),
  start_date: z.date({ required_error: "Data de inicio é obrigatória" }),
  end_date: z.date({ required_error: "Data de fim é obrigatória" }),
});

export type CourseFormData = z.infer<typeof courseSchema>;
