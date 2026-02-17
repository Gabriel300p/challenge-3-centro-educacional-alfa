import type { Aula } from "../../aula-presenca/hooks/useAulaPresenca";
const API_URL = import.meta.env.VITE_API_ATTENDANCE || "http://localhost:3003";

export async function getAttendanceById(id: string) {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `${API_URL}/api/attendance/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar aula");
  }

  return response.json();
}
export async function updateAttendance(
  id: string,
  payload: Partial<Aula>
) {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `${API_URL}/api/attendance/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao atualizar aula");
  }

  return response.json();
}

export async function updateAttendanceStatus(
  id: string,
  status: "em_andamento" | "finalizada"
) {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `${API_URL}/api/attendance/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
        ...(status === "em_andamento" && {
          actualStartTime: new Date(),
        }),
        ...(status === "finalizada" && {
          actualEndTime: new Date(),
        }),
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ${response.status}`);
  }

  return response.json();
}

export async function updateStudentStatus(
  attendanceId: string,
  updatedStudents: any[]
) {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `${API_URL}/api/attendance/${attendanceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        students: updatedStudents,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ${response.status}`);
  }

  return response.json();
}
export async function deleteAttendance(id: string, token: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_ATTENDANCE}/api/attendance/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao excluir aula");
  }

  return true;
}