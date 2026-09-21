import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { listExperiments } from '../services/historyService';
import type { ExperimentHistory } from '../types/history.types';

const labels: Record<string, string> = { mru: 'MRU', mruv: 'MRUV', 'caida-libre': 'Caída Libre', 'tiro-parabolico': 'Tiro Parabólico', pendulo: 'Péndulo Simple', newton: 'Leyes de Newton', hooke: 'Ley de Hooke' };

export const HistoryPage: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const [items, setItems] = useState<ExperimentHistory[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { if (user) void listExperiments(user.id).then(setItems).catch(() => setError('No se pudo cargar el historial.')); }, [user]);
  return <main className="min-h-screen bg-slate-50 px-4 py-8"><div className="mx-auto max-w-5xl"><header className="flex justify-between"><Link to="/">← Inicio</Link><button onClick={() => void signOut()} className="rounded-lg bg-white px-3 py-2 shadow">Cerrar sesión</button></header><h1 className="mt-8 text-3xl font-bold text-gray-800">Mi historial</h1><p className="text-sm text-gray-500">{user?.email}</p>{error && <p className="mt-4 text-red-700">{error}</p>}{items.length === 0 ? <p className="mt-8 rounded-xl bg-white p-8 text-center text-gray-500 shadow">Aún no tienes experimentos guardados.</p> : <div className="mt-6 grid gap-4 md:grid-cols-2">{items.map(item => <article key={item.id} className="rounded-xl bg-white p-5 shadow"><p className="text-xs font-semibold text-blue-600">{labels[item.practice_id] ?? item.practice_id}</p><h2 className="mt-1 font-bold text-gray-800">{item.title}</h2><p className="mt-2 text-xs text-gray-500">{new Date(item.created_at).toLocaleString()}</p></article>)}</div>}</div></main>;
};
