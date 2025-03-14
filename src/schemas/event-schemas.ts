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

export const InitialMeetingSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome é obrigatório." })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
      message: "O nome deve conter apenas letras e espaços.",
    }),
  googleId: z.string().min(1, { message: "O Google ID é obrigatório." }),
  profilePicture: z
    .string()
    .url({ message: "A URL da foto de perfil é inválida." })
    .regex(/\.(jpg|jpeg|png|gif)$/i, {
      message:
        "A URL da foto de perfil deve terminar com .jpg, .jpeg, .png ou .gif.",
    }),
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório." })
    .email({ message: "O e-mail fornecido é inválido." }),
  planId: z
    .string()
    .min(1, { message: "O ID do plano é obrigatório." })
    .uuid({ message: "O ID do plano deve ser um UUID válido." }),
  serviceId: z
    .string()
    .min(1, { message: "O ID do serviço é obrigatório." })
    .uuid({ message: "O ID do serviço deve ser um UUID válido." }),
  title: z
    .string()
    .min(1, { message: "O título é obrigatório." })
    .max(100, { message: "O título não pode ter mais de 100 caracteres." }),
  description: z
    .string()
    .min(1, { message: "A descrição é obrigatória." })
    .max(500, { message: "A descrição não pode ter mais de 500 caracteres." }),
  meetingDate: z
    .string()
    .min(1, { message: "A data da reunião é obrigatória." })
    .refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime()) && date >= new Date();
      },
      {
        message:
          "A data da reunião deve ser uma data futura ou presente válida.",
      },
    ),
  phone: z
    .string()
    .min(1, { message: "O telefone é obrigatório." })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "O telefone deve ser um número válido.",
    }),
});
