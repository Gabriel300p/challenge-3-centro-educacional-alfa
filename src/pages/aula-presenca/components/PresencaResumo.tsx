import type { Aula } from "../../aula-presenca/hooks/useAulaPresenca";

interface PresencaResumoProps {
  aula: Aula;
}

export function PresencaResumo({ aula }: PresencaResumoProps) {
  const totalStudents = aula.students.length;
  const presentes = aula.students.filter(
    (student) => student.status === "Presente" || student.status === "Atrasado"
  ).length;
  const porcentagem = totalStudents > 0 ? Math.round((presentes / totalStudents) * 100) : 0;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
        Presença Atual
      </p>
      
      <div className="flex flex-col items-center justify-center py-4">
        <div className="flex items-baseline gap-1">
          <span className="text-6xl font-black text-slate-800">{presentes}</span>
          <span className="text-2xl font-bold text-slate-300">/{totalStudents}</span>
        </div>
        <p className="text-sm font-medium text-slate-500 mt-2">alunos presentes</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-400 uppercase">Progresso</span>
          <span className="text-[#0096C7]">{porcentagem}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0096C7] transition-all duration-500" 
            style={{ width: `${porcentagem}%` }} 
          />
        </div>
      </div>
    </div>
  );
}