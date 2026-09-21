import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import MRUPractice from './pages/MRUPractice';
import MRUVPractice from './pages/MRUVPractice';
import FreeFallPractice from './pages/FreeFallPractice';
import ProjectilePractice from './pages/ProjectilePractice';
import PendulumPractice from './pages/PendulumPractice';
import NewtonPractice from './pages/NewtonPractice';
import HookePractice from './pages/HookePractice';
import { AccessPage } from './pages/AccessPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

function App() {
  const initializeAuth = useAuthStore(state => state.initialize);

  useEffect(() => initializeAuth(), [initializeAuth]);

  const protectedPractice = (page: React.ReactNode) => <ProtectedRoute>{page}</ProtectedRoute>;

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acceso" element={<AccessPage />} />
        <Route path="/historial" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="/practica/mru" element={protectedPractice(<MRUPractice />)} />
        <Route path="/practica/mruv" element={protectedPractice(<MRUVPractice />)} />
        <Route path="/practica/caida-libre" element={protectedPractice(<FreeFallPractice />)} />
        <Route path="/practica/tiro-parabolico" element={protectedPractice(<ProjectilePractice />)} />
        <Route path="/practica/pendulo" element={protectedPractice(<PendulumPractice />)} />
        <Route path="/practica/newton" element={protectedPractice(<NewtonPractice />)} />
        <Route path="/practica/hooke" element={protectedPractice(<HookePractice />)} />
      </Routes>
    </HashRouter>
  );
}

export default App;
