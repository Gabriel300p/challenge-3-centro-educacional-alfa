import { useEffect, useState, useCallback } from "react";

const API_URL =
  import.meta.env.VITE_API_ATTENDANCE || "http://localhost:3003";

export interface Aula {
  _id: string;
  subject: string;
  teacherId: string;
  date: string;
  startTime: string;
  endTime: string;
  toleranceMinutes: number;
  recurrence: string;
  contentAborted: string;
  professorNotes: string;
  tokenQRCode: string;
  status: "aguardando" | "em_andamento" | "finalizada";
  actualStartTime: string;
  students: {
    studentId: string;
    name: string;
    status: "Presente" | "Ausente";
    id: string;
  }[];
}

export function useAulaPresenca(token: string | null) {
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [loading, setLoading] = useState(false);

  const carregarHistorico = useCallback(async () => {
    const authToken = token || localStorage.getItem("authToken");

    if (!authToken) {
      console.warn("Sem token para buscar aulas");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/attendance/history`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
      }

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
