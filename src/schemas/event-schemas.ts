import { z } from "zod";

export const editEventSchema = z.object({
  status: z.enum(["pending", "approved", "cancelled"], {
    message: "Status inválido.",
  }),
  date: z.date(),
});
