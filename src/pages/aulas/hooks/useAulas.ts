import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { aulasService } from "../../../services/aulas.services"

export function useAulas() {
  const queryClient = useQueryClient()

  const aulasQuery = useQuery({
    queryKey: ["aulas"],
    queryFn: aulasService.getAulas,
  })

  const deleteMutation = useMutation({
    mutationFn: aulasService.deleteAula,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aulas"] })
    },
  })

  return {
    aulas: aulasQuery.data ?? [],
    loading: aulasQuery.isLoading,
    deleteAula: deleteMutation.mutate,
  }
}
