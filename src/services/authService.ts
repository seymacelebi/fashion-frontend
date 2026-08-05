import apiClient from "./apiClients";
import type { User } from "../types/auth.types";
interface LoginResponse {
  token: string;
  userId: number;
  email: string;
  username: string;
  city: string;
}

interface RegisterResponse {
  token: string;
  userId: number;
  email: string;
  username: string;
  city: string;
}

export const register = async (
  username: string,
  email: string,
  password: string,
  city: string
) => {
  const response = await apiClient.post<RegisterResponse>("/auth/register", {
    username,
    email,
    password,
    city,
  });

  const mappedData = {
    token: response.data.token,
    user: {
      id: response.data.userId,
      email: response.data.email,
      name: response.data.username,
      city: response.data.city,
    } as User,
  };

  return mappedData;
};

export const loginWithCredentials = async (email: string, password: string) => {
  const response = await apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  const mappedData = {
    token: response.data.token,
    user: {
      id: response.data.userId,
      email: response.data.email,
      name: response.data.username,
      city: response.data.city,
    },
  };
  console.log("Giriş başarılı:", mappedData);

  return mappedData;
};

export const logoutUser = async (): Promise<void> => {
  console.log("Logout isteği sunucuya gönderildi.");
  return Promise.resolve();
};
