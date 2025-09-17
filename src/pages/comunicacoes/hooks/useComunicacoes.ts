import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createComunicacao,
  deleteComunicacao,
  fetchComunicacoes,
  updateComunicacao,
} from "../services/comunicacao.service";
import type { ComunicacaoForm } from "@/types";

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
    mutationFn: ({ data, token }: { data: ComunicacaoForm; token: string }) =>
      createComunicacao(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comunicacoes"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data, token }: { id: string; data: ComunicacaoForm; token: string }) =>
      updateComunicacao(id, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comunicacoes"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      deleteComunicacao(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comunicacoes"] });
    },
  });

  return {
    comunicacoes,
    isLoading,
    error,
   
    createComunicacao: ({ data, token }: { data: ComunicacaoForm; token: string }) =>
      createMutation.mutateAsync({ data, token }),
    
    updateComunicacao: ({ id, data, token }: { id: string; data: ComunicacaoForm; token: string }) =>
      updateMutation.mutateAsync({ id, data, token }),
  
    deleteComunicacao: ({ id, token }: { id: string; token: string }) =>
      deleteMutation.mutateAsync({ id, token }),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}