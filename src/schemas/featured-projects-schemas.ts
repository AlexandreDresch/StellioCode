import { z } from "zod";

export const addFeaturedProjectSchema = z.object({
  title: z.string().min(1, { message: "Nome é obrigatório." }),
});
