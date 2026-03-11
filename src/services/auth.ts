import { api } from "./api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data.acess;
};

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  const token = response.data.access_token;

  // localStorage.setItem("token", token);
  document.cookie = `token=${token}; path=/; max-age=86400; samesite=Strict`;

  return token;
};
