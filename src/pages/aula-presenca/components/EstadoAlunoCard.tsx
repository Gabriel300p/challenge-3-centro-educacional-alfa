import {
  CalendarXIcon,
  ClockCountdownIcon,
  PlayCircleIcon,
} from "@phosphor-icons/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Aula } from "../hooks/useAulaPresenca";

export type EstadoAluno = "sem_aula" | "aguardando_professor" | "aula_iniciada";

interface EstadoAlunoCardProps {
  state: EstadoAluno;
  aula?: Aula;
}

function getAulaSchedule(aula?: Aula) {
  if (!aula?.startTime) {
    return "";
  }

  const data = new Date(aula.startTime);
  if (Number.isNaN(data.getTime())) {
    return "";
  }

  return format(data, "dd/MM 'as' HH:mm", { locale: ptBR });
}

export function EstadoAlunoCard({ state, aula }: EstadoAlunoCardProps) {
  const schedule = getAulaSchedule(aula);

  const config = {
    sem_aula: {
      icon: (
        <CalendarXIcon size={26} weight="duotone" className="text-slate-500" />
      ),
      title: "Sem aula no momento",
      description: "Nao ha aula aguardando ou em andamento agora.",
      className: "bg-slate-50 border-slate-200",
    },
    aguardando_professor: {
      icon: (
        <ClockCountdownIcon
          size={26}
          weight="duotone"
          className="text-yellow-600"
        />
      ),
      title: "Aguardando professor",
      description:
        "A aula esta pronta para iniciar e aguarda a abertura pelo professor.",
      className: "bg-yellow-50 border-yellow-200",
    },
    aula_iniciada: {
      icon: (
        <PlayCircleIcon size={26} weight="duotone" className="text-green-600" />
      ),
      title: "Aula iniciada",
      description:
        "A aula ja foi iniciada. Entre em sala e acompanhe as orientações.",
      className: "bg-green-50 border-green-200",
    },
  } as const;

  const current = config[state];

  return (
    <div
      className={`bg-white p-8 rounded-2xl shadow-sm border border-slate-100`}
    >
      <div className={`rounded-xl border p-5 ${current.className}`}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{current.icon}</div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-800">
              {current.title}
            </h2>
            <p className="text-slate-600">{current.description}</p>
            {aula && (
              <div className="text-sm font-medium text-slate-700">
                <p>Aula: {aula.subject || "Sem titulo"}</p>
                {schedule && <p>Horário: {schedule}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
