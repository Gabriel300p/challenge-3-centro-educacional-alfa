import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps<TData> {
  table: Table<TData>;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalItems = table.getFilteredRowModel().rows.length;

  // Gerar array de páginas para mostrar na paginação
  const getVisiblePages = () => {
    const delta = 2; // Número de páginas para mostrar antes e depois da atual
    const range = [];
    const rangeWithDots = [];

    // Para telas pequenas, limitar o número de páginas visíveis
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxVisiblePages = isMobile ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      // Se tem poucas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-row items-center justify-between space-x-4 pt-4">
      {/* Informações e seletor de items por página */}
      <div className="flex flex-row items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-3">
          <p className="text-xs sm:text-sm font-medium text-slate-700">
            {totalItems}{" "}
            <span className="text-slate-400 font-normal">itens</span>
          </p>
          <hr className="hidden sm:block border h-4 md:h-6 border-slate-200" />
          <div className="flex items-center space-x-2">
            <p className="hidden sm:block text-xs sm:text-sm text-slate-600 whitespace-nowrap">
              Linhas por página
            </p>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="text-xs sm:text-sm">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Navegação de páginas */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <span className="hidden sm:block text-xs sm:text-sm font-medium text-slate-600 text-center sm:text-left">
            Página {currentPage} de {totalPages}
          </span>
          <div className="flex items-center justify-center space-x-1 sm:space-x-2">
            {/* Botão página anterior */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 disabled:opacity-30"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>

            {/* Números das páginas */}
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              {getVisiblePages().map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={index}
                      className="px-1 sm:px-2 text-slate-400 hidden sm:inline text-xs sm:text-sm"
                    >
                      ...
                    </span>
                  );
                }

                const pageNum = page as number;
                const isActive = pageNum === currentPage;

                return (
                  <Button
                    key={pageNum}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => table.setPageIndex(pageNum - 1)}
                    className={`h-7 w-7 sm:h-8 sm:w-8 p-0 text-xs sm:text-sm ${
                      isActive
                        ? "bg-primary text-white hover:opacity-80 transition-opacity duration-300"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            {/* Botão próxima página */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 disabled:opacity-30"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Próxima página</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
