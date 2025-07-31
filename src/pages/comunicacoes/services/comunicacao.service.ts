import type { Comunicacao, ComunicacaoForm } from "@/types";

// Mock data para simulação
const mockComunicacoes: Comunicacao[] = [
  {
    id: "1",
    titulo: "Reunião de Pais e Mestres",
    autor: "João Silva",
    tipo: "Comunicado",
    descricao:
      "Reunião agendada para discussão do desenvolvimento acadêmico dos alunos.",
    dataCriacao: new Date("2024-01-15"),
    dataAtualizacao: new Date("2024-01-15"),
  },
  {
    id: "2",
    titulo: "Alteração no Horário",
    autor: "Maria Santos",
    tipo: "Aviso",
    descricao:
      "Informamos que haverá alteração no horário das aulas na próxima semana.",
    dataCriacao: new Date("2024-01-10"),
    dataAtualizacao: new Date("2024-01-12"),
  },
  {
    id: "3",
    titulo: "Festa Junina 2024",
    autor: "Pedro Costa",
    tipo: "Comunicado",
    descricao:
      "Convite para a tradicional Festa Junina da escola. Traga toda a família!",
    dataCriacao: new Date("2024-01-05"),
    dataAtualizacao: new Date("2024-01-08"),
  },
];

// Simula delay de rede
const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchComunicacoes(): Promise<Comunicacao[]> {
  await simulateDelay();
  return [...mockComunicacoes];
}

export async function createComunicacao(
  data: ComunicacaoForm
): Promise<Comunicacao> {
  await simulateDelay();
  const newComunicacao: Comunicacao = {
    id: Date.now().toString(),
    ...data,
    dataCriacao: new Date(),
    dataAtualizacao: new Date(),
  };
  mockComunicacoes.push(newComunicacao);
  return newComunicacao;
}

export async function updateComunicacao(
  id: string,
  data: ComunicacaoForm
): Promise<Comunicacao> {
  await simulateDelay();
  const index = mockComunicacoes.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error("Comunicação não encontrada");
  }

  const updatedComunicacao: Comunicacao = {
    ...mockComunicacoes[index],
    ...data,
    dataAtualizacao: new Date(),
  };

  mockComunicacoes[index] = updatedComunicacao;
  return updatedComunicacao;
}

export async function deleteComunicacao(id: string): Promise<void> {
  await simulateDelay();
  const index = mockComunicacoes.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error("Comunicação não encontrada");
  }
  mockComunicacoes.splice(index, 1);
}
