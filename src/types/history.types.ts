export type PracticeId = 'mru' | 'mruv' | 'caida-libre' | 'tiro-parabolico' | 'pendulo' | 'newton' | 'hooke';

export interface ExperimentHistory {
  id: string;
  user_id: string;
  practice_id: PracticeId;
  title: string;
  payload: Record<string, unknown>;
  created_at: string;
}
