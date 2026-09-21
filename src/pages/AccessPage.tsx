import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { isInstitutionalEmail } from '../types/auth.types';

export const AccessPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (!isInstitutionalEmail(email)) {
      setError('Usa un correo @unadvirtual.edu.co o @unad.edu.co.');
      return;
    }
    if (!supabase) {
      setError('El acceso aún no está configurado en producción.');
      return;
    }
    setSending(true);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}${window.location.pathname}#/` },
    });
    setSending(false);
    if (authError) setError(authError.message);
    else setMessage('Revisa tu correo institucional para continuar.');
  };

  return <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-10"><div className="mx-auto max-w-md"><Link to="/" className="text-sm text-gray-600">← Volver al inicio</Link><section className="mt-6 rounded-2xl bg-white p-6 shadow-xl"><h1 className="text-2xl font-bold text-gray-800">Acceso institucional</h1><p className="mt-2 text-sm text-gray-500">Usa tu correo institucional para entrar y guardar tus experimentos.</p><form onSubmit={submit} className="mt-6 space-y-4"><label className="block text-sm font-medium text-gray-700">Correo institucional<input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="nombre@unadvirtual.edu.co" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" /></label><button disabled={sending} className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white disabled:opacity-50">{sending ? 'Enviando...' : 'Enviar enlace de acceso'}</button></form>{message && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">{message}</p>}{error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}</section></div></main>;
};
