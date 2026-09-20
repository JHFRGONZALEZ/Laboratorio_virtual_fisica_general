# 🚀 Guía de Despliegue - Laboratorio Virtual de Física

Repositorio y sitio publicados:

- Repositorio: https://github.com/JHFRGONZALEZ/Laboratorio_virtual_fisica_general
- Sitio: https://jhfrgonzalez.github.io/Laboratorio_virtual_fisica_general/

## ✅ Tu proyecto está listo para compartir

Esta guía te explica paso a paso cómo publicar tu laboratorio virtual en GitHub Pages para que cualquier persona pueda acceder con un link.

---

## 📋 Paso 1: Crear el repositorio en GitHub

1. Usa el repositorio existente `JHFRGONZALEZ/Laboratorio_virtual_fisica_general`.
2. Si se crea otro repositorio, conserva el nombre exacto para que coincida con la URL publicada.

---

## 📋 Paso 2: Subir tu código

Abre la terminal en la carpeta de tu proyecto y ejecuta:

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "🔬 Laboratorio Virtual de Física - MRU"

# Conectar con GitHub
git remote add origin https://github.com/JHFRGONZALEZ/Laboratorio_virtual_fisica_general.git

# Subir el código
git branch -M main
git push -u origin main
```

---

## 📋 Paso 3: Preparar y publicar una actualización

Desde la carpeta del proyecto ejecuta:

```bash
npm ci
npm run build
```

El comando `build` genera la versión publicable dentro de `docs/`. Comprueba que exista `docs/index.html` y después sube los cambios:

```bash
git add src docs DEPLOY.md
git commit -m "Corrige simulaciones de caída libre y proyectiles"
git push origin main
```

## 📋 Paso 4: Activar GitHub Pages con Actions

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En **"Source"**, cambia de "Deploy from a branch" a **"GitHub Actions"**
5. ¡Eso es todo! No necesitas configurar nada más.

---

## 📋 Paso 5: Esperar el despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Build and Deploy" ejecutándose
3. Espera ~2 minutos
4. Cuando aparezca ✅ verde, tu sitio está en línea

---

## 📋 Paso 6: ¡Compartir!

Tu sitio está disponible en:

```
https://jhfrgonzalez.github.io/Laboratorio_virtual_fisica_general/
```

El proyecto usa `HashRouter`, por lo que las prácticas se abren con estas rutas:

```
https://jhfrgonzalez.github.io/Laboratorio_virtual_fisica_general/#/practica/caida-libre
https://jhfrgonzalez.github.io/Laboratorio_virtual_fisica_general/#/practica/tiro-parabolico
```

---

## 🔄 Actualizaciones automáticas

Cada vez que hagas push a la rama `main`, el sitio se actualizará automáticamente:

```bash
# Hacer cambios...
git add .
git commit -m "Mejoras en la simulación"
git push
```

En ~2 minutos, los cambios estarán en línea. Si GitHub Pages publica directamente la carpeta `docs`, conserva el build generado antes de hacer push.

---

## 📱 Compartir en redes sociales

Cuando compartas el link, se verá así gracias a las meta tags:

- **Título**: 🔬 Laboratorio Virtual de Física - MRU
- **Descripción**: Experimenta, mide y analiza el Movimiento Rectilíneo Uniforme
- **Color del tema**: Azul (#2563eb)

---

## ❓ Solución de problemas

### El sitio muestra 404
- Verifica que el workflow se ejecutó correctamente en Actions
- Asegúrate de que Pages está configurado con "GitHub Actions" como Source

### Los estilos no cargan
- Verifica que `vite.config.js` tiene `base: "./"`

### El build falla
- Ejecuta `npm run build` localmente para ver errores
- Asegúrate de que `node_modules` está en `.gitignore`

---

## 🎯 URL personalizada (Opcional)

Si tienes un dominio propio, puedes configurarlo en:
**Settings → Pages → Custom domain**

---

## 📊 Estadísticas

Para ver cuántas personas visitan tu sitio:
- GitHub no provee analytics directamente
- Puedes agregar Google Analytics o Plausible editando `index.html`

---

¡Listo! Tu laboratorio virtual está compartido con el mundo 🌍
