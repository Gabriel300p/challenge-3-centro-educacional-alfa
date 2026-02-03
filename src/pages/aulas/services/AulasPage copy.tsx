import { DataTable } from '@/pages/comunicacoes/components/DataTable';
import { aulasMock } from '../aulas.mock';
import { columns } from '../components/columns';

export function AulasPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">
          Aulas
        </h1>
        <p className="text-sm text-gray-500">
          Gerencie as aulas e acompanhe o andamento das turmas
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <DataTable columns={columns} data={aulasMock} />
      </div>
    </div>
  );
}

