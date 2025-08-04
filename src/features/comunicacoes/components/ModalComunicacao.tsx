import { zodResolver } from "@hookform/resolvers/zod";
import {
  PencilSimpleLineIcon,
  PlusCircleIcon,
  ProhibitIcon,
} from "@phosphor-icons/react";
import { Button } from "@shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog";
import { Input } from "@shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/components/ui/select";
import { Textarea } from "@shared/components/ui/textarea";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  comunicacaoSchema,
  type ComunicacaoFormData,
} from "../schemas/comunicacao.schemas";
import type { Comunicacao, ComunicacaoForm } from "../types/comunicacao";

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
  const defaultValues = useMemo<ComunicacaoFormData>(
    () => ({
      titulo: "",
      autor: "",
      tipo: "Comunicado",
      descricao: "",
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ComunicacaoFormData>({
    resolver: zodResolver(comunicacaoSchema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      if (isEditing && comunicacao) {
        reset({
          titulo: comunicacao.titulo,
          autor: comunicacao.autor,
          tipo: comunicacao.tipo,
          descricao: comunicacao.descricao,
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [isEditing, comunicacao, isOpen, reset, defaultValues]);

  const onSubmit = async (data: ComunicacaoFormData) => {
    try {
      await onSave(data);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar comunicação:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar comunicação" : "Adicionar nova postagem"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="titulo" className="text-sm font-medium">
              Título<span className="text-red-500">*</span>
            </label>
            <Input
              id="titulo"
              type="text"
              placeholder="Digite o título"
              {...register("titulo")}
            />
            {errors.titulo && (
              <p className="text-sm text-red-500">{errors.titulo.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="autor" className="text-sm font-medium">
              Autor<span className="text-red-500">*</span>
            </label>
            <Input
              id="autor"
              type="text"
              placeholder="Digite o nome do autor"
              {...register("autor")}
            />
            {errors.autor && (
              <p className="text-sm text-red-500">{errors.autor.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="tipo" className="text-sm font-medium">
              Tipo<span className="text-red-500">*</span>
            </label>
            <Select
              value={watch("tipo")}
              onValueChange={(value) => {
                setValue("tipo", value as ComunicacaoFormData["tipo"], {
                  shouldValidate: true,
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="Comunicado">Comunicado</SelectItem>
                <SelectItem value="Aviso">Aviso</SelectItem>
                <SelectItem value="Notícia">Notícia</SelectItem>
              </SelectContent>
            </Select>
            {errors.tipo && (
              <p className="text-sm text-red-500">{errors.tipo.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="descricao" className="text-sm font-medium">
              Descrição<span className="text-red-500">*</span>
            </label>
            <Textarea
              id="descricao"
              placeholder="Digite a descrição da comunicação"
              {...register("descricao")}
              rows={4}
            />
            {errors.descricao && (
              <p className="text-sm text-red-500">{errors.descricao.message}</p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              className="font-medium text-slate-600"
              onClick={onClose}
              disabled={isSubmitting}
            >
              <ProhibitIcon
                style={{ width: 20, height: 20 }}
                className="text-slate-500"
              />
              Fechar
            </Button>
            <Button type="submit" disabled={isSubmitting || !isValid}>
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
              {isSubmitting
                ? "Salvando..."
                : isEditing
                  ? "Editar"
                  : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
