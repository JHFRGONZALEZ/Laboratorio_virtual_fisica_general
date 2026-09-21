export type PedagogicalPhaseHooke = 'exploration' | 'hypothesis' | 'experimentation' | 'analysis' | 'conclusion';

export interface HookeDataPoint {
  mass: number;
  force: number;
  extension: number;
}

export interface HookeState {
  mass: number;
  springConstant: number;
  gravity: number;
  extension: number;
  velocity: number;
  time: number;
  isRunning: boolean;
  hasSettled: boolean;
  dataPoints: HookeDataPoint[];
  phase: PedagogicalPhaseHooke;
}

export interface HookeAnalysis {
  theoreticalConstant: number;
  experimentalConstant: number;
  percentError: number;
  equation: string;
  rSquared: number;
  intercept: number;
}
