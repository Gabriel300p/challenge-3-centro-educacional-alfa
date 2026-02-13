import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/pages/comunicacoes/components/DataTable";
import { columns } from "../components/columns";
import { useAulaPresenca } from "../../aula-presenca/hooks/useAulaPresenca";
import { useAuth } from "../../../providers/useAuth";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "@phosphor-icons/react";

export function AulasPage() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { aulas, loading } = useAulaPresenca(token);

  const filteredAulas = aulas.filter((aula) =>
    aula.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Aulas</h1>
          <p className="text-sm text-gray-500">
            Gerencie as aulas e acompanhe o andamento das turmas
          </p>
        </div>

        {user?.role === "professor" && (
          <Button
            onClick={() => navigate("/aulas/nova")}
            className="flex items-center gap-2"
          >
            <PlusCircleIcon weight="fill" className="size-5" />
            Nova Aula
          </Button>
        )}
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-3 py-2 border border-slate-200 rounded-md
            focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />

        {loading ? (
          <div className="h-24 flex items-center justify-center text-slate-500 italic">
            Carregando aulas...
          </div>
        ) : (
          <DataTable
            data={filteredAulas}
            columns={columns(
              (id) => navigate(`/aulas/${id}/editar`),
              (id) => console.log("Excluir aula:", id),
              (id) => console.log("Abrir QR Code:", id)
            )}
          />
        )}
      </div>
    </div>
  );
}
