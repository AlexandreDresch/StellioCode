import { z } from "zod";

export const editProjectSchema = z.object({
  title: z
    .string()
    .min(1, "O título é obrigatório.")
    .max(100, "O título deve ter no máximo 100 caracteres."),
  description: z
    .string()
    .min(1, "A descrição é obrigatória.")
    .max(500, "A descrição deve ter no máximo 500 caracteres."),
  status: z.enum(["pending", "in_progress", "completed", "cancelled"], {
    errorMap: () => ({ message: "Selecione um status válido." }),
  }),
  price: z
    .number()
    .min(0, "O preço deve ser maior ou igual a 0.")
    .max(1000000, "O preço não pode ser maior que 1.000.000."),
  planName: z.string().min(1, "O nome do plano é obrigatório."),
  serviceName: z.string().min(1, "O nome do serviço é obrigatório."),
});
