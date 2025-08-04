import { z } from "zod";

export const comunicacaoSchema = z.object({
  id: z.string().optional(),
  titulo: z
    .string()
    .min(1, "Título é obrigatório")
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  autor: z
    .string()
    .min(1, "Autor é obrigatório")
    .min(2, "Nome do autor deve ter pelo menos 2 caracteres")
    .max(50, "Nome do autor deve ter no máximo 50 caracteres"),
  tipo: z.enum(["Comunicado", "Aviso", "Notícia"], {
    message: "Tipo deve ser: Comunicado, Aviso ou Notícia",
  }),
  descricao: z
    .string()
    .min(1, "Descrição é obrigatória")
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(1000, "Descrição deve ter no máximo 1000 caracteres"),
});

export type ComunicacaoFormData = z.infer<typeof comunicacaoSchema>;
