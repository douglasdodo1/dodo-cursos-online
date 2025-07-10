import { z } from "zod";

export const instructorSchema = z.object({
  name: z.string().min(3, { message: "Nome muito curto" }),
  email: z.string().email({ message: "E‑mail inválido" }),
  password: z.string().min(6, { message: "Senha muito curta" }),
  bio: z.string().optional(),
  avatar: z.string().url({ message: "URL de avatar inválida" }),
  title: z.string().min(3, { message: "Título muito curto" }),
  expertises: z.array(z.string().min(2)).min(1, { message: "Pelo menos uma expertise" }),
  linkedin: z.string().url({ message: "URL do LinkedIn inválida" }),
  github: z.string().url({ message: "URL do GitHub inválida" }),
});

export type InstructorFormData = z.infer<typeof instructorSchema>;
