# Acceso institucional e historial

## Configuración local

1. Crea un proyecto en Supabase.
2. Copia `.env.example` como `.env.local`.
3. Completa `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con las claves públicas del proyecto.
4. En Supabase, abre **SQL Editor** y ejecuta `supabase/schema.sql`.
5. En **Authentication > URL Configuration**, agrega:
   - `https://jhfrgonzalez.github.io/Laboratorio_virtual_fisica_general/`
   - La URL local de Vite durante desarrollo.
6. Habilita el proveedor de correo. El laboratorio usa enlaces de acceso de un solo uso, no contraseñas almacenadas por la aplicación.

La interfaz acepta únicamente `@unadvirtual.edu.co` y `@unad.edu.co`. La clave `anon` puede estar en el frontend; nunca publiques una `service_role` key.

## Flujo de uso

El estudiante entra por **Acceso institucional**, recibe un enlace en su correo y después puede abrir las seis prácticas. Al terminar puede guardar la experimentación y consultar sus registros en **Mi historial**. Cada registro queda asociado al usuario autenticado y las políticas RLS impiden que un estudiante lea los experimentos de otro.

## Publicación

Configura las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` como secrets o variables del workflow de GitHub Actions. Sin ellas, la interfaz se compila, pero el acceso y el guardado remoto permanecen deshabilitados.