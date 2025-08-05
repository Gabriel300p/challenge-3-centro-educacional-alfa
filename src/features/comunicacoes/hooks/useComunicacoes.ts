import {
  QUERY_KEYS,
  createMutationOptions,
  createQueryOptions,
} from "@shared/lib/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createComunicacao,
  deleteComunicacao,
  fetchComunicacoes,
  updateComunicacao,
} from "../services/comunicacao.service";
import type { Comunicacao, ComunicacaoForm } from "../schemas/comunicacao.schemas";

// 🚀 Optimized hook with advanced caching and optimistic updates
export function useComunicacoes() {
  // 🔄 Optimized query with centralized configuration
  const {
    data: comunicacoes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.comunicacoes.all,
    ...createQueryOptions.list(fetchComunicacoes),
  });

  // 🚀 Create mutation with optimistic updates
  const createMutation = useMutation(
    createMutationOptions.withOptimisticUpdate<Comunicacao, ComunicacaoForm>({
      mutationFn: createComunicacao,
      queryKey: QUERY_KEYS.comunicacoes.all,
      optimisticUpdateFn: (oldData: unknown, newData: ComunicacaoForm) => {
        const comunicacoesList = oldData as Comunicacao[];
        const optimisticComunicacao: Comunicacao = {
          id: `temp-${Date.now()}`, // Temporary ID
          ...newData,
          dataCriacao: new Date(),
          dataAtualizacao: new Date(),
        };
        return [...comunicacoesList, optimisticComunicacao];
      },
      onError: (error) => {
        console.error("Failed to create comunicacao:", error);
      },
    }),
  );

  // 🚀 Update mutation with optimistic updates
  const updateMutation = useMutation(
    createMutationOptions.withOptimisticUpdate<
      Comunicacao,
      { id: string; data: ComunicacaoForm }
    >({
      mutationFn: ({ id, data }) => updateComunicacao(id, data),
      queryKey: QUERY_KEYS.comunicacoes.all,
      optimisticUpdateFn: (oldData: unknown, { id, data }) => {
        const comunicacoesList = oldData as Comunicacao[];
        return comunicacoesList.map((comunicacao) =>
          comunicacao.id === id ? { ...comunicacao, ...data } : comunicacao,
        );
      },
      onError: (error) => {
        console.error("Failed to update comunicacao:", error);
      },
    }),
  );

  // 🚀 Delete mutation with optimistic updates
  const deleteMutation = useMutation(
    createMutationOptions.withOptimisticUpdate<void, string>({
      mutationFn: deleteComunicacao,
      queryKey: QUERY_KEYS.comunicacoes.all,
      optimisticUpdateFn: (oldData: unknown, id: string) => {
        const comunicacoesList = oldData as Comunicacao[];
        return comunicacoesList.filter((comunicacao) => comunicacao.id !== id);
      },
      onError: (error) => {
        console.error("Failed to delete comunicacao:", error);
      },
    }),
  );

  return {
    comunicacoes,
    isLoading,
    error,
    createComunicacao: createMutation.mutateAsync,
    updateComunicacao: (id: string, data: ComunicacaoForm) =>
      updateMutation.mutateAsync({ id, data }),
    deleteComunicacao: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
