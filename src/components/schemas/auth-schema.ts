import { z } from "zod";

export const authSchema = z.object({
  email: z.string({ required_error: "E-mail é obrigatório" }).email("E-mail inválido"),
  senha: z.string({ required_error: "Senha é obrigatória" }).min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type AuthFormData = z.infer<typeof authSchema>;
