const API_URL = import.meta.env.VITE_API_ATTENDANCE || "http://localhost:3003";

export async function getAttendanceById(id: string) {
  const { data } = await API_URL.get(`/api/attendance/${id}`);
  return data;
}

export async function updateAttendance(id: string, payload: any) {
  const { data } = await API_URL.put(`/api/attendance/${id}`, payload);
  return data;
}
