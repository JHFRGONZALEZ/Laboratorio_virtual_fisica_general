import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Beaker, BookOpen, FileText, FlaskConical, Home, Menu, Pause, Play, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { VisualizationCanvasHooke } from '../components/hooke/VisualizationCanvasHooke';
import { SaveExperimentButton } from '../components/history/SaveExperimentButton';
import { MathEquation } from '../components/ui/PhysicsFormula';
import { useLabStoreHooke } from '../store/hookeStore';
import { analyzeHookeData } from '../utils/hookeCalculations';
import type { PedagogicalPhaseHooke } from '../types/hooke.types';

const phases: { key: PedagogicalPhaseHooke; label: string; icon: React.ReactNode; description: string }[] = [
  { key: 'exploration', label: 'Exploración', icon: <FlaskConical size={16} />, description: 'Observa cómo responde el resorte a una masa.' },
  { key: 'hypothesis', label: 'Hipótesis', icon: <BookOpen size={16} />, description: 'Predice la relación entre fuerza y elongación.' },
  { key: 'experimentation', label: 'Experimentación', icon: <Beaker size={16} />, description: 'Construye una tabla con varias masas.' },
  { key: 'analysis', label: 'Análisis', icon: <BarChart3 size={16} />, description: 'Determina la constante elástica mediante regresión.' },
  { key: 'conclusion', label: 'Conclusiones', icon: <FileText size={16} />, description: 'Interpreta los resultados y genera el reporte.' },
];

export const HookePractice: React.FC = () => {
  const store = useLabStoreHooke();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hypothesis, setHypothesis] = useState('');
  const [conclusions, setConclusions] = useState('');
  const frameRef = useRef<number | null>(null);
  const previousTimeRef = useRef(0);
  const analysis = analyzeHookeData(store.dataPoints, store.springConstant);
  const currentPhaseIndex = phases.findIndex(item => item.key === store.phase);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!previousTimeRef.current) previousTimeRef.current = timestamp;
      const dt = Math.min((timestamp - previousTimeRef.current) / 1000, 0.05);
      previousTimeRef.current = timestamp;
      if (dt > 0) store.updateMotion(dt);
      frameRef.current = requestAnimationFrame(animate);
    };
    if (store.isRunning) {
      previousTimeRef.current = 0;
      frameRef.current = requestAnimationFrame(animate);
    }
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [store.isRunning, store.updateMotion]);

  const controls = <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-md">
    <h2 className="mb-4 text-lg font-bold text-gray-800">Panel de control</h2>
    <div className="grid gap-4 md:grid-cols-3">
      <label className="text-sm font-medium text-gray-700">Masa: {store.mass.toFixed(2)} kg<input type="range" min="0.05" max="0.8" step="0.05" value={store.mass} onChange={event => store.setMass(Number(event.target.value))} className="w-full accent-blue-600" /></label>
      <label className="text-sm font-medium text-gray-700">Constante elástica: {store.springConstant.toFixed(1)} N/m<input type="range" min="5" max="30" step="0.5" value={store.springConstant} onChange={event => store.setSpringConstant(Number(event.target.value))} className="w-full accent-blue-600" /></label>
      <label className="text-sm font-medium text-gray-700">Gravedad: {store.gravity.toFixed(2)} m/s²<input type="range" min="1" max="25" step="0.1" value={store.gravity} onChange={event => store.setGravity(Number(event.target.value))} className="w-full accent-blue-600" /></label>
    </div>
    <div className="mt-4 flex gap-2"><button onClick={store.toggleRunning} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">{store.isRunning ? <><Pause size={18} />Pausar</> : <><Play size={18} />Soltar masa</>}</button><button onClick={store.reset} className="rounded-lg bg-red-50 px-4 py-2 text-red-700" title="Reiniciar"><RotateCcw size={18} /></button></div>
  </section>;

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100">
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/80 shadow-sm backdrop-blur-md"><div className="container mx-auto flex items-center justify-between px-4 py-3"><div className="flex items-center gap-3"><Link to="/" className="rounded-lg p-2 hover:bg-gray-100"><ArrowLeft size={20} /></Link><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">🪀</div><div><h1 className="text-lg font-bold">Práctica 7: Ley de Hooke</h1><p className="text-xs text-gray-500">Constante elástica de un resorte</p></div></div><Link to="/" className="hidden items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm md:flex"><Home size={16} />Inicio</Link><button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button></div></header>
    <nav className="border-b bg-white/60"><div className="container mx-auto px-4"><div className="hidden gap-1 py-2 md:flex">{phases.map((item, index) => <button key={item.key} onClick={() => store.setPhase(item.key)} className={`rounded-lg px-4 py-2 text-sm ${store.phase === item.key ? 'bg-blue-600 text-white' : index <= currentPhaseIndex ? 'text-blue-700 hover:bg-blue-50' : 'text-gray-400'}`}>{item.label}</button>)}</div>{mobileMenuOpen && <div className="space-y-1 py-2 md:hidden">{phases.map(item => <button key={item.key} onClick={() => { store.setPhase(item.key); setMobileMenuOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm">{item.label}</button>)}</div>}</div></nav>
    <div className="container mx-auto px-4 py-3"><div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800"><strong>Fase {currentPhaseIndex + 1}/5 - {phases[currentPhaseIndex].label}:</strong> {phases[currentPhaseIndex].description}</div></div>
    <main className="container mx-auto px-4 pb-12">
      {store.phase === 'exploration' && <div className="grid gap-6 lg:grid-cols-3"><div className="space-y-4 lg:col-span-2"><VisualizationCanvasHooke />{controls}</div><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Ley de Hooke</h2><p className="mb-3 text-sm text-gray-700">Dentro del límite elástico, la fuerza aplicada es proporcional a la elongación del resorte.</p><div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-800"><MathEquation math="F = kx" /><MathEquation math={'k = \\frac{F}{x}'} /></div><p className="mt-3 text-sm text-gray-700">El objetivo es determinar experimentalmente la constante elástica y comprobar si la relación entre fuerza y elongación es lineal.</p></section></div>}
      {store.phase === 'hypothesis' && <div className="grid gap-6 lg:grid-cols-2"><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Hipótesis</h2><textarea value={hypothesis} onChange={event => setHypothesis(event.target.value)} rows={7} placeholder="Predice cómo cambiará la elongación al aumentar la masa..." className="w-full rounded-lg border px-3 py-2" /></section><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Objetivos</h2><ul className="space-y-2 text-sm text-gray-700"><li>Relacionar fuerza y elongación.</li><li>Medir cinco configuraciones.</li><li>Obtener k mediante la pendiente.</li><li>Evaluar el error experimental.</li></ul></section></div>}
      {store.phase === 'experimentation' && <div className="grid gap-6 lg:grid-cols-3"><div className="space-y-4 lg:col-span-2"><VisualizationCanvasHooke />{controls}</div><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Mediciones</h2><p className="mb-3 text-sm text-gray-600">Usa cinco masas distintas, espera el equilibrio y registra cada resultado.</p><div className="flex gap-2"><button onClick={store.addDataPoint} className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"><Plus size={16} />Medir</button><button onClick={store.clearDataPoints} className="rounded-lg bg-red-50 px-3 py-2 text-red-700"><Trash2 size={16} /></button></div><table className="mt-4 w-full text-sm"><thead><tr className="bg-gray-50"><th className="p-2">m (kg)</th><th>F (N)</th><th>x (cm)</th></tr></thead><tbody>{store.dataPoints.map((point, index) => <tr key={index} className="border-t"><td className="p-2">{point.mass.toFixed(2)}</td><td>{point.force.toFixed(2)}</td><td>{(point.extension * 100).toFixed(2)}</td></tr>)}</tbody></table></section></div>}
      {store.phase === 'analysis' && <div className="grid gap-6 lg:grid-cols-2"><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Análisis</h2>{analysis ? <div className="space-y-3"><MathEquation math={'k = \\frac{F}{x}'} /><p>Constante teórica: <strong>{analysis.theoreticalConstant.toFixed(2)} N/m</strong></p><p>Constante experimental: <strong>{analysis.experimentalConstant.toFixed(2)} N/m</strong></p><p>Error porcentual: <strong>{analysis.percentError.toFixed(2)}%</strong></p><p>{analysis.equation} · R² = {analysis.rSquared.toFixed(4)}</p></div> : <p className="text-gray-500">Necesitas al menos dos mediciones.</p>}</section><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Preguntas guía</h2><ol className="list-decimal space-y-2 pl-5 text-sm"><li>¿La gráfica F frente a x es lineal?</li><li>¿Qué representa físicamente la pendiente?</li><li>¿Cuáles son las fuentes de error?</li></ol></section></div>}
      {store.phase === 'conclusion' && <div className="grid gap-6 lg:grid-cols-2"><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Conclusiones</h2><textarea value={conclusions} onChange={event => setConclusions(event.target.value)} rows={8} placeholder="Escribe tus conclusiones..." className="w-full rounded-lg border px-3 py-2" /></section><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Resumen</h2><p className="text-sm">Compara la pendiente experimental con la constante configurada y explica las diferencias.</p></section></div>}
    </main>
    <div className="container mx-auto px-4"><SaveExperimentButton practiceId="hooke" title="Experimento de Ley de Hooke" getPayload={() => ({ ...useLabStoreHooke.getState(), hypothesis, conclusions, analysis, savedAt: new Date().toISOString() })} /></div>
  </div>;
};

export default HookePractice;
