import type { Comunicacao } from "@/types";
import { useMemo, useState } from "react";

export function useSearch(comunicacoes: Comunicacao[] = []) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComunicacoes = useMemo(() => {
    if (!searchTerm.trim()) return comunicacoes;

    const lowercaseSearch = searchTerm.toLowerCase();
    return comunicacoes.filter(
      (comunicacao) =>
        comunicacao.titulo.toLowerCase().includes(lowercaseSearch) ||
        comunicacao.autor.toLowerCase().includes(lowercaseSearch) ||
        comunicacao.tipo.toLowerCase().includes(lowercaseSearch) ||
        comunicacao.descricao.toLowerCase().includes(lowercaseSearch)
    );
  }, [comunicacoes, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const hasActiveSearch = searchTerm.trim() !== "";

  return {
    searchTerm,
    filteredComunicacoes,
    handleSearch,
    hasActiveSearch,
  };
}
