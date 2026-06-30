# 🧪 Testing - S-otify

Este documento resume las verificaciones realizadas sobre el frontend y backend del proyecto S-otify.

---

# Frontend

## Tecnologías

- Vitest
- React Testing Library
- jest-dom
- user-event
- jsdom

---

## Ejecutar tests

Modo interactivo

```bash
npm run test
```

Modo CI

```bash
npm run test:run
```

Build de producción

```bash
npm run build
```

---

## Componentes testeados

### Header

- Renderizado
- Cambio de idioma
- Búsqueda
- Apertura del panel de usuario
- Carga de géneros

---

### Home

- Carga inicial
- Búsqueda
- Estados de carga
- Estados vacíos
- Retry
- Infinite Scroll

---

### SongCard

- Renderizado
- Navegación
- Información mostrada

---

### SongDetails

- Obtención por ID
- Reproducción
- Favoritos
- Manejo de errores

---

### Player

- Renderizado
- Selección de canción
- Reproducción
- Estados vacíos

---

### Footer

- Renderizado
- Información del equipo

---

### LayoutShell

- Layout general
- Sidebar
- Header
- Footer

---

### AsyncState

- Loading
- Error
- Empty
- Retry

---

### Hook useAsyncStatus

- Loading
- Error
- Ejecución correcta

---

## Resultado esperado

```text
Test Files: 9 passed
Tests: 34 passed
```

---

# Backend

## Ejecutar servidor

```bash
npm run dev
```

---

# Endpoints testeados

## Health

GET

```
/api/health
```

---

## Auth

POST

```
/api/auth/register
```

POST

```
/api/auth/login
```

GET

```
/api/auth/me
```

---

## Songs

GET

```
/api/songs
```

GET

```
/api/songs/:id
```

POST

```
/api/songs
```

PUT

```
/api/songs/:id
```

DELETE

```
/api/songs/:id
```

---

## Favorites

GET

```
/api/favorites
```

POST

```
/api/favorites/:songId
```

DELETE

```
/api/favorites/:songId
```

GET

```
/api/favorites/:songId
```

---

# Casos verificados

## Autenticación

- Registro correcto
- Login correcto
- Token JWT válido
- Usuario autenticado
- Token inválido
- Usuario no autenticado

---

## Canciones

- Listado
- Paginación
- Búsqueda
- Obtener por ID
- Crear
- Editar
- Eliminar
- IDs inexistentes

---

## Favoritos

- Agregar favorito
- Eliminar favorito
- Evitar duplicados
- Obtener favoritos del usuario
- Verificar favorito

---

# Códigos HTTP comprobados

| Código | Significado |
|---------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict |

No se detectaron errores **500** durante las pruebas funcionales.

---

# Flujo validado

```
Registro
        │
        ▼
Login
        │
        ▼
JWT
        │
        ▼
Frontend autenticado
        │
        ▼
Consultar canciones
        │
        ▼
Agregar favoritos
        │
        ▼
Ver favoritos
        │
        ▼
Cerrar sesión
```

---

# Resultado final

## Frontend

✅ Tests automáticos

✅ Build de producción

✅ Navegación

✅ Responsive

✅ Internacionalización

---

## Backend

✅ API funcionando

✅ JWT

✅ Prisma

✅ PostgreSQL

✅ CRUD completo

✅ Favoritos

---

# Estado del proyecto

✅ Frontend validado

✅ Backend validado

✅ Integración Front ↔ Back validada

✅ Build correcta

✅ Tests correctos

✅ Proyecto listo para entrega