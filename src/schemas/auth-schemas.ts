import { githubRegex, phoneRegex } from "@/lib/utils";
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

export const signUpSchema = z.object({
  fullName: z.string().min(2, "O nome deve ter no mínimo 2 caracteres").max(50),
  email: z.string().email("Insira um email válido"),
  password: z.string(),
  phone: z
    .string()
    .regex(
      phoneRegex,
      "Número de telefone inválido. Deve seguir o formato brasileiro, como (11) 91234-5678",
    ),
  github: z
    .string()
    .min(19, "O link deve ter no mínimo 19 caracteres (https://github.com/u)")
    .max(100, "Link muito longo")
    .regex(
      githubRegex,
      "Digite um link válido do GitHub (ex: https://github.com/seu-usuario)",
    ),
  level: z.enum(["junior", "mid_level", "senior"]),
  technologies: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
      }),
    )
    .min(1, "É necessário incluir pelo menos uma tecnologia."),
});
