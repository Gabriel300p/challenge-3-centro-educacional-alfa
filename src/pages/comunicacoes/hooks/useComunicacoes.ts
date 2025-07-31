import type { ComunicacaoForm } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComunicacao,
  deleteComunicacao,
  fetchComunicacoes,
  updateComunicacao,
} from "../services/comunicacao.service";

export function useComunicacoes() {
  const queryClient = useQueryClient();

  const {
    data: comunicacoes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comunicacoes"],
    queryFn: fetchComunicacoes,
  });

  const createMutation = useMutation({
    mutationFn: createComunicacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comunicacoes"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ComunicacaoForm }) =>
      updateComunicacao(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comunicacoes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComunicacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comunicacoes"] });
    },
  });

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
