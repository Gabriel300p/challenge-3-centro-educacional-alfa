import { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "Todos" | "Presentes" | "Ausentes"
  >("Todos");

  const { token } = useAuth();
  const { aulas, loading, recarregar } = useAulaPresenca(token);

  const aulaAtiva = aulas
    ?.filter((aula) => aula.status === "aguardando" || aula.status === "em_andamento")
    .sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )?.[0];

  const filteredStudents =
    aulaAtiva?.students.filter((student) => {
      const nameMatch = student.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const isPresent = student.status === "Presente";

      const statusMatch =
        filterStatus === "Todos" ||
        (filterStatus === "Presentes" && isPresent) ||
        (filterStatus === "Ausentes" && !isPresent);

      return nameMatch && statusMatch;
    }) || [];

  const handleStart = async (id: string) => {
    try {
      if (!aulaAtiva) {
        return;
      }

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
      if (!aulaAtiva) {
        return;
      }

      const updatedStudents = aulaAtiva.students.map((aluno) => {
        if (aluno.studentId === studentId) {
          const isCurrentlyPresent =
            aluno.status === "Presente";
          return {
            ...aluno,
            status: isCurrentlyPresent ? "Ausente" : "Presente",
          };
        }
        return aluno;
      });

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
        Nenhuma próxima aula aguardando início.
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
            <AulaToolbar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />
            <ListaAlunos
              alunos={filteredStudents}
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