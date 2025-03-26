import { z } from "zod";

export const addFollowUpSchema = z.object({
  progressPercentage: z
    .string({
      required_error: "O percentual de progresso é obrigatório.",
      invalid_type_error:
        "O percentual de progresso deve ser uma string numérica.",
    })
    .refine(
      (value) => !isNaN(parseFloat(value)) && isFinite(Number(value)),
      "O percentual de progresso deve ser um número válido.",
    )
    .transform((value) => Number(value))
    .refine(
      (value) => Number.isInteger(value),
      "O percentual de progresso deve ser um número inteiro.",
    )
    .refine(
      (value) => value >= 0 && value <= 100,
      "O percentual de progresso deve estar entre 0 e 100.",
    ),
  description: z
    .string()
    .min(10, "A descrição deve ter no mínimo 10 caracteres.")
    .nonempty("É necessário incluir uma descrição."),
});
