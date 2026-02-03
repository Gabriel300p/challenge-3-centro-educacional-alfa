import { AlunoItem } from "./AlunoItem";
import { UsersIcon } from "@phosphor-icons/react";

interface Student {
  studentId: string;
  name: string;
  status: string;
}

interface ListaAlunosProps {
  students: Student[];
}

export function ListaAlunos({ students }: ListaAlunosProps) {
  return (
    <div className="space-y-3 mt-4">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <UsersIcon size={14} /> Lista de Alunos ({students.length})
      </p>
      
      <div className="space-y-2">
        {students.length > 0 ? (
          students.map((student) => (
            <AlunoItem 
              key={student.studentId} 
              name={student.name} 
              status={student.status} 
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