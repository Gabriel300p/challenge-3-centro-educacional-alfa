import { CheckCircleIcon, PlayIcon, QrCodeIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { Aula } from "../../aula-presenca/hooks/useAulaPresenca";
import { QRCodeDialog } from "./QRCodeDialog";

interface StatusCardProps {
  aula: Aula;
  onStart?: (id: string) => void;
  disabled?: boolean;
  disabledReason?: string;
}

export function StatusCard({
  aula,
  onStart,
  disabled = false,
  disabledReason,
}: StatusCardProps) {
  const presentes = aula.students.filter((student) => student.status === "Presente").length;
  const minimo = 8;
  const pronto = presentes >= minimo;

  const config = {
    pronto: {
      bg: "bg-green-50",
      border: "border-green-100",
      icon: <CheckCircleIcon size={24} weight="fill" className="text-green-500" />,
      title: "Pronto para iniciar",
      desc: "Minimo de alunos atingido. Voce pode comecar a aula!",
      action: "Iniciar aula",
      variant: "bg-green-600 hover:bg-green-700",
    },
    aguardando: {
      bg: "bg-yellow-50",
      border: "border-yellow-100",
      icon: <CheckCircleIcon size={24} weight="fill" className="text-yellow-500" />,
      title: "Aguardando alunos",
      desc: "Aguardando alunos para iniciar.",
      action: "Iniciar aula",
      variant: "bg-yellow-500 hover:bg-yellow-600",
    },
    em_andamento: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: <CheckCircleIcon size={24} weight="fill" className="text-blue-500" />,
      title: "Aula em andamento",
      desc: "A aula ja foi iniciada.",
      action: "Finalizar aula",
      variant: "bg-green-600 hover:bg-green-700",
    },
    finalizada: {
      bg: "bg-slate-50",
      border: "border-slate-200",
      icon: <CheckCircleIcon size={24} weight="fill" className="text-slate-500" />,
      title: "Aula finalizada",
      desc: "Esta aula foi encerrada e esta em modo de consulta.",
      action: "Aula encerrada",
      variant: "bg-slate-400",
    },
  } as const;

  const current =
    aula.status === "finalizada"
      ? config.finalizada
      : aula.status === "em_andamento"
        ? config.em_andamento
        : pronto
          ? config.pronto
          : config.aguardando;

  const actionDisabled = disabled || aula.status === "finalizada";
  const qrDisabled = disabled || aula.status === "finalizada";

  return (
    <div className={`p-6 rounded-2xl border ${current.border} ${current.bg} shadow-sm transition-all`}>
      <div className="flex items-center gap-4 mb-4">
        {current.icon}
        <div>
          <h3 className="font-bold text-slate-800 text-lg">{current.title}</h3>
          <p className="text-sm text-slate-600">{current.desc}</p>
        </div>
      </div>

      {disabledReason && (
        <p className="mb-4 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
          {disabledReason}
        </p>
      )}

      <div className="flex gap-3">
        <Button
          className={`${current.variant} text-white flex-1 flex gap-2 h-12 rounded-xl font-bold disabled:opacity-60 disabled:cursor-not-allowed`}
          onClick={() => onStart?.(aula._id)}
          disabled={actionDisabled}
        >
          <PlayIcon size={20} weight="fill" />
          {current.action}
        </Button>

        <QRCodeDialog attendanceId={aula._id} token={aula.tokenQRCode} subject={aula.subject}>
          <Button
            variant="outline"
            className="border-slate-200 bg-white text-slate-700 flex gap-2 h-12 px-6 rounded-xl font-bold disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={qrDisabled}
          >
            <QrCodeIcon size={20} weight="bold" />
          </Button>
        </QRCodeDialog>
      </div>
    </div>
  );
}
