import { useEffect, useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_ATTENDANCE || "http://localhost:3003";

export interface Aula {
  _id: string;      // ID do MongoDB
  subject: string;  // Nome da disciplina
  teacherId: string; // ID do professor
  date: string;     // Data da aula
  startTime: string; // Hora de início
  endTime: string;   // Hora de término
  toleranceMinutes: number; // Tolerância para atrasos
  recurrence: string; // "sem recorrência", "semanal", "mensal"
  contentAborted: string; // Indica se o conteúdo foi abortado
  professorNotes: string; // Anotações do professor
  tokenQRCode: string; // Token para geração do QR Code
  status: string;   // "aguardando", "em_andamento", "finalizada"
  actualStartTime: string; // Hora real de início
  students: {
    studentId: string;
    name: string;
    status: string;
    id: string;
  }[];
}

export function useAulaPresenca(token: string | null) {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(false);

  const carregarHistorico = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/attendance/history`, {
        headers: {
          "Authorization": `Bearer ${token}`, //
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      setAulas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      setAulas([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    carregarHistorico();
  }, [carregarHistorico]);

  return { aulas, loading, recarregar: carregarHistorico };
}

