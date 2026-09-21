import { create } from 'zustand';
import type { EnergyDataPoint, PedagogicalPhaseEnergy } from '../types/energy.types';
import { calculateEnergyData, calculateTheoreticalSpeed } from '../utils/energyCalculations';

interface EnergyStore {
  mass: number; gravity: number; angle: number; friction: number; initialHeight: number; position: number; speed: number; time: number; isRunning: boolean; hasFinished: boolean; dataPoints: EnergyDataPoint[]; phase: PedagogicalPhaseEnergy;
  setMass: (value: number) => void; setGravity: (value: number) => void; setAngle: (value: number) => void; setFriction: (value: number) => void; setInitialHeight: (value: number) => void; toggleRunning: () => void; reset: () => void; updateMotion: (dt: number) => void; addDataPoint: () => void; clearDataPoints: () => void; setPhase: (phase: PedagogicalPhaseEnergy) => void;
}

export const useLabStoreEnergy = create<EnergyStore>((set, get) => ({
  mass: 0.5, gravity: 9.81, angle: 30, friction: 0.1, initialHeight: 2, position: 0, speed: 0, time: 0, isRunning: false, hasFinished: false, dataPoints: [], phase: 'exploration',
  setMass: mass => set({ mass }), setGravity: gravity => set({ gravity }), setAngle: angle => set({ angle }), setFriction: friction => set({ friction }), setInitialHeight: initialHeight => set({ initialHeight, position: 0, speed: 0, time: 0, hasFinished: false }),
  toggleRunning: () => set(state => ({ isRunning: !state.isRunning, hasFinished: false })),
  reset: () => set({ position: 0, speed: 0, time: 0, isRunning: false, hasFinished: false, dataPoints: [] }),
  updateMotion: dt => set(state => {
    if (!state.isRunning || state.hasFinished) return state;
    const distance = state.initialHeight / Math.max(Math.sin(state.angle * Math.PI / 180), 0.1);
    const acceleration = state.gravity * Math.sin(state.angle * Math.PI / 180) * (1 - Math.min(state.friction, 0.9));
    const speed = Math.min(state.speed + acceleration * dt, calculateTheoreticalSpeed(state.initialHeight, state.gravity, state.friction));
    const position = Math.min(state.position + speed * dt, distance);
    const finished = position >= distance - 0.01;
    return { speed: finished ? calculateTheoreticalSpeed(state.initialHeight, state.gravity, state.friction) : speed, position: finished ? distance : position, time: state.time + dt, hasFinished: finished, isRunning: finished ? false : state.isRunning };
  }),
  addDataPoint: () => set(state => { const point = calculateEnergyData(state.mass, state.initialHeight, state.gravity, state.friction); point.angle = state.angle; point.finalSpeed = state.hasFinished ? state.speed : point.theoreticalSpeed; point.kineticEnergy = 0.5 * state.mass * point.finalSpeed ** 2; point.mechanicalEnergy = point.kineticEnergy; return { dataPoints: [...state.dataPoints, point] }; }),
  clearDataPoints: () => set({ dataPoints: [] }), setPhase: phase => set({ phase }),
}));
