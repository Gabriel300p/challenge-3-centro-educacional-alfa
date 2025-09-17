export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: UserData | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  role: 'professor' | 'aluno';
  email: string;
}