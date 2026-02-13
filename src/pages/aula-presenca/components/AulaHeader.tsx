import { ChalkboardTeacherIcon } from "@phosphor-icons/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type {Aula} from "../hooks/useAulaPresenca";

interface AulaHeaderProps {
  aula: Aula;
}

export function AulaHeader({ aula }: AulaHeaderProps) {
  const now = new Date();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-3">
        <div className="bg-slate-100 p-2 rounded-full">
          <ChalkboardTeacherIcon size={20} className="text-slate-600" />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">Prof. {"Alberto"}</p>
          <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
            Aula: {aula.subject || "Sem título"}
          </h2>
        </div>
      </div>

      <div className="text-left md:text-right">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {format(now, "eeee, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </p>
        <p className="text-xl font-black text-slate-700">
          {format(now, "HH:mm")}
        </p>
      </div>
    </div>
  );
}