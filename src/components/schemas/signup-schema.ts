import { z } from "zod";

export const SignupSchema = z.object({
  nome: z
    .string({ required_error: "Nome é obrigatório" })
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome deve ter no maximo 50 caracteres"),
  email: z.string({ required_error: "E-mail é obrigatório" }).email("E-mail inválido"),
  senha: z.string({ required_error: "Senha é obrigatória" }).min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: z.string({ required_error: "Confirmação de senha é obrigatória" }),
});

export type SignUpFormData = z.infer<typeof SignupSchema>;
