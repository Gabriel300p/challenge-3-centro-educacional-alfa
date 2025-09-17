import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import type { ComunicacaoForm } from "@/types";
import { PlusCircleIcon } from "@phosphor-icons/react";
import {
  createColumns,
  DataTable,
  ModalComunicacao,
  ModalDeleteConfirm,
} from "./components";
import { useComunicacoes, useModals, useSearch } from "./hooks";
import { useAuth } from "../../providers/useAuth";
import { toast } from "react-toastify";

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

  const { token, isAuthenticated, user } = useAuth();

  const handleOpenAddModal = () => {
    if (!isAuthenticated || user?.role !== 'professor') {
      toast.error("Você precisa ser um professor para adicionar uma nova comunicação.");
      return;
    }
    openAddModal();
  };

  const handleSaveNew = async (data: ComunicacaoForm) => {
    if (!token) {
      toast.error("Token de autenticação não encontrado.");
      return;
    }
    await createComunicacao({ data, token });
  };

  const handleSaveEdit = async (data: ComunicacaoForm) => {
    if (selectedComunicacao) {
      if (!token) {
        toast.error("Token de autenticação não encontrado.");
        return;
      }
      await updateComunicacao({ id: selectedComunicacao.id, data, token });
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedComunicacao) {
      if (!token) {
        toast.error("Token de autenticação não encontrado.");
        return;
      }
      await deleteComunicacao({ id: selectedComunicacao.id, token });
    }
  };

  const columns = createColumns({
    onEdit: openEditModal,
    onDelete: openDeleteModal,
    canEditOrDelete: user?.role === 'professor'
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
    <div className="mx-auto p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-medium text-primary underline">
            Acessos
          </span>
          <h1 className="text-2xl font-bold text-gray-900">Comunicações</h1>
        </div>
        {user?.role === 'professor' && (
          <Button
            onClick={handleOpenAddModal}
            size="default"
            className="flex items-center gap-1.5 px-3.5 py-3 rounded-md hover:opacity-80 transition-opacity duration-300"
          >
            <PlusCircleIcon weight="fill" className="size-5" />
            <span className="hidden sm:block">Nova Comunicação</span>
          </Button>
        )}
      </div>
      <Divider />
      <div className="space-y-4">
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Pesquisar..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
        <DataTable columns={columns} data={filteredComunicacoes} />
      </div>
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
    </div>
  );
}