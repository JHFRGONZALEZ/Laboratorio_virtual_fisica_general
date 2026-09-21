import { supabase } from '../lib/supabase';
import type { ExperimentHistory, PracticeId } from '../types/history.types';

export async function listExperiments(userId: string): Promise<ExperimentHistory[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('experiment_history').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as ExperimentHistory[];
}

export async function saveExperiment(userId: string, practiceId: PracticeId, title: string, payload: Record<string, unknown>): Promise<void> {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { error } = await supabase.from('experiment_history').insert({ user_id: userId, practice_id: practiceId, title, payload });
  if (error) throw error;
}
