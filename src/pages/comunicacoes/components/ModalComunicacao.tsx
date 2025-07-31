import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Comunicacao, ComunicacaoForm } from "@/types";
import {
  PencilSimpleLineIcon,
  PlusCircleIcon,
  ProhibitIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

interface ModalComunicacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ComunicacaoForm) => Promise<void>;
  comunicacao?: Comunicacao | null;
  isEditing?: boolean;
}

export function ModalComunicacao({
  isOpen,
  onClose,
  onSave,
  comunicacao,
  isEditing = false,
}: ModalComunicacaoProps) {
  const [formData, setFormData] = useState<ComunicacaoForm>({
    titulo: "",
    autor: "",
    tipo: "Comunicado",
    descricao: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing && comunicacao) {
      setFormData({
        titulo: comunicacao.titulo,
        autor: comunicacao.autor,
        tipo: comunicacao.tipo,
        descricao: comunicacao.descricao,
      });
    } else {
      setFormData({
        titulo: "",
        autor: "",
        tipo: "Comunicado",
        descricao: "",
      });
    }
  }, [isEditing, comunicacao, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titulo || !formData.autor || !formData.descricao) return;

    setIsLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar comunicação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ComunicacaoForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar comunicação" : "Adicionar nova postagem"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="titulo" className="text-sm font-medium">
              Título<span className="text-red-500">*</span>
            </label>
            <Input
              id="titulo"
              type="text"
              placeholder="Digite o título"
              value={formData.titulo}
              onChange={(e) => handleInputChange("titulo", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="autor" className="text-sm font-medium">
              Autor<span className="text-red-500">*</span>
            </label>
            <Input
              id="autor"
              type="text"
              placeholder="Digite o autor"
              value={formData.autor}
              onChange={(e) => handleInputChange("autor", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="tipo" className="text-sm font-medium">
              Tipo<span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.tipo}
              onValueChange={(value: "Comunicado" | "Aviso") =>
                handleInputChange("tipo", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="Comunicado">Comunicado</SelectItem>
                <SelectItem value="Aviso">Aviso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="descricao" className="text-sm font-medium">
              Descrição
            </label>
            <Textarea
              id="descricao"
              placeholder="Digite a descrição"
              value={formData.descricao}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
              rows={4}
            />
          </div>

          <DialogFooter className="gap-2 ">
            <Button
              type="button"
              variant="outline"
              className="text-slate-600 font-medium"
              onClick={onClose}
              disabled={isLoading}
            >
              <ProhibitIcon
                style={{ width: 20, height: 20 }}
                className="text-slate-500"
              />
              Fechar
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.titulo || !formData.autor}
            >
              {isEditing ? (
                <PencilSimpleLineIcon
                  className="text-white"
                  weight="fill"
                  style={{ width: 20, height: 20 }}
                />
              ) : (
                <PlusCircleIcon
                  className="text-white"
                  weight="fill"
                  style={{ width: 20, height: 20 }}
                />
              )}
              {isLoading ? "Salvando..." : isEditing ? "Editar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
