import { useEffect, useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_ATTENDANCE || "http://localhost:3003";

export interface Aula {
  _id: string;      // ID do MongoDB
  subject: string;  // Nome da disciplina
  date: string;     // Data da aula
  students: {
    studentId: string;
    name: string;
    status: string;
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

