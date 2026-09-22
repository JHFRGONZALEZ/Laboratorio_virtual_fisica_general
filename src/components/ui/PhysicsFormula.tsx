import React from 'react';
import { BlockMath } from 'react-katex';
import type { PracticeId } from '../../types/history.types';

const formulas: Record<PracticeId, { title: string; expressions: string[] }> = {
  mru: { title: 'Modelo matemático del MRU', expressions: ['x(t) = x_0 + vt', 'v(t) = v_0'] },
  mruv: { title: 'Modelo matemático del MRUV', expressions: ['x(t) = x_0 + v_0t + \\frac{1}{2}at^2', 'v(t) = v_0 + at'] },
  'caida-libre': { title: 'Modelo matemático de caída libre', expressions: ['y(t) = y_0 - \\frac{1}{2}gt^2', 'v(t) = -gt'] },
  'tiro-parabolico': { title: 'Modelo matemático del tiro parabólico', expressions: ['x(t) = v_0\\cos(\\theta)t', 'y(t) = v_0\\sin(\\theta)t - \\frac{1}{2}gt^2'] },
  pendulo: { title: 'Modelo matemático del péndulo', expressions: ['T = 2\\pi\\sqrt{\\frac{L}{g}}', 'T^2 = \\frac{4\\pi^2}{g}L'] },
  newton: { title: 'Modelo matemático de las leyes de Newton', expressions: ['\\sum F = ma', 'F_{\\mathrm{fric}} = \\mu N'] },
  hooke: { title: 'Modelo matemático de la Ley de Hooke', expressions: ['F = kx', 'k = \\frac{F}{x}'] },
  energy: { title: 'Modelo matemático de energía mecánica', expressions: ['E_p = mgh', 'E_k = \\frac{1}{2}mv^2', 'E_m = E_p + E_k'] },
};

export const PhysicsFormula: React.FC<{ practiceId: PracticeId }> = ({ practiceId }) => {
  const formula = formulas[practiceId];
  return <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><h3 className="mb-2 text-sm font-semibold text-slate-700">{formula.title}</h3><div className="overflow-x-auto rounded-lg bg-slate-50 px-3 py-2 text-slate-800">{formula.expressions.map(expression => <BlockMath key={expression} math={expression} />)}</div></section>;
};
