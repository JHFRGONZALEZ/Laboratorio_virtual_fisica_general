function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character] ?? character));
}

const fieldLabels: Record<string, string> = {
  practiceId: 'Práctica',
  phase: 'Fase alcanzada',
  dataPoints: 'Datos experimentales',
  analysis: 'Análisis de resultados',
  hypothesis: 'Hipótesis',
  conclusions: 'Conclusiones',
  savedAt: 'Fecha de guardado',
  mass: 'Masa',
  gravity: 'Gravedad',
  initialHeight: 'Altura inicial',
  friction: 'Fricción',
  springConstant: 'Constante elástica',
  angle: 'Ángulo',
};

function renderValue(value: unknown): string {
  if (Array.isArray(value)) return `<ul>${value.map(item => `<li>${renderValue(item)}</li>`).join('')}</ul>`;
  if (value && typeof value === 'object') return `<dl>${Object.entries(value as Record<string, unknown>).filter(([key, item]) => key !== 'trailPoints' && key !== 'isRunning' && key !== 'hasLanded' && typeof item !== 'function').map(([key, item]) => `<dt>${escapeHtml(fieldLabels[key] ?? key)}</dt><dd>${renderValue(item)}</dd>`).join('')}</dl>`;
  return escapeHtml(String(value ?? ''));
}

export function openExperimentReport(title: string, payload: Record<string, unknown>): void {
  const report = window.open('', '_blank');
  if (!report) return;
  const logoUrl = `${window.location.origin}${window.location.pathname.replace(/\/[^/]*$/, '')}/unad-logo.png.png`;
  report.document.write(`<!doctype html><html><head><title>${escapeHtml(title)}</title><style>body{font-family:Arial,sans-serif;padding:24px;color:#1f2937}header img{display:block;max-width:520px;width:100%;margin-bottom:16px}h1{color:#1d4ed8;border-bottom:2px solid #93c5fd;padding-bottom:8px}h2{color:#374151;margin-top:24px}dl{display:grid;grid-template-columns:minmax(160px,220px) 1fr;gap:8px;border-bottom:1px solid #e5e7eb;padding:8px 0}dt{font-weight:700;color:#374151}dd{margin:0;word-break:break-word}li{margin:4px 0}.author{margin-top:32px;border-top:1px solid #d1d5db;padding-top:12px;color:#4b5563;font-size:12px}</style></head><body><header><img src="${logoUrl}" alt="UNAD, ECBTI y CIP Dosquebradas" /></header><h1>${escapeHtml(title)}</h1><p><strong>Reporte de experimentación</strong></p><p>Generado: ${new Date().toLocaleString()}</p><h2>Resultados registrados</h2>${renderValue(payload)}<footer class="author"><strong>Desarrollado por Jhon Fredy González</strong><br/>Magíster en Enseñanza de la Física • ECBTI • UNAD • CIP Dosquebradas<br/>JHON.GONZALEZ@UNAD.EDU.CO</footer></body></html>`);
  report.document.close();
  report.print();
}