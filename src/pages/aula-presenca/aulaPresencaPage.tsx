import { AulaHeader } from "../aula-presenca/components/AulaHeader";
import { StatusCard } from "./components/StatusCard";
import { PresencaResumo } from "./components/PresencaResumo";
import { AulaToolbar } from "./components/AulaToolbar";
import { ListaAlunos } from "./components/ListaAlunos";
import { useAulaPresenca } from "../aula-presenca/hooks/useAulaPresenca";
import { useAuth } from "../../providers/useAuth";
import { updateAttendanceStatus } from "../aulas/services/attendance.service";
import { updateStudentStatus } from "../aulas/services/attendance.service";

export function AulaPresencaPage() {
  const { token } = useAuth();
  const { aulas, loading, recarregar } = useAulaPresenca(token);

  const aulaAtiva = aulas?.[1];

  const handleStart = async (id: string) => {
    try {
      const novoStatus =
        aulaAtiva.status === "em_andamento"
          ? "finalizada"
          : "em_andamento";

      await updateAttendanceStatus(id, novoStatus);
      await recarregar();
    } catch (error) {
      console.error("Erro ao atualizar status", error);
    }
  };
  const handleTogglePresenca = async (
    attendanceId: string,
    studentId: string
  ) => {
    try {
      const updatedStudents = aulaAtiva.students.map((aluno) =>
        aluno.studentId === studentId
          ? {
            ...aluno,
            status:
              aluno.status === "Presente"
                ? "Ausente"
                : "Presente",
          }
          : aluno
      );

      await updateStudentStatus(attendanceId, updatedStudents);
      await recarregar();
    } catch (error) {
      console.error("Erro ao atualizar presença", error);
    }
  };
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
          <StatusCard aula={aulaAtiva} onStart={handleStart} />
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <AulaToolbar />
            <ListaAlunos
              alunos={aulaAtiva.students}
              attendanceId={aulaAtiva._id}
              onTogglePresenca={handleTogglePresenca}
            />
          </div>
        </div>

        <div className="space-y-6">
          <PresencaResumo aula={aulaAtiva} />
        </div>
      </div>
    </div>
  );
}