interface Props {
  status: 'Finalizada' | 'Pendente' | 'Em andamento';
}

const statusStyles = {
  Finalizada: 'bg-green-100 text-green-700',
  Pendente: 'bg-yellow-100 text-yellow-700',
  'Em andamento': 'bg-blue-100 text-blue-700',
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
