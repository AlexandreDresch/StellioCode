import { z } from "zod";

const basePlanSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório." }),
  price: z.coerce
    .number()
    .min(0, { message: "Preço deve ser um número positivo." }),
  yearlyPrice: z.coerce
    .number()
    .min(0, { message: "Preço anual deve ser um número positivo." }),
  features: z
    .array(
      z
        .string()
        .min(1, { message: "Cada feature deve ser uma string não vazia." }),
    )
    .nonempty({ message: "Pelo menos uma feature é obrigatória" }),
  description: z.string().min(1, { message: "Descrição é obrigatória." }),
  popular: z.boolean(),
});

export const editPlanSchema = basePlanSchema;

export const addPlanSchema = basePlanSchema.extend({
  period: z.string().min(1, { message: "Período é obrigatório." }),
});
