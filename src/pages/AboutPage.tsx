import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FlaskConical, GraduationCap, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100 px-4 py-8">
    <div className="mx-auto max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700"><ArrowLeft size={16} /> Volver al laboratorio</Link>
      <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 p-8 text-white">
          <img src="./unad-logo.png.png" alt="UNAD, ECBTI y CIP Dosquebradas" className="mb-6 max-h-16 w-auto rounded bg-white p-2" />
          <h1 className="text-3xl font-bold">Acerca del laboratorio</h1>
          <p className="mt-2 max-w-2xl text-blue-50">Una herramienta educativa para experimentar, medir, analizar y comunicar resultados de Física General en contextos de aprendizaje remoto.</p>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-2">
          <article className="rounded-xl border border-blue-100 bg-blue-50 p-5"><BookOpen className="mb-3 text-blue-700" /><h2 className="font-bold text-gray-800">Propósito académico</h2><p className="mt-2 text-sm leading-6 text-gray-600">El laboratorio guía al estudiante por cinco momentos: exploración, hipótesis, experimentación, análisis y conclusiones. Cada práctica promueve el razonamiento basado en datos.</p></article>
          <article className="rounded-xl border border-cyan-100 bg-cyan-50 p-5"><FlaskConical className="mb-3 text-cyan-700" /><h2 className="font-bold text-gray-800">Prácticas disponibles</h2><p className="mt-2 text-sm leading-6 text-gray-600">MRU, MRUV, caída libre, tiro parabólico, péndulo simple, leyes de Newton, ley de Hooke y conservación de la energía mecánica.</p></article>
          <article className="rounded-xl border border-indigo-100 bg-indigo-50 p-5"><GraduationCap className="mb-3 text-indigo-700" /><h2 className="font-bold text-gray-800">Desarrollador</h2><p className="mt-2 text-sm leading-6 text-gray-600"><strong>Jhon Fredy González</strong><br />Magíster en Enseñanza de la Física<br />ECBTI • UNAD • CIP Dosquebradas<br />JHON.GONZALEZ@UNAD.EDU.CO</p></article>
          <article className="rounded-xl border border-emerald-100 bg-emerald-50 p-5"><ShieldCheck className="mb-3 text-emerald-700" /><h2 className="font-bold text-gray-800">Privacidad</h2><p className="mt-2 text-sm leading-6 text-gray-600">El acceso institucional y el historial asocian los resultados al estudiante autenticado. Cada usuario solo puede consultar sus propios experimentos.</p></article>
        </div>
      </section>
    </div>
  </main>
);

export default AboutPage;
