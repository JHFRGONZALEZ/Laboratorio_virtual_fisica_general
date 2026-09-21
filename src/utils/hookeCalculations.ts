import type { HookeAnalysis, HookeDataPoint } from '../types/hooke.types';

export function calculateEquilibriumExtension(mass: number, springConstant: number, gravity: number): number {
  return (mass * gravity) / springConstant;
}

export function calculateSpringForce(springConstant: number, extension: number): number {
  return springConstant * extension;
}

export function analyzeHookeData(dataPoints: HookeDataPoint[], theoreticalConstant: number): HookeAnalysis | null {
  if (dataPoints.length < 2) return null;
  const meanX = dataPoints.reduce((sum, point) => sum + point.extension, 0) / dataPoints.length;
  const meanY = dataPoints.reduce((sum, point) => sum + point.force, 0) / dataPoints.length;
  const numerator = dataPoints.reduce((sum, point) => sum + (point.extension - meanX) * (point.force - meanY), 0);
  const denominator = dataPoints.reduce((sum, point) => sum + (point.extension - meanX) ** 2, 0);
  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = meanY - slope * meanX;
  const total = dataPoints.reduce((sum, point) => sum + (point.force - meanY) ** 2, 0);
  const residual = dataPoints.reduce((sum, point) => sum + (point.force - (slope * point.extension + intercept)) ** 2, 0);
  const rSquared = total === 0 ? 1 : 1 - residual / total;
  const percentError = theoreticalConstant === 0 ? 0 : Math.abs((slope - theoreticalConstant) / theoreticalConstant) * 100;
  return { theoreticalConstant, experimentalConstant: slope, percentError, equation: `F = ${slope.toFixed(3)}x + ${intercept.toFixed(3)}`, rSquared, intercept };
}
