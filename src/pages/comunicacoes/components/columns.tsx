import { Button } from "@/components/ui/button";
import TableSort from "@/components/ui/table-sort";
import type { Comunicacao } from "@/types";
import { PencilSimpleLineIcon, XCircleIcon } from "@phosphor-icons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ColumnsProps {
  onEdit: (comunicacao: Comunicacao) => void;
  onDelete: (comunicacao: Comunicacao) => void;
}

export const createColumns = ({
  onEdit,
  onDelete,
}: ColumnsProps): ColumnDef<Comunicacao>[] => [
  {
    accessorKey: "titulo",
    header: ({ column }) => (
      <TableSort column={column} className="ml-5">
        Título
      </TableSort>
    ),
    cell: ({ row }) => (
      <div className="ml-5 font-medium text-primary cursor-pointer hover:text-primary/80">
        {row.getValue("titulo")}
      </div>
    ),
  },
  {
    accessorKey: "autor",
    enableSorting: true,
    header: ({ column }) => (
      <TableSort column={column} align="center">
        Autor
      </TableSort>
    ),
    cell: ({ row }) => (
      <div className="text-slate-600 font-medium text-center">
        {row.getValue("autor")}
      </div>
    ),
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => (
      <TableSort column={column} align="center">
        Tipo
      </TableSort>
    ),
    cell: ({ row }) => {
      const tipo = row.getValue("tipo") as string;
      return (
        <div className="flex justify-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {tipo}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "dataCriacao",
    header: ({ column }) => (
      <TableSort column={column} align="center">
        Data criação
      </TableSort>
    ),
    cell: ({ row }) => {
      const date = row.getValue("dataCriacao") as Date;
      return (
        <div className="text-slate-600 font-medium text-sm text-center">
          {format(date, "dd/MM/yyyy", { locale: ptBR })}
        </div>
      );
    },
  },
  {
    accessorKey: "dataAtualizacao",
    header: ({ column }) => (
      <TableSort column={column} align="center">
        Data atualização
      </TableSort>
    ),
    cell: ({ row }) => {
      const date = row.getValue("dataAtualizacao") as Date;
      return (
        <div className="text-slate-600 font-medium text-sm text-center">
          {format(date, "dd/MM/yyyy", { locale: ptBR })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    size: 120, // Define uma largura fixa para a coluna
    cell: ({ row }) => {
      const comunicacao = row.original;

      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors -mr-1 "
            aria-label="Editar comunicação"
            onClick={() => onEdit(comunicacao)}
          >
            <PencilSimpleLineIcon size={24} weight="fill" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            aria-label="Excluir comunicação"
            onClick={() => onDelete(comunicacao)}
          >
            <XCircleIcon size={24} weight="fill" />
          </Button>
        </div>
      );
    },
  },
];
