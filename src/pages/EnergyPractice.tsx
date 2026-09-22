import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Beaker, BookOpen, FileText, FlaskConical, Home, Menu, Pause, Play, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { VisualizationCanvasEnergy } from '../components/energy/VisualizationCanvasEnergy';
import { SaveExperimentButton } from '../components/history/SaveExperimentButton';
import { MathEquation } from '../components/ui/PhysicsFormula';
import { useLabStoreEnergy } from '../store/energyStore';
import { analyzeEnergyData } from '../utils/energyCalculations';
import type { PedagogicalPhaseEnergy } from '../types/energy.types';

const phases: { key: PedagogicalPhaseEnergy; label: string; icon: React.ReactNode; description: string }[] = [
  { key: 'exploration', label: 'Exploración', icon: <FlaskConical size={16} />, description: 'Observa la transformación de energía.' },
  { key: 'hypothesis', label: 'Hipótesis', icon: <BookOpen size={16} />, description: 'Predice el efecto de la fricción.' },
  { key: 'experimentation', label: 'Experimentación', icon: <Beaker size={16} />, description: 'Compara varias alturas y fricciones.' },
  { key: 'analysis', label: 'Análisis', icon: <BarChart3 size={16} />, description: 'Calcula pérdidas y errores.' },
  { key: 'conclusion', label: 'Conclusiones', icon: <FileText size={16} />, description: 'Interpreta el balance energético.' },
];

export const EnergyPractice: React.FC = () => {
  const store = useLabStoreEnergy();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hypothesis, setHypothesis] = useState('');
  const [conclusions, setConclusions] = useState('');
  const frameRef = useRef<number | null>(null);
  const previousTimeRef = useRef(0);
  const analysis = analyzeEnergyData(store.dataPoints, store.gravity);
  const phaseIndex = phases.findIndex(item => item.key === store.phase);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!previousTimeRef.current) previousTimeRef.current = timestamp;
      const dt = Math.min((timestamp - previousTimeRef.current) / 1000, 0.05);
      previousTimeRef.current = timestamp;
      if (dt > 0) store.updateMotion(dt);
      frameRef.current = requestAnimationFrame(animate);
    };
    if (store.isRunning) { previousTimeRef.current = 0; frameRef.current = requestAnimationFrame(animate); }
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [store.isRunning, store.updateMotion]);

  const controls = <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-md"><h2 className="mb-4 text-lg font-bold">Panel de control</h2><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-medium">Masa: {store.mass.toFixed(2)} kg<input type="range" min="0.1" max="2" step="0.1" value={store.mass} onChange={event => store.setMass(Number(event.target.value))} className="w-full accent-cyan-600" /></label><label className="text-sm font-medium">Altura: {store.initialHeight.toFixed(2)} m<input type="range" min="0.5" max="5" step="0.25" value={store.initialHeight} onChange={event => store.setInitialHeight(Number(event.target.value))} className="w-full accent-cyan-600" /></label><label className="text-sm font-medium">Ángulo: {store.angle}°<input type="range" min="10" max="60" value={store.angle} onChange={event => store.setAngle(Number(event.target.value))} className="w-full accent-cyan-600" /></label><label className="text-sm font-medium">Fricción: {store.friction.toFixed(2)}<input type="range" min="0" max="0.8" step="0.05" value={store.friction} onChange={event => store.setFriction(Number(event.target.value))} className="w-full accent-cyan-600" /></label></div><div className="mt-4 flex gap-2"><button onClick={store.toggleRunning} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white">{store.isRunning ? <><Pause size={18} />Pausar</> : <><Play size={18} />Soltar bloque</>}</button><button onClick={store.reset} className="rounded-lg bg-red-50 px-4 py-2 text-red-700"><RotateCcw size={18} /></button></div></section>;

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100">
    <header className="sticky top-0 z-40 border-b border-cyan-100 bg-white/80 shadow-sm backdrop-blur-md"><div className="container mx-auto flex items-center justify-between px-4 py-3"><div className="flex items-center gap-3"><Link to="/" className="rounded-lg p-2 hover:bg-gray-100"><ArrowLeft size={20} /></Link><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 text-xl text-white">⚡</div><div><h1 className="text-lg font-bold">Práctica 8: Energía Mecánica</h1><p className="text-xs text-gray-500">Conservación de la energía y fricción</p></div></div><Link to="/" className="hidden items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm md:flex"><Home size={16} />Inicio</Link><button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button></div></header>
    <nav className="border-b bg-white/60"><div className="container mx-auto px-4"><div className="hidden gap-1 py-2 md:flex">{phases.map((item, index) => <button key={item.key} onClick={() => store.setPhase(item.key)} className={`rounded-lg px-4 py-2 text-sm ${store.phase === item.key ? 'bg-cyan-600 text-white' : index <= phaseIndex ? 'text-cyan-700 hover:bg-cyan-50' : 'text-gray-400'}`}>{item.label}</button>)}</div>{mobileMenuOpen && <div className="space-y-1 py-2 md:hidden">{phases.map(item => <button key={item.key} onClick={() => { store.setPhase(item.key); setMobileMenuOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm">{item.label}</button>)}</div>}</div></nav>
    <div className="container mx-auto px-4 py-3"><div className="rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm text-cyan-800"><strong>Fase {phaseIndex + 1}/5 - {phases[phaseIndex].label}:</strong> {phases[phaseIndex].description}</div></div>
    <main className="container mx-auto px-4 pb-12">
      {store.phase === 'exploration' && <div className="grid gap-6 lg:grid-cols-3"><div className="space-y-4 lg:col-span-2"><VisualizationCanvasEnergy />{controls}</div><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Energía mecánica</h2><p className="mb-3 text-sm text-gray-700">La energía potencial gravitatoria se transforma en energía cinética. La fricción convierte parte de la energía mecánica en energía térmica.</p><div className="rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-cyan-800"><MathEquation math="E_p = mgh" /><MathEquation math={'E_k = \\frac{1}{2}mv^2'} /><MathEquation math="E_m = E_p + E_k" /></div><p className="mt-3 text-sm text-gray-700">Compara la energía inicial con la final y cuantifica la pérdida producida por la fricción.</p></section></div>}
      {store.phase === 'hypothesis' && <div className="grid gap-6 lg:grid-cols-2"><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Hipótesis</h2><textarea value={hypothesis} onChange={event => setHypothesis(event.target.value)} rows={7} placeholder="Predice cómo cambiará la velocidad final si aumenta la altura o la fricción..." className="w-full rounded-lg border px-3 py-2" /></section><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Objetivos</h2><ul className="space-y-2 text-sm"><li>Verificar la transformación de energía.</li><li>Comparar sistemas con y sin fricción.</li><li>Medir la velocidad final.</li><li>Calcular la energía perdida.</li></ul></section></div>}
      {store.phase === 'experimentation' && <div className="grid gap-6 lg:grid-cols-3"><div className="space-y-4 lg:col-span-2"><VisualizationCanvasEnergy />{controls}</div><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Mediciones</h2><p className="mb-3 text-sm text-gray-600">Selecciona cinco combinaciones de altura y fricción. Libera el bloque y registra la velocidad final.</p><div className="flex gap-2"><button onClick={store.addDataPoint} className="inline-flex items-center gap-1 rounded-lg bg-cyan-600 px-3 py-2 text-sm text-white"><Plus size={16} />Medir</button><button onClick={store.clearDataPoints} className="rounded-lg bg-red-50 px-3 py-2 text-red-700"><Trash2 size={16} /></button></div><table className="mt-4 w-full text-sm"><thead><tr className="bg-gray-50"><th className="p-2">h (m)</th><th>v (m/s)</th><th>Eₖ (J)</th></tr></thead><tbody>{store.dataPoints.map((point, index) => <tr key={index} className="border-t"><td className="p-2">{point.initialHeight.toFixed(2)}</td><td>{point.finalSpeed.toFixed(2)}</td><td>{point.kineticEnergy.toFixed(2)}</td></tr>)}</tbody></table></section></div>}
      {store.phase === 'analysis' && <div className="grid gap-6 lg:grid-cols-2"><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Análisis de energía</h2>{analysis ? <div className="space-y-3"><MathEquation math="E_m = E_p + E_k" /><p>Energía inicial: <strong>{analysis.theoreticalEnergy.toFixed(2)} J</strong></p><p>Energía final: <strong>{analysis.experimentalEnergy.toFixed(2)} J</strong></p><p>Pérdida por fricción: <strong>{analysis.energyLostToFriction.toFixed(2)} J</strong></p><p>R² = {analysis.rSquared.toFixed(4)}</p></div> : <p className="text-gray-500">Necesitas al menos dos mediciones.</p>}</section><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Preguntas guía</h2><ol className="list-decimal space-y-2 pl-5 text-sm"><li>¿La energía mecánica se conserva sin fricción?</li><li>¿Cómo cambia la velocidad con la altura?</li><li>¿Qué porcentaje de energía se pierde?</li></ol></section></div>}
      {store.phase === 'conclusion' && <div className="grid gap-6 lg:grid-cols-2"><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Conclusiones</h2><textarea value={conclusions} onChange={event => setConclusions(event.target.value)} rows={8} placeholder="Escribe tus conclusiones..." className="w-full rounded-lg border px-3 py-2" /></section><section className="rounded-xl bg-white p-5 shadow-md"><h2 className="mb-3 text-lg font-bold">Resumen</h2><p className="text-sm">Compara la energía inicial y final y explica el efecto de la fricción.</p></section></div>}
    </main>
    <div className="container mx-auto px-4"><SaveExperimentButton practiceId="energy" title="Experimento de Conservación de Energía" getPayload={() => ({ ...useLabStoreEnergy.getState(), hypothesis, conclusions, analysis, savedAt: new Date().toISOString() })} /></div>
  </div>;
};

export default EnergyPractice;
