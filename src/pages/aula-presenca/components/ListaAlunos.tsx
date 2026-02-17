import { AlunoItem } from "./AlunoItem";
import { UsersIcon } from "@phosphor-icons/react";
import type { Aula } from "../hooks/useAulaPresenca";

interface ListaAlunosProps {
  alunos: Aula["students"];
  attendanceId: string;
  onTogglePresenca: (
    attendanceId: string,
    studentId: string
  ) => void;
}

export function ListaAlunos({
  alunos,
  attendanceId,
  onTogglePresenca,
}: ListaAlunosProps) {
  return (
    <div className="space-y-3 mt-4">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <UsersIcon size={14} /> Lista de Alunos ({alunos.length})
      </p>

      <div className="space-y-2">
        {alunos.length > 0 ? (
          alunos.map((student) => (
            <AlunoItem
              key={student.studentId}
              name={student.name}
              status={student.status}
              onToggle={() =>
                onTogglePresenca(
                  attendanceId,
                  student.studentId
                )
              }
            />
          ))
        ) : (
          <div className="py-10 text-center text-slate-400 text-sm italic border-2 border-dashed border-slate-100 rounded-xl">
            Nenhum aluno vinculado a esta aula.
          </div>
        )}
      </div>
    </div>
  );
}
