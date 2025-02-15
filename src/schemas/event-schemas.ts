import { z } from "zod";

export const editEventSchema = z.object({
  description: z
    .string()
    .min(3, "A descrição deve ter pelo menos 3 caracteres.")
    .max(255, "A descrição não pode ter mais de 255 caracteres."),
  status: z.enum(["pending", "approved", "cancelled"], {
    message: "Status inválido.",
  }),
  date: z
    .preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg),
      z.date(),
    )
    .refine((date) => date > new Date(), {
      message: "A data deve ser no futuro.",
    }),
});
