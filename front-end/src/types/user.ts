
export interface UserCreationPayload {
  id?: string; 
  cpf: string;
  firstName: string;
  lastName: string;
  email: string;
  ddd: string;
  phone: string;
  senha: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface User {
  id: string;
  firstName: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}