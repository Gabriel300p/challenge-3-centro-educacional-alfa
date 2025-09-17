import { type AuthCredentials } from '@/types/auth'; 

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function login(credentials: AuthCredentials): Promise<{ token: string }> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Credenciais inválidas');
  }

  const data = await response.json();
  return data;
}