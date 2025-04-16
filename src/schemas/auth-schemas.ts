import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "O e-mail deve ser um texto",
    })
    .email({ message: "Por favor, insira um e-mail válido" })
    .transform((val) => val.trim().toLowerCase()),

  password: z.string().min(1, {
    message: "A senha é obrigatória",
  }),
});
