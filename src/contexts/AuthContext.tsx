// src/context/AuthContext.tsx
import React, { createContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import type { AuthState, User, AuthContextType } from '../types/auth.types';
import * as authService from '../services/authService';

// Reducer Action Tipleri
type Action =
  | { type: 'INITIALIZE' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

// Reducer Fonksiyonu
const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, isLoggedIn: true, user: action.payload, error: null };
    case 'AUTH_FAILURE':
      return { ...state, isLoading: false, isLoggedIn: false, user: null, error: action.payload };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, user: null, error: null, isLoading: false };
    default:
      throw new Error(`Unhandled action type`);
  }
};

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: true, // Oturumu kontrol ederken uygulama yüklendiğini belirtir
  user: null,
  error: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Sayfa yüklendiğinde oturumu kontrol et
  useEffect(() => {
    const initialize = () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(user) });
        } else {
          dispatch({ type: 'AUTH_FAILURE', payload: '' });
        }
      } catch (error) {
        dispatch({ type: 'AUTH_FAILURE', payload: 'Oturum geri yüklenemedi.' });
      }
    };
    initialize();
  }, []);

  // Login fonksiyonu
  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: 'INITIALIZE' });
    try {
      const { user, token } = await authService.loginWithCredentials(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error; // Hatayı LoginPage'in yakalaması için yeniden fırlat
    }
  }, []);

  // Logout fonksiyonu
  const logout = useCallback(async () => {
    await authService.logoutUser();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const value = useMemo(() => ({ ...state, login, logout }), [state, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};