import type { ColumnDef } from "@tanstack/react-table";
import TableSort from "@/components/ui/table-sort";
import type { Aula } from "../../aula-presenca/hooks/useAulaPresenca";
import { Button } from "@/components/ui/button";
import { PencilSimpleLineIcon, XCircleIcon, QrCodeIcon, } from "@phosphor-icons/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { QRCodeDialog } from "../../aula-presenca/components/QRCodeDialog";
import { Link } from "react-router-dom";
import { deleteAttendance } from "../services/attendance.service";



export const columns: ColumnDef<Aula>[] = [
  {
    accessorKey: "subject",
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
    accessorKey: "status",
    header: ({ column }) => (
      <TableSort column={column} align="center">
        Status
      </TableSort>
    ),
    cell: ({ row }) => {
      const status = row.original.status || "aguardando";

      const getTypeStyles = (status: string) => {
        switch (status) {
          case "finalizada":
            return "bg-green-100 text-green-700";
          case "aguardando":
            return "bg-yellow-100 text-yellow-700";
          case "em_andamento":
          default:
            return "bg-blue-100 text-blue-700";
        }
      };

      const label = status.replace("_", " ");

      return (
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getTypeStyles(
              status
            )}`}
          >
            {label}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "date",
    header: ({ column }) => (
      <TableSort column={column} align="center">
        Próxima Aula
      </TableSort>
    ),
    cell: ({ row }) => {
      if (!row.original.date) return <div className="text-center">—</div>;

      const date = new Date(row.original.date);

      return (
        <div className="text-slate-600 font-medium text-sm text-center">
          {format(date, "dd/MM/yyyy", { locale: ptBR })}
        </div>
      );
    },
  },

  {
    id: "horario",
    header: ({ column }) => (
      <TableSort column={column} align="center">
        Horário
      </TableSort>
    ),
    cell: ({ row }) => {
      const start = row.original.startTime
        ? format(new Date(row.original.startTime), "HH:mm")
        : "--";

      const end = row.original.endTime
        ? format(new Date(row.original.endTime), "HH:mm")
        : "";

      return (
        <div className="text-slate-600 font-medium text-sm text-center">
          {start} {end && `- ${end}`}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Ações",
    size: 120,
    cell: ({ row }) => {
      const aulaStatus = row.original.status;
      const showQrCode = aulaStatus === "em_andamento" || aulaStatus === "aguardando";

      return (
        <div className="flex items-center justify-center gap-1">
          {showQrCode && (
            <QRCodeDialog
              attendanceId={row.original._id}
              token={row.original.tokenQRCode}
              subject={row.original.subject}
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors"
                aria-label="Abrir QR Code"
              >
                <QrCodeIcon className="size-5" weight="fill" />
              </Button>
            </QRCodeDialog>
          )}

          <Link to={`/aulas/${row.original._id}/editar`}>
            <Button
              disabled={aulaStatus !== "aguardando"}
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors"
              aria-label="Editar aula"
            >
              <PencilSimpleLineIcon className="size-5" weight="fill" />
            </Button>
          </Link>

          
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            aria-label="Excluir aula"
            onClick={() => deleteAttendance(row.original._id, localStorage.getItem("authToken") || "").then(() => window.location.reload())}
          >
            <XCircleIcon className="size-5" weight="fill" />
          </Button>
        </div>
      );
    },
  },
];
