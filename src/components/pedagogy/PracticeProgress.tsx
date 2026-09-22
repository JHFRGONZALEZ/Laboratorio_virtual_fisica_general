import React from 'react';
import { Award, BarChart3, Beaker, Compass, FileText } from 'lucide-react';

interface PracticeProgressProps {
  phaseIndex: number;
  phaseCount: number;
  phaseLabel: string;
  measurements: number;
  analysisReady: boolean;
  reportReady: boolean;
  accentClass?: string;
}

export const PracticeProgress: React.FC<PracticeProgressProps> = ({ phaseIndex, phaseCount, phaseLabel, measurements, analysisReady, reportReady, accentClass = 'bg-blue-600' }) => {
  const achievements = [
    { label: 'Explorador', unlocked: phaseIndex >= 0, icon: <Compass size={14} /> },
    { label: 'Experimentador', unlocked: measurements >= 1, icon: <Beaker size={14} /> },
    { label: 'Analista', unlocked: analysisReady, icon: <BarChart3 size={14} /> },
    { label: 'Científico', unlocked: reportReady, icon: <FileText size={14} /> },
  ];
  const unlocked = achievements.filter(item => item.unlocked).length;
  const nextStep = phaseIndex === 0 ? 'Formula una hipótesis para continuar.' : phaseIndex === 1 ? 'Realiza mediciones sistemáticas.' : phaseIndex === 2 && !analysisReady ? 'Completa las mediciones para habilitar el análisis.' : phaseIndex === 3 ? 'Redacta tus conclusiones y genera el reporte.' : 'Revisa tu reporte final.';

  return <section className="container mx-auto px-4 pb-2"><div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"><div className="mb-2 flex flex-wrap items-center justify-between gap-2"><div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Award size={17} className="text-yellow-500" /> Progreso de la práctica</div><span className="text-xs font-medium text-gray-500">Fase {phaseIndex + 1}/{phaseCount}: {phaseLabel} · {unlocked}/4 logros</span></div><div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-100"><div className={`${accentClass} h-full rounded-full transition-all duration-500`} style={{ width: `${((phaseIndex + 1) / phaseCount) * 100}%` }} /></div><p className="mb-3 text-xs text-gray-500">Siguiente paso: {nextStep}</p><div className="flex flex-wrap gap-2">{achievements.map(item => <span key={item.label} className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${item.unlocked ? 'border-yellow-200 bg-yellow-50 text-yellow-800' : 'border-gray-200 bg-gray-50 text-gray-400'}`}>{item.icon}{item.label}{item.unlocked ? ' ✓' : ' 🔒'}</span>)}</div></div></section>;
};
