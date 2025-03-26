import { z } from "zod";

export const editEventSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected"], {
    message: "Status inválido.",
  }),
  date: z
    .union([
      z.date(),
      z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Data inválida.")
        .transform((val) => new Date(val + ":00")),
    ])
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "Data inválida.",
    }),
  time: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Hora inválida. Deve seguir o formato HH:MM.",
  }),
});
