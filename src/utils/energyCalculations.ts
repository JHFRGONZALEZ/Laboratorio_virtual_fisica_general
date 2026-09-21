import type { EnergyAnalysis, EnergyDataPoint } from '../types/energy.types';

export function calculateTheoreticalSpeed(height: number, gravity: number, friction: number): number {
  return Math.sqrt(Math.max(0, 2 * gravity * height * (1 - Math.min(friction, 0.95))));
}

export function calculateEnergyData(mass: number, height: number, gravity: number, friction: number): EnergyDataPoint {
  const potentialEnergy = mass * gravity * height;
  const theoreticalSpeed = calculateTheoreticalSpeed(height, gravity, friction);
  const kineticEnergy = 0.5 * mass * theoreticalSpeed ** 2;
  return { mass, angle: 0, friction, initialHeight: height, finalSpeed: theoreticalSpeed, potentialEnergy, kineticEnergy, mechanicalEnergy: kineticEnergy, theoreticalSpeed };
}

export function analyzeEnergyData(points: EnergyDataPoint[], gravity: number): EnergyAnalysis | null {
  if (points.length < 2) return null;
  const theoreticalEnergy = points.reduce((sum, point) => sum + point.potentialEnergy, 0) / points.length;
  const experimentalEnergy = points.reduce((sum, point) => sum + point.kineticEnergy, 0) / points.length;
  const averageSpeedError = points.reduce((sum, point) => sum + Math.abs(point.finalSpeed - point.theoreticalSpeed) / Math.max(point.theoreticalSpeed, 0.001) * 100, 0) / points.length;
  const energyLostToFriction = theoreticalEnergy - experimentalEnergy;
  const meanHeight = points.reduce((sum, point) => sum + point.initialHeight, 0) / points.length;
  const slope = points.reduce((sum, point) => sum + point.initialHeight * point.kineticEnergy, 0) / Math.max(points.reduce((sum, point) => sum + point.initialHeight ** 2, 0), 0.001);
  const expectedSlope = gravity;
  const percentError = expectedSlope === 0 ? 0 : Math.abs((slope - expectedSlope) / expectedSlope) * 100;
  const residual = points.reduce((sum, point) => sum + (point.kineticEnergy - slope * point.initialHeight) ** 2, 0);
  const total = points.reduce((sum, point) => sum + (point.kineticEnergy - experimentalEnergy) ** 2, 0);
  return { theoreticalEnergy, experimentalEnergy, percentError, averageSpeedError, energyLostToFriction, equation: `K = ${slope.toFixed(3)}h`, rSquared: total === 0 ? 1 : 1 - residual / total };
}
