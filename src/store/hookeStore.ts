import { create } from 'zustand';
import type { HookeDataPoint, HookeState, PedagogicalPhaseHooke } from '../types/hooke.types';
import { calculateEquilibriumExtension } from '../utils/hookeCalculations';

interface HookeStore extends HookeState {
  setMass: (mass: number) => void;
  setSpringConstant: (value: number) => void;
  setGravity: (gravity: number) => void;
  toggleRunning: () => void;
  reset: () => void;
  updateMotion: (dt: number) => void;
  addDataPoint: () => void;
  clearDataPoints: () => void;
  removeDataPoint: (index: number) => void;
  setPhase: (phase: PedagogicalPhaseHooke) => void;
}

export const useLabStoreHooke = create<HookeStore>((set, get) => ({
  mass: 0.2,
  springConstant: 12,
  gravity: 9.81,
  extension: 0,
  velocity: 0,
  time: 0,
  isRunning: false,
  hasSettled: false,
  dataPoints: [],
  phase: 'exploration',
  setMass: (mass) => set({ mass, extension: 0, velocity: 0, time: 0, hasSettled: false }),
  setSpringConstant: (springConstant) => set({ springConstant, extension: 0, velocity: 0, time: 0, hasSettled: false }),
  setGravity: (gravity) => set({ gravity, extension: 0, velocity: 0, time: 0, hasSettled: false }),
  toggleRunning: () => set(state => ({ isRunning: !state.isRunning, hasSettled: false })),
  reset: () => set({ extension: 0, velocity: 0, time: 0, isRunning: false, hasSettled: false, dataPoints: [] }),
  updateMotion: (dt) => set(state => {
    if (!state.isRunning || state.hasSettled) return state;
    const equilibrium = calculateEquilibriumExtension(state.mass, state.springConstant, state.gravity);
    const acceleration = (state.mass * state.gravity - state.springConstant * state.extension - 0.35 * state.velocity) / state.mass;
    const velocity = state.velocity + acceleration * dt;
    const extension = Math.max(0, state.extension + velocity * dt);
    const settled = Math.abs(extension - equilibrium) < 0.0008 && Math.abs(velocity) < 0.01 && state.time > 0.5;
    return { extension: settled ? equilibrium : extension, velocity: settled ? 0 : velocity, time: state.time + dt, hasSettled: settled, isRunning: settled ? false : state.isRunning };
  }),
  addDataPoint: () => set(state => {
    const force = state.mass * state.gravity;
    const point: HookeDataPoint = { mass: state.mass, force, extension: calculateEquilibriumExtension(state.mass, state.springConstant, state.gravity) };
    return { dataPoints: [...state.dataPoints, point] };
  }),
  clearDataPoints: () => set({ dataPoints: [] }),
  removeDataPoint: (index) => set(state => ({ dataPoints: state.dataPoints.filter((_, itemIndex) => itemIndex !== index) })),
  setPhase: (phase) => set({ phase }),
}));
