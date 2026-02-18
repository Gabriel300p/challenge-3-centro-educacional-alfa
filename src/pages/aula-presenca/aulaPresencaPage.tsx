import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AulaHeader } from "../aula-presenca/components/AulaHeader";
import { StatusCard } from "./components/StatusCard";
import { PresencaResumo } from "./components/PresencaResumo";
import { AulaToolbar } from "./components/AulaToolbar";
import { ListaAlunos } from "./components/ListaAlunos";
import { useAulaPresenca, type Aula } from "../aula-presenca/hooks/useAulaPresenca";
import { useAuth } from "../../providers/useAuth";
import { updateAttendanceStatus, updateStudentStatus } from "../aulas/services/attendance.service";

const SELECTED_AULA_STORAGE_KEY = "inicio_selected_aula_id";

function getAulaTimestamp(aula: Aula) {
  const dateValue = new Date(aula.startTime || aula.date).getTime();

  if (Number.isNaN(dateValue)) {
    return Number.MAX_SAFE_INTEGER;
  }

  return dateValue;
}

function getDefaultAulaId(aulas: Aula[]) {
  if (!aulas.length) {
    return "";
  }

  const sorted = [...aulas].sort((a, b) => getAulaTimestamp(a) - getAulaTimestamp(b));
  const now = Date.now();

  const proximaAula = sorted.find((aula) => getAulaTimestamp(aula) >= now);
  if (proximaAula) {
    return proximaAula._id;
  }

  const aulaEmAndamento = sorted.find((aula) => aula.status === "em_andamento");
  return (aulaEmAndamento ?? sorted[0])._id;
}

export function AulaPresencaPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAulaId, setSelectedAulaId] = useState("");
  const [filterStatus, setFilterStatus] = useState<"Todos" | "Presentes" | "Ausentes">("Todos");

  const { token, user } = useAuth();
  const { aulas, loading, recarregar } = useAulaPresenca(token);

  const aulasOrdenadas = useMemo(
    () => [...(aulas ?? [])].sort((a, b) => getAulaTimestamp(a) - getAulaTimestamp(b)),
    [aulas]
  );

  useEffect(() => {
    if (!aulasOrdenadas.length) {
      setSelectedAulaId("");
      localStorage.removeItem(SELECTED_AULA_STORAGE_KEY);
      return;
    }

    const persistedAulaId = localStorage.getItem(SELECTED_AULA_STORAGE_KEY);
    const persistedAulaStillExists = persistedAulaId
      ? aulasOrdenadas.some((aula) => aula._id === persistedAulaId)
      : false;

    if (persistedAulaId && persistedAulaStillExists) {
      setSelectedAulaId(persistedAulaId);
      return;
    }

    setSelectedAulaId(getDefaultAulaId(aulasOrdenadas));
  }, [aulasOrdenadas]);

  useEffect(() => {
    if (!selectedAulaId) {
      return;
    }

    localStorage.setItem(SELECTED_AULA_STORAGE_KEY, selectedAulaId);
  }, [selectedAulaId]);

  const aulaSelecionada = useMemo(() => {
    if (!aulasOrdenadas.length) {
      return undefined;
    }

    if (selectedAulaId) {
      const aulaById = aulasOrdenadas.find((aula) => aula._id === selectedAulaId);
      if (aulaById) {
        return aulaById;
      }
    }

    const defaultAulaId = getDefaultAulaId(aulasOrdenadas);
    return aulasOrdenadas.find((aula) => aula._id === defaultAulaId);
  }, [aulasOrdenadas, selectedAulaId]);

  const aulaEmAndamento = useMemo(
    () => aulasOrdenadas.find((aula) => aula.status === "em_andamento"),
    [aulasOrdenadas]
  );

  const hasOutraAulaEmAndamento =
    Boolean(aulaEmAndamento) && aulaSelecionada?._id !== aulaEmAndamento?._id;

  const aulaEstaFinalizada = aulaSelecionada?.status === "finalizada";
  const bloqueiaEdicao = hasOutraAulaEmAndamento || aulaEstaFinalizada;

  const disabledReason = hasOutraAulaEmAndamento
    ? "Existe uma aula em andamento. Finalize a aula em andamento para alterar outra aula."
    : aulaEstaFinalizada
      ? "Aula finalizada: alteracoes de presenca estao bloqueadas."
      : undefined;

  const filteredStudents =
    aulaSelecionada?.students.filter((student) => {
      const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const isPresent = student.status === "Presente" || student.status === "Atrasado";

      const statusMatch =
        filterStatus === "Todos" ||
        (filterStatus === "Presentes" && isPresent) ||
        (filterStatus === "Ausentes" && !isPresent);

      return nameMatch && statusMatch;
    }) || [];

  const isProfessor = user?.role === "professor";

  const handleStart = async (id: string) => {
    try {
      if (!aulaSelecionada || bloqueiaEdicao || aulaSelecionada.status === "finalizada") {
        return;
      }

      const novoStatus = aulaSelecionada.status === "em_andamento" ? "finalizada" : "em_andamento";

      await updateAttendanceStatus(id, novoStatus);
      await recarregar();
    } catch (error) {
      console.error("Erro ao atualizar status", error);
    }
  };

  const handleTogglePresenca = async (attendanceId: string, studentId: string) => {
    try {
      if (!aulaSelecionada || bloqueiaEdicao) {
        return;
      }

      const updatedStudents = aulaSelecionada.students.map((aluno) => {
        if (aluno.studentId === studentId) {
          const isCurrentlyPresent = aluno.status === "Presente" || aluno.status === "Atrasado";

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
      console.error("Erro ao atualizar presenca", error);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-slate-500">Carregando chamada...</div>;
  }

  return (
    <div className="mx-auto p-6 space-y-6 bg-[#F8FAFC] min-h-screen">
      <AulaHeader
        aula={aulaSelecionada}
        aulas={aulasOrdenadas}
        selectedAulaId={selectedAulaId}
        onSelectAula={setSelectedAulaId}
        showClassFilter={isProfessor}
      />

      {!aulaSelecionada ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4 text-center">
          <h2 className="text-xl font-bold text-slate-800">Nenhuma aula encontrada</h2>
          <p className="text-slate-500">Cadastre uma aula para iniciar o controle de presenca.</p>
          {isProfessor && (
            <Button onClick={() => navigate("/aulas/nova")} className="bg-[#0096C7] hover:bg-[#0077B6] text-white">
              Criar nova aula
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <StatusCard
              aula={aulaSelecionada}
              onStart={handleStart}
              disabled={hasOutraAulaEmAndamento}
              disabledReason={disabledReason}
            />

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <AulaToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
              />

              <ListaAlunos
                alunos={filteredStudents}
                attendanceId={aulaSelecionada._id}
                onTogglePresenca={handleTogglePresenca}
                readOnly={bloqueiaEdicao}
              />
            </div>
          </div>

          <div className="space-y-6">
            <PresencaResumo aula={aulaSelecionada} />
          </div>
        </div>
      )}
    </div>
  );
}
