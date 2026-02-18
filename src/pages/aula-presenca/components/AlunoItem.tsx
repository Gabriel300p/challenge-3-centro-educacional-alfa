import { CheckIcon, XIcon } from "@phosphor-icons/react";

interface AlunoItemProps {
  name: string;
  status: "Presente" | "Ausente" | "Atrasado";
  onToggle: () => void;
  disabled?: boolean;
}

export function AlunoItem({
  name,
  status,
  onToggle,
  disabled = false,
}: AlunoItemProps) {
  const isPresent = status === "Presente" || status === "Atrasado";

  return (
    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
      
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
            isPresent
              ? "bg-green-100 text-green-600"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          {name.charAt(0)}
        </div>

        <div>
          <p className="font-bold text-slate-700 text-sm">
            {name}
          </p>
          {status === "Atrasado" && (
            <p className="text-xs text-yellow-600 font-medium -mt-0.5">Atrasado</p>
          )}
        </div>
      </div>

      <button
        onClick={onToggle}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition disabled:opacity-60 disabled:cursor-not-allowed ${
          isPresent
            ? "border border-red-200 text-red-500 hover:bg-red-50"
            : "border border-green-200 text-green-600 hover:bg-green-50"
        }`}
      >
        {isPresent ? (
          <>
            <XIcon size={14} /> Remover presença
          </>
        ) : (
          <>
            <CheckIcon size={14} /> Marcar presença
          </>
        )}
      </button>
    </div>
  );
}
