import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, initialized } = useAuthStore();
  const location = useLocation();
  if (!initialized || loading) return <div className="min-h-screen grid place-items-center text-gray-600">Cargando sesión...</div>;
  if (!user) return <Navigate to="/acceso" replace state={{ from: location.pathname }} />;
  return <>{children}</>;
};
