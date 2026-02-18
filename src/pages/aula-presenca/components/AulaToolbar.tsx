import { MagnifyingGlassIcon } from "@phosphor-icons/react";

type FilterStatus = "Todos" | "Presentes" | "Ausentes";

interface AulaToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
}

export function AulaToolbar({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}: AulaToolbarProps) {
  const filters: FilterStatus[] = ["Todos", "Presentes", "Ausentes"];

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="relative w-full max-w-xs">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Buscar por nome ou matrícula..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#0096C7]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex bg-slate-100 p-1 rounded-lg">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${filterStatus === filter ? "bg-[#0096C7] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}