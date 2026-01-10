// src/context/AuthContext.tsx
import React, {
  createContext,
  useReducer,
  useCallback,
  useMemo,
  useContext,
} from "react";
import type { AuthState, User, AuthContextType } from "../types/auth.types";
import * as authService from "../services/authService";

type Action =
  | { type: "INITIALIZE" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "INITIALIZE":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

// --- DEĞİŞİKLİK BURADA: Başlangıç state'ini hazırlayan yardımcı fonksiyon ---
const getInitialState = (): AuthState => {
  try {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");

    if (token && userJson) {
      const user = JSON.parse(userJson);
      return {
        isLoggedIn: true,
        isLoading: false, // Artık verimiz var, yükleniyor dememize gerek yok
        user: user,
        error: null,
      };
    }
  } catch (error) {
    console.error("Auth initialization error:", error);
  }

  return {
    isLoggedIn: false,
    isLoading: false,
    user: null,
    error: null,
  };
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// 2. useAuth Hook'unu buraya ekle (Export et)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: "INITIALIZE" });
    try {
      const { user, token } = await authService.loginWithCredentials(
        email,
        password
      );

      if (user && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } else {
        throw new Error("Kullanıcı verileri eksik.");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Giriş yapılamadı.";
      dispatch({ type: "AUTH_FAILURE", payload: errorMessage });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logoutUser();
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      dispatch({ type: "INITIALIZE" });
      try {
        // authService içindeki registerUser'ı çağırıyoruz
        const data = await authService.register(username, email, password);

        // Kayıt başarılıysa token ve user'ı kaydet
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Kayıt başarısız.";
        dispatch({ type: "AUTH_FAILURE", payload: errorMessage });
        throw error; // Sayfanın catch bloğuna düşmesi için fırlatıyoruz
      }
    },
    []
  );

  const value = useMemo(
    () => ({ ...state, login, register, logout }),
    [state, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
