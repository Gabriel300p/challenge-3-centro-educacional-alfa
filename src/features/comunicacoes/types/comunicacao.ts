/**
 * 🎯 Tipos unificados de Comunicação
 *
 * Todos os tipos são inferidos dos schemas Zod para garantir consistência
 * e aproveitar validação runtime + compile time.
 */

// Re-export dos tipos principais dos schemas
export type {
  Comunicacao,
  ComunicacaoCreate,
  ComunicacaoForm,
  ComunicacaoFormData,
  ComunicacaoUpdate,
} from "../schemas/comunicacao.schemas";

// Re-export dos schemas para uso em validações
export {
  comunicacaoCreateSchema,
  comunicacaoFormSchema,
  comunicacaoSchema,
  comunicacaoUpdateSchema,
} from "../schemas/comunicacao.schemas";
