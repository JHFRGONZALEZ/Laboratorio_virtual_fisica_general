# 🔬 Laboratorio Virtual de Física

> Plataforma educativa interactiva con múltiples prácticas de Física General

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![Practices](https://img.shields.io/badge/Prácticas-2-green)

## 🎯 Descripción

Plataforma web educativa que permite a los estudiantes experimentar con diferentes conceptos de física mediante simulaciones interactivas. Cada práctica incluye simulación en tiempo real, gráficas, recolección de datos, análisis estadístico y generación de reportes.

## 📚 Prácticas Disponibles

### ✅ Práctica 1: MRU (Movimiento Rectilíneo Uniforme)
- 🚗 Simulación de movimiento a velocidad constante
- 📊 Gráficas posición-tiempo y velocidad-tiempo
- 📋 Recolección de datos con tabla interactiva
- 🔬 Análisis con regresión lineal
- 📝 5 fases pedagógicas completas
- 🏆 Sistema de logros

### ✅ Práctica 2: MRUV (Movimiento Rectilíneo Uniformemente Variado)
- 🚀 Simulación de movimiento con aceleración constante
- 📊 Gráficas posición-tiempo (parabólica) y velocidad-tiempo (lineal)
- 🎛️ Controles de aceleración, velocidad inicial y posición inicial
- 🔬 Análisis con regresión cuadrática
- 📝 Sistema pedagógico completo

### 🔄 Próximas Prácticas
- 🍎 Práctica 3: Caída Libre
- 🎯 Práctica 4: Tiro Parabólico
- ⏰ Práctica 5: Péndulo Simple
- ⚖️ Práctica 6: Leyes de Newton

## ✨ Características Generales

- 🎨 **Página de inicio** con dashboard de todas las prácticas
- 🚀 **Navegación fluida** entre prácticas
- 📱 **Diseño responsive** (desktop, tablet, móvil)
- 🎯 **Sistema pedagógico** de 5 fases por práctica
- 📊 **Gráficas en tiempo real** con Chart.js
- 📋 **Recolección de datos** interactiva
- 🔬 **Análisis estadístico** automático
- 📄 **Generación de reportes** PDF
- 🏆 **Sistema de logros** gamificado
- 🎲 **Modo error experimental** para simular imprecisiones

## 🚀 Despliegue en GitHub Pages

### Paso 1: Subir el código

```bash
git init
git add .
git commit -m "Laboratorio Virtual de Física - Múltiples prácticas"
git remote add origin https://github.com/JHFRGONZALEZ/Laboratorio_virtual_fisica_general.git
git branch -M main
git push -u origin main
```

### Paso 2: Configurar GitHub Pages

1. Ve a **Settings → Pages**
2. En **Source** selecciona:
   - **Branch**: `main`
   - **Folder**: `/docs`
3. Haz clic en **Save**

### Paso 3: Acceder al sitio

Tu laboratorio estará disponible en:
```
https://jhfrgonzalez.github.io/Laboratorio_virtual_fisica_general/
```

## 🛠️ Tecnologías

| Tecnología | Uso |
|-----------|-----|
| React 18 + TypeScript | UI |
| Vite | Build tool |
| Tailwind CSS | Estilos |
| Zustand | Estado global |
| Chart.js | Gráficas |
| HTML5 Canvas | Simulaciones |
| Framer Motion | Animaciones |
| React Router | Navegación |
| jsPDF | Reportes |

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Home.tsx                    # Página de inicio
│   ├── simulation/                 # Componentes MRU
│   ├── analysis/                   # Gráficas y análisis MRU
│   ├── pedagogy/                   # Preguntas y logros MRU
│   ├── mruv/                       # Componentes MRUV
│   └── ui/                         # Componentes reutilizables
├── pages/
│   ├── MRUPractice.tsx            # Página completa MRU
│   └── MRUVPractice.tsx           # Página completa MRUV
├── store/
│   ├── labStore.ts                # Estado global MRU
│   └── mruvStore.ts               # Estado global MRUV
├── types/
│   ├── simulation.types.ts        # Tipos MRU
│   └── mruv.types.ts              # Tipos MRUV
├── hooks/
│   ├── useSimulation.ts           # Hook simulación MRU
│   └── useSimulationMRUV.ts       # Hook simulación MRUV
└── utils/
    ├── physicsCalculations.ts     # Cálculos MRU
    ├── mruvCalculations.ts        # Cálculos MRUV
    └── exportReport.ts            # Exportación PDF
```

## 🎓 Cómo Agregar una Nueva Práctica

### Paso 1: Crear los tipos
```typescript
// src/types/nuevaPractica.types.ts
export interface DataPointNueva { ... }
export interface SimulationStateNueva { ... }
```

### Paso 2: Crear el store
```typescript
// src/store/nuevaPracticaStore.ts
import { create } from 'zustand';
export const useLabStoreNueva = create<...>((set) => ({ ... }));
```

### Paso 3: Crear las utilidades de física
```typescript
// src/utils/nuevaPracticaCalculations.ts
export function calculatePosition(...) { ... }
```

### Paso 4: Crear los componentes
```typescript
// src/components/nuevaPractica/VisualizationCanvas.tsx
// src/components/nuevaPractica/ControlPanel.tsx
```

### Paso 5: Crear la página
```typescript
// src/pages/NuevaPracticaPractice.tsx
```

### Paso 6: Agregar la ruta
```typescript
// src/App.tsx
<Route path="/practica/nueva" element={<NuevaPracticaPractice />} />
```

### Paso 7: Agregar al Home
```typescript
// src/components/Home.tsx
{
  id: 'nueva',
  title: 'Práctica X',
  subtitle: 'Nombre de la práctica',
  ...
}
```

## 📄 Licencia

MIT License - Libre para uso educativo.

## 👨‍🏫 Autor

Desarrollado como herramienta educativa para la enseñanza de Física General.

---

**¿Te gustó?** ¡Dale ⭐ al repositorio!
