export type PedagogicalPhaseEnergy = 'exploration' | 'hypothesis' | 'experimentation' | 'analysis' | 'conclusion';

export interface EnergyDataPoint {
  mass: number;
  angle: number;
  friction: number;
  initialHeight: number;
  finalSpeed: number;
  potentialEnergy: number;
  kineticEnergy: number;
  mechanicalEnergy: number;
  theoreticalSpeed: number;
}

export interface EnergyAnalysis {
  theoreticalEnergy: number;
  experimentalEnergy: number;
  percentError: number;
  averageSpeedError: number;
  energyLostToFriction: number;
  equation: string;
  rSquared: number;
}
