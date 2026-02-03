import type { ColumnDef } from '@tanstack/react-table';
import TableSort from '@/components/ui/table-sort';
import type { Aula } from '../../aula-presenca/hooks/useAulaPresenca'; 
import { Button } from '@/components/ui/button';
import { PencilSimpleLineIcon, XCircleIcon, QrCodeIcon } from "@phosphor-icons/react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const columns: ColumnDef<Aula>[] = [
  {
    accessorKey: 'subject',
    header: ({ column }) => (
      <TableSort column={column} className="ml-5">
        Título
      </TableSort>
    ),
    cell: ({ row }) => (
      <div className="ml-5 font-medium text-primary hover:text-primary/80">
        {row.original.subject}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <TableSort column={column} align="center">
        Status
      </TableSort>
    ),
    cell: ({ row }) => {
      const status = row.original.students[0]?.status.toUpperCase() || 'AGUARDANDO';

      const getTypeStyles = (status: string) => {
        switch (status) {
          case 'Finalizada':
            return 'bg-green-100 text-green-700';
          case 'Pendente':
            return 'bg-yellow-100 text-yellow-700';
          case 'Em andamento':
          default:
            return 'bg-blue-100 text-blue-700';
        }
      };

      return (
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getTypeStyles(status)}`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <TableSort column={column} align="center">
        Próxima Aula
      </TableSort>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.date);

      return (
        <div className="text-slate-600 font-medium text-sm text-center">
          {row.original.date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : '—'}
        </div>
      );
    },
  },
  {
    id: 'horario',
    header: ({ column }) => (
      <TableSort column={column} align="center">
        Horário
      </TableSort>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      const horaInicio = format(date, "HH:mm");
      return (
        <div className="text-slate-600 font-medium text-sm text-center">
          {horaInicio} - 22:00
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    size: 120,
    cell: ({ row }) => {
      const status = row.original.students[0]?.status.toUpperCase() || 'AGUARDANDO';
      const showQrCode = status === 'AGUARDANDO' || status === 'EM_ANDAMENTO';

      return (
        <div className="flex items-center justify-center gap-1">
          {showQrCode && (
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors"
              aria-label="Acessar aula"
            >
              <QrCodeIcon className="size-5" weight="fill" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors"
            aria-label="Editar aula"
          >
            <PencilSimpleLineIcon className="size-5" weight="fill" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            aria-label="Excluir aula"
          >
            <XCircleIcon className="size-5" weight="fill" />
          </Button>
        </div>
      );
    },
  }
];