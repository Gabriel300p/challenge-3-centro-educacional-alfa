import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { DataTable } from "@/pages/comunicacoes/components/DataTable";
import { useState } from "react";
import { useAuth } from "../../providers/useAuth";
import { columns } from "./components/columns";
import { useNavigate } from "react-router-dom";
import { useAulaPresenca } from "../aula-presenca/hooks/useAulaPresenca";


export function AulasPage() {
  const { user, token } = useAuth(); 
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  
  const { aulas, loading } = useAulaPresenca(token);

  
  const filteredAulas = (Array.isArray(aulas) ? aulas : []).filter((aula) =>
    aula.subject?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-medium text-primary underline">
            Acessos
          </span>
          <h1 className="text-2xl font-bold text-gray-900">
            Aulas
          </h1>
          <p className="text-sm text-gray-500">
            Crie, edite e organize suas aulas antes de acontecerem.
          </p>
        </div>

        {user?.role === "professor" && (
          <Button
            onClick={() => navigate("/aulas/nova")}
            size="default"
            className="flex items-center gap-1.5 px-3.5 py-3 rounded-md hover:opacity-80 transition-opacity duration-300"
          >
            <PlusCircleIcon weight="fill" className="size-5" />
            <span className="hidden sm:block">Nova Aula</span>
          </Button>
        )}
      </div>

      <Divider />


      <div className="space-y-4">
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md
              focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>

        {loading ? (
          <div className="h-24 flex items-center justify-center text-slate-500 italic">
            Carregando aulas da API...
          </div>
        ) : (
          <DataTable columns={columns} data={filteredAulas} />
        )}
      </div>
    </div>
  );
}