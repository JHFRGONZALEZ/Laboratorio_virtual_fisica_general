import React, { useEffect, useRef } from 'react';
import { useLabStoreHooke } from '../../store/hookeStore';

export const VisualizationCanvasHooke: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { extension, springConstant, mass, gravity, isRunning, hasSettled, time } = useLabStoreHooke();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);
    const background = context.createLinearGradient(0, 0, 0, height);
    background.addColorStop(0, '#eff6ff');
    background.addColorStop(1, '#dbeafe');
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
    const ceilingY = 45;
    const scale = 250;
    const springTop = 75;
    const massY = springTop + extension * scale;
    context.fillStyle = '#374151';
    context.fillRect(120, ceilingY, 560, 12);
    context.strokeStyle = '#64748b';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(400, springTop);
    const turns = 14;
    for (let index = 1; index <= turns; index += 1) {
      const y = springTop + (massY - springTop) * (index / (turns + 1));
      context.lineTo(400 + (index % 2 === 0 ? 28 : -28), y);
    }
    context.lineTo(400, massY);
    context.stroke();
    context.fillStyle = '#2563eb';
    context.beginPath();
    context.arc(400, massY + 25, 25, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#1e3a8a';
    context.font = 'bold 14px sans-serif';
    context.textAlign = 'center';
    context.fillText(`${mass.toFixed(2)} kg`, 400, massY + 30);
    context.strokeStyle = '#16a34a';
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(470, massY + 25);
    context.lineTo(470, massY + 25 + mass * gravity * 5);
    context.stroke();
    context.fillStyle = '#166534';
    context.font = '12px monospace';
    context.fillText(`F = ${(mass * gravity).toFixed(2)} N`, 545, massY + 35);
    context.fillStyle = '#1e3a8a';
    context.fillRect(18, 16, 230, 62);
    context.fillStyle = '#dbeafe';
    context.textAlign = 'left';
    context.font = '12px monospace';
    context.fillText(`x = ${(extension * 100).toFixed(2)} cm`, 30, 40);
    context.fillText(`t = ${time.toFixed(2)} s`, 30, 62);
    context.fillStyle = hasSettled ? '#166534' : isRunning ? '#92400e' : '#475569';
    context.textAlign = 'right';
    context.fillText(hasSettled ? 'EQUILIBRIO' : isRunning ? 'OSCILANDO' : 'LISTO', width - 22, 32);
    context.fillStyle = '#334155';
    context.textAlign = 'center';
    context.font = '13px monospace';
    context.fillText(`Ley de Hooke: F = kx   k = ${springConstant.toFixed(1)} N/m`, width / 2, height - 20);
  }, [extension, springConstant, mass, gravity, isRunning, hasSettled, time]);

  return <canvas ref={canvasRef} width={800} height={420} className="w-full rounded-xl border border-blue-200 bg-white shadow-lg" style={{ maxWidth: '800px' }} />;
};
