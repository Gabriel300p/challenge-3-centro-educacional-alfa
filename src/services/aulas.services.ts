import type { Aula } from "../pages/aula-presenca/hooks/useAulaPresenca";

const API_URL = import.meta.env.VITE_API_ATTENDANCE || "http://localhost:3003";

function getAuthToken() {
  return localStorage.getItem("authToken") || "";
}

export const aulasService = {
  async getAulas(): Promise<Aula[]> {
    const response = await fetch(`${API_URL}/api/attendance/history`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  },

  async deleteAula(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/attendance/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir aula");
    }
  },
};
