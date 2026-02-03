import { CheckIcon, XIcon } from  "@phosphor-icons/react";
export function AlunoItem({ name, status }: { name: string, status: string }) {
  const isPresent = status;

  return (
    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          isPresent ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
        }`}>
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-slate-700 text-sm">{name}</p>
          <p className="text-[10px] text-slate-400 font-medium uppercase"> </p>
        </div>
      </div>

      {isPresent ? (
        <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-500 rounded-lg text-xs font-bold hover:bg-red-50">
          <XIcon size={14} /> Remover presença
        </button>
      ) : (
        <button className="flex items-center gap-2 px-4 py-2 border border-green-200 text-green-600 rounded-lg text-xs font-bold hover:bg-green-50">
          <CheckIcon size={14} /> Marcar presença
        </button>
      )}
    </div>
  );
}