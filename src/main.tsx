// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // 1. AuthProvider'ı import et
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 2. App bileşenini sarmala */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);