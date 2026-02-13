import { AulaHeader } from "../aula-presenca/components/AulaHeader";
import { StatusCard } from "./components/StatusCard";
import { PresencaResumo } from "./components/PresencaResumo";
import { AulaToolbar } from "./components/AulaToolbar";
import { ListaAlunos } from "./components/ListaAlunos";
import { useAulaPresenca } from "../aula-presenca/hooks/useAulaPresenca";
import { useAuth } from "../../providers/useAuth";

export function AulaPresencaPage() {
  const { token } = useAuth();
  const { aulas, loading } = useAulaPresenca(token);

  const aulaAtiva = aulas?.[2];

  if (loading) return <div className="p-10 text-center text-slate-500">Carregando chamada...</div>;
  if (!aulaAtiva) {
    return (
      <div className="p-8 text-slate-500">
        Nenhuma aula ativa encontrada.
      </div>
    );
  }
  return (
    <div className="mx-auto p-6 space-y-6 bg-[#F8FAFC] min-h-screen">
      <AulaHeader aula={aulaAtiva} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <StatusCard aula={aulaAtiva}  />
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <AulaToolbar />
            <ListaAlunos students={aulaAtiva?.students} />
          </div>
        </div>

        <div className="space-y-6">
          <PresencaResumo aula={aulaAtiva} />
        </div>
      </div>
    </div>
  );
}