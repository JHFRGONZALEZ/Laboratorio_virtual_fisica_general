# 🔬 Laboratorio Virtual de Física - MRU

> Práctica interactiva de **Movimiento Rectilíneo Uniforme (MRU)** para estudiantes de Física General.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Descripción

Aplicación web educativa que permite a los estudiantes experimentar, medir y analizar el Movimiento Rectilíneo Uniforme mediante una simulación interactiva con gráficas en tiempo real, recolección de datos y generación de reportes.

## ✨ Características

- 🚗 **Simulación animada** con canvas HTML5 a 60 FPS
- 📊 **Gráficas en tiempo real** (posición-tiempo y velocidad-tiempo)
- 📋 **Recolección de datos** con tabla interactiva
- 🔬 **Análisis estadístico** con regresión lineal y cálculo de error
- 📝 **5 fases pedagógicas**: Exploración → Hipótesis → Experimentación → Análisis → Conclusiones
- ❓ **Preguntas guía** en 4 niveles cognitivos
- 🎲 **Modo error experimental** para simular imprecisiones
- ⚖️ **Comparación MRU vs MRUV**
- 📄 **Generación de reportes PDF**
- 🏆 **Sistema de logros**
- 📱 **Diseño responsive** (desktop, tablet, móvil)

## 🚀 Despliegue en GitHub Pages

### Opción 1: GitHub Actions (Automático) ⭐

1. Crea un repositorio en GitHub
2. Sube todo el código:
   ```bash
   git init
   git add .
   git commit -m "Laboratorio Virtual MRU"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```
3. Ve a **Settings → Pages**
4. En **Source**, selecciona **GitHub Actions**
5. ¡Listo! Tu sitio estará en `https://TU-USUARIO.github.io/TU-REPO/`

### Opción 2: Despliegue Manual

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Los archivos estarán en dist/
```

## 🛠️ Tecnologías

| Tecnología | Uso |
|-----------|-----|
| React 18 + TypeScript | UI |
| Vite | Build tool |
| Tailwind CSS | Estilos |
| Zustand | Estado global |
| Chart.js | Gráficas |
| HTML5 Canvas | Simulación |
| jsPDF | Reportes |

## 📐 Física

La simulación implementa la ecuación fundamental del MRU:

```
x(t) = x₀ + v·t
```

Donde:
- `x(t)` = posición en el tiempo t
- `x₀` = posición inicial
- `v` = velocidad constante
- `t` = tiempo

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── simulation/    # Simulador y controles
│   ├── analysis/      # Gráficas y análisis
│   ├── pedagogy/      # Preguntas y logros
│   └── ui/            # Componentes reutilizables
├── hooks/             # Custom hooks
├── store/             # Estado global (Zustand)
├── types/             # Tipos TypeScript
└── utils/             # Cálculos y exportación
```

## 🎓 Objetivos de Aprendizaje

1. Comprender que en MRU la velocidad es constante
2. Relacionar posición, velocidad y tiempo mediante ecuaciones
3. Interpretar gráficas posición-tiempo y velocidad-tiempo
4. Recolectar datos experimentales y analizarlos críticamente
5. Calcular velocidades a partir de pendientes de gráficas
6. Identificar fuentes de error experimental

## 📄 Licencia

MIT License - Libre para uso educativo.

## 👨‍🏫 Autor

Desarrollado como herramienta educativa para la enseñanza de Física General.

---

**¿Te gustó?** ¡Dale ⭐ al repositorio!
