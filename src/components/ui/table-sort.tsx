import type { Column } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TableSortProps<TData> {
  column: Column<TData, unknown>;
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

const TableSort = <TData,>({
  column,
  children,
  align = "left",
  className,
}: TableSortProps<TData>) => {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const sortDirection = column.getIsSorted();

  const handleSort = (direction: "asc" | "desc") => {
    if (sortDirection === direction) {
      // Se já está na direção clicada, remove a ordenação
      column.clearSorting();
    } else {
      // Define a nova direção de ordenação
      column.toggleSorting(direction === "desc");
    }
  };

  return (
    <div
      className={`flex items-center gap-2 ${alignmentClasses[align]} w-full ${className}`}
    >
      <span className="select-none">{children}</span>
      <div className="flex flex-col items-center  bg-white rounded-sm border border-gray-200">
        {/* Seta para cima (ASC) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSort("asc");
          }}
          className={`flex items-center justify-center rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer ${
            sortDirection === "asc"
              ? "text-blue-600 bg-blue-50 shadow-sm"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
          }`}
          aria-label="Ordenar crescente"
          title="Ordenar crescente"
        >
          <ChevronUp className="h-3 w-3 -mb-0.5" />
        </button>

        {/* Seta para baixo (DESC) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSort("desc");
          }}
          className={`flex items-center justify-center w-4 h-3 rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer ${
            sortDirection === "desc"
              ? "text-blue-600 bg-blue-50 shadow-sm"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
          }`}
          aria-label="Ordenar decrescente"
          title="Ordenar decrescente"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default TableSort;
