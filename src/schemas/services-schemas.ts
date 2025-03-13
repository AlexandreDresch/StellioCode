import { z } from "zod";

const baseServiceSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório." }),
  price: z.coerce
    .number()
    .min(0, { message: "Preço deve ser um número positivo." }),
  description: z.string().min(1, { message: "Descrição é obrigatória." }),
  category: z.string().min(1, { message: "Categoria é obrigatória." }),
  duration: z.string().min(1, { message: "Duração é obrigatória." }),
  isActive: z.boolean(),
});

export const addServiceSchema = baseServiceSchema;

export const editServiceSchema = baseServiceSchema;
