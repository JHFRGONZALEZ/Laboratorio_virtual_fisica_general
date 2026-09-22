import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { saveExperiment } from '../../services/historyService';
import type { PracticeId } from '../../types/history.types';
import { openExperimentReport } from '../../utils/experimentReport';
import { PracticeProgress } from '../pedagogy/PracticeProgress';
import { PhysicsFormula } from '../ui/PhysicsFormula';

interface SaveExperimentButtonProps {
  practiceId: PracticeId;
  title: string;
  getPayload: () => Record<string, unknown>;
}

export const SaveExperimentButton: React.FC<SaveExperimentButtonProps> = ({ practiceId, title, getPayload }) => {
  const user = useAuthStore(state => state.user);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const payload = getPayload();
  const phase = typeof payload.phase === 'string' ? payload.phase : 'exploration';
  const phaseIndex = ['exploration', 'hypothesis', 'experimentation', 'analysis', 'conclusion'].indexOf(phase);
  const measurements = Array.isArray(payload.dataPoints) ? payload.dataPoints.length : 0;
  const analysisReady = Boolean(payload.analysis) || phaseIndex >= 3;
  const reportReady = phaseIndex >= 4 && status === 'saved';

  const handleSave = async () => {
    if (!user) return;
    setStatus('saving');
    try {
      await saveExperiment(user.id, practiceId, title, getPayload());
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  };

  return <div className="my-4"><PracticeProgress phaseIndex={Math.max(phaseIndex, 0)} phaseCount={5} phaseLabel={phase === 'exploration' ? 'Exploración' : phase === 'hypothesis' ? 'Hipótesis' : phase === 'experimentation' ? 'Experimentación' : phase === 'analysis' ? 'Análisis' : 'Conclusiones'} measurements={measurements} analysisReady={analysisReady} reportReady={reportReady} accentClass="bg-blue-600" /><div className="container mx-auto px-4 pb-2"><PhysicsFormula practiceId={practiceId} /></div><div className="rounded-xl border border-blue-100 bg-blue-50 p-4"><div className="flex flex-wrap gap-2"><button onClick={() => void handleSave()} disabled={status === 'saving' || !user} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"><Save size={16} />{status === 'saving' ? 'Guardando...' : 'Guardar experimentación'}</button><button onClick={() => openExperimentReport(title, getPayload())} className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50">Generar reporte imprimible</button></div>{!user && <p className="mt-2 text-xs text-blue-800">Inicia sesión con tu correo institucional para guardar este resultado en tu historial.</p>}{status === 'saved' && <span className="mt-2 block text-sm text-green-700">Experimentación guardada en tu historial.</span>}{status === 'error' && <span className="mt-2 block text-sm text-red-700">No se pudo guardar. Revisa la configuración de Supabase.</span>}<p className="mt-2 text-xs text-blue-700">Guarda al finalizar tus mediciones para conservar los resultados y volver a consultarlos.</p></div></div>;
};
