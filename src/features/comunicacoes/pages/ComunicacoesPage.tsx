import { PlusCircleIcon } from "@phosphor-icons/react";
import { LoadingSpinner } from "@shared/components";
import { Button } from "@shared/components/ui/button";
import Divider from "@shared/components/ui/divider";
import { Suspense } from "react";
import {
  createColumns,
  DataTable,
  ModalComunicacao,
  ModalDeleteConfirm,
} from "../components";
import { useComunicacoes, useModals, useSearch } from "../hooks";
import type { ComunicacaoForm } from "../types/comunicacao";

export function ComunicacoesPage() {
  const {
    comunicacoes,
    isLoading,
    error,
    createComunicacao,
    updateComunicacao,
    deleteComunicacao,
  } = useComunicacoes();

  const {
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    selectedComunicacao,
    openAddModal,
    openEditModal,
    openDeleteModal,
    closeAllModals,
  } = useModals();

  const { filteredComunicacoes, handleSearch } = useSearch(comunicacoes);

  const handleSaveNew = async (data: ComunicacaoForm) => {
    await createComunicacao(data);
  };

  const handleSaveEdit = async (data: ComunicacaoForm) => {
    if (selectedComunicacao) {
      await updateComunicacao(selectedComunicacao.id, data);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedComunicacao) {
      await deleteComunicacao(selectedComunicacao.id);
    }
  };

  const columns = createColumns({
    onEdit: openEditModal,
    onDelete: openDeleteModal,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Carregando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-600">
          Erro ao carregar comunicações: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6 rounded-xl bg-white p-8 shadow-lg">
      {/* Header simples */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-primary text-sm font-medium underline">
            Acessos
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Comunicações</h1>
        </div>
        <Button
          onClick={openAddModal}
          size="default"
          className="flex items-center gap-1.5 rounded-md px-3.5 py-3 transition-opacity duration-300 hover:opacity-80"
        >
          <PlusCircleIcon weight="fill" className="size-5" />
          <span className="hidden sm:block">Nova Comunicação</span>
        </Button>
      </div>
      <Divider />
      <div className="space-y-4">
        {/* Busca simples */}
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Pesquisar..."
            onChange={(e) => handleSearch(e.target.value)}
            className="focus:ring-primary focus:border-primary w-full rounded-md border border-slate-200 px-3 py-2 focus:ring-1 focus:outline-none"
          />
        </div>

        {/* Tabela */}
        <DataTable columns={columns} data={filteredComunicacoes} />
      </div>

      {/* 🚀 Lazy-loaded Modals with Suspense */}
      <Suspense fallback={<LoadingSpinner size="sm" />}>
        <ModalComunicacao
          isOpen={isAddModalOpen}
          onClose={closeAllModals}
          onSave={handleSaveNew}
          isEditing={false}
        />

        <ModalComunicacao
          isOpen={isEditModalOpen}
          onClose={closeAllModals}
          onSave={handleSaveEdit}
          comunicacao={selectedComunicacao}
          isEditing={true}
        />

        <ModalDeleteConfirm
          isOpen={isDeleteModalOpen}
          onClose={closeAllModals}
          onConfirm={handleConfirmDelete}
          comunicacao={selectedComunicacao}
        />
      </Suspense>
    </div>
  );
}
