# S-otify Backend API

API REST para S-otify, una Single Page Application de música desarrollada con React. Este backend reemplaza MockAPI y localStorage, proporcionando persistencia real con Node.js, Express, Prisma ORM y PostgreSQL.

---

## Integrantes

| Nombre | Legajo | Rol |
|--------|--------|-----|
| Lucas Ortiz | 5561 | PM / Scrum Master |
| Gaston Berhau | completar | Desarrollador |
| Fabrizio Brollo | completar | Desarrollador |
| Valentin Bustamante | completar | Desarrollador |

---

## Links

| Recurso | URL |
|---------|-----|
| **Repositorio Frontend** | [github.com/bgastong/S-otify](https://github.com/bgastong/S-otify) |
| **Tablero Kanban (Notion)** | https://app.notion.com/p/36e62f87d28180acb56ee0a10df73360?v=36e62f87d28180198c0e000c2eef660d&source=copy_link |
| **Deploy Backend (Vercel)** | [s-otify-backend.vercel.app](https://s-otify-backend.vercel.app) |
| **Deploy Frontend** | [snotify.vercel.app](https://snotify.vercel.app) |

---

## Descripción de la aplicación

S-otify es una SPA de música inspirada en Spotify. Permite explorar un catálogo de canciones, ver el detalle de cada canción y reproducir audio. La aplicación está desarrollada con React 19, Vite, React Router y Tailwind CSS.

Este repositorio contiene el **backend** que da soporte a la aplicación, implementando una API REST con operaciones CRUD completas y paginación.

---

## Entidad principal: Song (Canción)

La entidad central del sistema es `Song`, que representa una canción en el catálogo.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Int (auto) | Identificador único |
| `name` | String | Título de la canción |
| `artist` | String | Nombre del artista |
| `youtubeId` | String | ID de YouTube (único, 11 caracteres) |
| `image` | String | URL de la portada (600×600) |
| `genre` | String | Género musical |
| `album` | String | Nombre del álbum (default: "Unknown Album") |
| `duration` | String | Duración en formato MM:SS (default: "0:00") |
| `audioUrl` | String | URL del archivo de audio |
| `createdAt` | DateTime | Fecha de creación (automático) |
| `updatedAt` | DateTime | Fecha de última actualización (automático) |

---

## Instalación y ejecución local

### Requisitos previos

- **Node.js** 20 o superior
- **npm** 10 o superior
- **PostgreSQL** (local o cuenta gratuita en [Neon](https://neon.tech))

### 1. Clonar el repositorio

```bash
git clone https://github.com/luquitas45/s-otify-backend.git
cd s-otify-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar el archivo `.env` con los valores correspondientes (ver sección [Variables de entorno](#-variables-de-entorno)).

### 4. Ejecutar migraciones

```bash
npm run prisma:migrate
```

Este comando crea las tablas en la base de datos según el schema definido en `prisma/schema.prisma`.

### 5. Ejecutar el seed

```bash
npm run prisma:seed
```

Carga 28 canciones de prueba con 14 géneros musicales distintos.

> **Importante**: El seed elimina todos los datos existentes antes de insertar los nuevos.

### 6. Iniciar el servidor en desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

### 7. Verificar que funciona

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "message": "API funcionando correctamente"
}
```

---

## Variables de entorno

Copiar `.env.example` a `.env` y completar los valores:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | String de conexión a PostgreSQL (Neon) | `postgresql://user:pass@ep-xyz.us-east-2.aws.neon.tech/db?sslmode=require` |
| `PORT` | Puerto del servidor | `3000` |
| `FRONTEND_URL` | URL del frontend para CORS | `http://localhost:5173` (dev) / `https://snotify.vercel.app` (prod) |

> **Importante**: El archivo `.env` contiene credenciales reales. **Nunca** se debe commitear al repositorio. Está incluido en `.gitignore`. Compartir las credenciales por mensajería privada.

---

## Migraciones

Las migraciones se gestionan con Prisma Migrate.

### Crear una nueva migración después de modificar el schema

```bash
npx prisma migrate dev --name descripcion-del-cambio
```

### Aplicar migraciones en producción

```bash
npx prisma migrate deploy
```

### Regenerar el cliente de Prisma

```bash
npm run prisma:generate
```

La carpeta `prisma/migrations/` contiene el historial completo de migraciones y está incluida en el repositorio.

---

## Seed

El proyecto incluye un script de seed que carga **28 canciones** de prueba con **14 géneros musicales** distintos (2 canciones por género).

### Ejecutar el seed

```bash
npm run prisma:seed
```

### Datos de prueba

- Imágenes generadas con placehold.co (colores por género)
- YouTube IDs válidos de 11 caracteres
- Mix de canciones con y sin audioUrl
- Mix de canciones con información completa y mínima

---

## Endpoints de la API

### Health Check

```
GET /api/health
```

**Respuesta 200**:
```json
{
  "status": "ok",
  "message": "API funcionando correctamente"
}
```

### Canciones — CRUD

| Método | Ruta | Body | Respuesta |
|--------|------|------|-----------|
| `GET` | `/api/songs` | — | `{ data: Song[], pagination }` (200) |
| `GET` | `/api/songs/:id` | — | `{ data: Song }` (200) |
| `POST` | `/api/songs` | `{ name*, artist*, youtubeId*, genre*, image*, audioUrl* }` | `{ data: Song }` (201) |
| `PUT` | `/api/songs/:id` | `{ name*, artist*, youtubeId*, genre*, image*, audioUrl* }` | `{ data: Song }` (200) |
| `DELETE` | `/api/songs/:id` | — | `{ message: "Canción eliminada" }` (200) |

`*` Campos obligatorios. `album` y `duration` son opcionales (tienen valores por defecto).

### Ejemplos de uso

#### Listar canciones

```bash
curl "http://localhost:3000/api/songs?page=1"
```

```json
{
  "status": "ok",
  "data": [{ "id": 1, "name": "Buenos Tiempos", "artist": "Dillom", "genre": "Trap", ... }],
  "pagination": { "page": 1, "pageSize": 20, "total": 28, "hasMore": true }
}
```

#### Obtener canción por ID

```bash
curl http://localhost:3000/api/songs/1
```

#### Crear canción

```bash
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bohemian Rhapsody",
    "artist": "Queen",
    "youtubeId": "fJ9rUzIMcZQ",
    "genre": "Rock",
    "image": "https://placehold.co/600x600/CC0000/white?text=Rock",
    "audioUrl": "https://example.com/audio.mp3"
  }'
```

**Respuesta 201**:
```json
{ "status": "ok", "data": { "id": 29, "name": "Bohemian Rhapsody", ... } }
```

#### Error de validación (400)

```bash
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -d '{ "name": "" }'
```

```json
{
  "error": "Datos inválidos",
  "details": [
    { "field": "name", "message": "El nombre es obligatorio" },
    { "field": "artist", "message": "El artista es obligatorio" },
    { "field": "genre", "message": "El género es obligatorio" },
    { "field": "youtubeId", "message": "El ID de YouTube es obligatorio" },
    { "field": "image", "message": "La imagen es obligatoria" },
    { "field": "audioUrl", "message": "La URL de audio es obligatoria" }
  ]
}
```

#### Recurso no encontrado (404)

```bash
curl http://localhost:3000/api/songs/9999
```

```json
{ "error": "Canción no encontrada" }
```

### Códigos de respuesta HTTP

| Código | Significado |
|--------|-------------|
| `200` | OK |
| `201` | Created |
| `400` | Bad Request |
| `404` | Not Found |
| `500` | Internal Server Error |

---

## Capturas de pantalla

> *[Agregar capturas de Postman/HTTPie mostrando los endpoints principales]*

---

*Trabajo Práctico — Programación Web Avanzada — Facultad de Informática, UNCo*
