import { ChalkboardTeacherIcon } from "@phosphor-icons/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpenTextIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Aula } from "../hooks/useAulaPresenca";
import { useAuth } from "../../../providers/useAuth";

interface AulaHeaderProps {
  aula?: Aula;
  aulas: Aula[];
  selectedAulaId: string;
  onSelectAula: (aulaId: string) => void;
  showClassFilter: boolean;
}

function buildAulaLabel(aula: Aula) {
  return `Aula: ${aula.subject || "Sem titulo"}`;
}

export function AulaHeader({
  aula,
  aulas,
  selectedAulaId,
  onSelectAula,
  showClassFilter,
}: AulaHeaderProps) {
  const now = new Date();
  const { user } = useAuth();

  const teacherName = (() => {
    if (user?.email) {
      const name = user.email.split("@")[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return "Professor";
  })();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-3">
        <div className="bg-slate-100 p-2 rounded-full">
          <ChalkboardTeacherIcon size={20} className="text-slate-600" />
        </div>

        <div>
          <p className="text-sm text-slate-500 font-medium">Prof. {teacherName}</p>
          {!showClassFilter && (
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
              Aula: {aula?.subject || "Sem titulo"}
            </h2>
          )}
        </div>
      </div>

      {showClassFilter ? (
        <div className="w-full md:w-auto">
          <Select
            value={selectedAulaId || undefined}
            onValueChange={onSelectAula}
            disabled={!aulas.length}
          >
            <SelectTrigger className="w-full md:w-[360px] border-slate-200 text-slate-700">
              <span className="flex items-center gap-2">
                <BookOpenTextIcon size={16} className="text-slate-500" />
                <SelectValue placeholder="Aula: selecione uma aula" />
              </span>
            </SelectTrigger>

            <SelectContent>
              {aulas.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {buildAulaLabel(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="text-left md:text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {format(now, "eeee, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
          <p className="text-xl font-black text-slate-700">{format(now, "HH:mm")}</p>
        </div>
      )}
    </div>
  );
}
