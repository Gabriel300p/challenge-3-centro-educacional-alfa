import { CheckCircleIcon, PlayIcon, QrCodeIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { Aula } from "../../aula-presenca/hooks/useAulaPresenca";
import { QRCodeDialog } from "./QRCodeDialog";



interface StatusCardProps {
  aula: Aula;
  onStart?: (id: string) => void;
}

export function StatusCard({ aula, onStart }: StatusCardProps) {
  const presentes = aula.students.filter(
    (s) => s.status === "Presente"
  ).length;

  const minimo = 8;
  const pronto = presentes >= minimo;

  const status = aula.status;

  const config = {
    pronto: {
      bg: "bg-green-50",
      border: "border-green-100",
      icon: (
        <CheckCircleIcon
          size={24}
          weight="fill"
          className="text-green-500"
        />
      ),
      title: "Pronto para Iniciar",
      desc: "Mínimo de alunos atingido. Você pode começar a aula!",
      action: "Iniciar aula",
      variant: "bg-green-600 hover:bg-green-700",
    },

    aguardando: {
      bg: "bg-yellow-50",
      border: "border-yellow-100",
      icon: (
        <CheckCircleIcon
          size={24}
          weight="fill"
          className="text-yellow-500"
        />
      ),
      title: "Aguardando Alunos",
      desc: "Aguardando alunos para iniciar.",
      action: "Iniciar aula",
      variant: "bg-yellow-500 hover:bg-yellow-600",
    },

    em_andamento: {
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: (
        <CheckCircleIcon
          size={24}
          weight="fill"
          className="text-blue-500"
        />
      ),
      title: "Aula em Andamento",
      desc: "A aula já foi iniciada.",
      action: "Finalizar aula",
      variant: "bg-green-600 hover:bg-green-700",
    },
  };

  const current =
    status === "em_andamento"
      ? config.em_andamento
      : pronto
        ? config.pronto
        : config.aguardando;

  return (
    <div
      className={`p-6 rounded-2xl border ${current.border} ${current.bg} shadow-sm transition-all`}
    >
      <div className="flex items-center gap-4 mb-4">
        {current.icon}
        <div>
          <h3 className="font-bold text-slate-800 text-lg">
            {current.title}
          </h3>
          <p className="text-sm text-slate-600">
            {current.desc}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          className={`${current.variant} text-white flex-1 flex gap-2 h-12 rounded-xl font-bold`}
          onClick={() => onStart?.(aula._id)}
        >
          <PlayIcon size={20} weight="fill" />
          {current.action}
        </Button>

        <QRCodeDialog
          attendanceId={aula._id}
          token={aula.tokenQRCode}
          subject={aula.subject}
        >
          <Button
            variant="outline"
            className="border-slate-200 bg-white text-slate-700 flex gap-2 h-12 px-6 rounded-xl font-bold"
          >
            <QrCodeIcon size={20} weight="bold" />
          </Button>
        </QRCodeDialog>
      </div>
    </div>
  );
}
