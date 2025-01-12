import { z } from "zod";

export const editDeveloperSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(50, "O nome pode ter no máximo 50 caracteres."),
  phone: z
    .string()
    .regex(
      /^\(?[1-9]{2}\)?\s?[9]?[6-9]\d{3}-?\d{4}$/,
      "Número de telefone inválido. Deve seguir o formato brasileiro, como (11) 91234-5678.",
    ),
  status: z.enum(["pending", "approved", "rejected"], {
    message: "Status inválido.",
  }),
  level: z.enum(["junior", "mid_level", "senior"], {
    message: "Nível de expertise inválido.",
  }),
  technologies: z
    .array(
      z
        .string()
        .min(1, "O nome da tecnologia deve ter pelo menos 1 caractere."),
    )
    .nonempty("É necessário incluir pelo menos uma tecnologia."),
});
