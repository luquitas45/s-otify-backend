# S-otify Backend API

API REST para S-otify, una Single Page Application de música desarrollada con React. Este backend reemplaza MockAPI y localStorage, proporcionando persistencia real con Node.js, Express, Prisma ORM y PostgreSQL.

---

## Integrantes

| Nombre | Legajo | Rol |
|--------|--------|-----|
| Lucas Ortiz | [5561] | PM / Scrum Master |
| Gaston Berhau | [completar] | Desarrollador |
| Fabrizio Brollo | [completar] | Desarrollador |
| Valentin Bustamante | [completar] | Desarrollador |

---

## Links

| Recurso | URL |
|---------|-----|
| **Repositorio Frontend** | [github.com/bgastong/S-otify](https://github.com/bgastong/S-otify) |
| **Tablero Kanban (Notion)** | [completar] |
| **Deploy Backend (Vercel)** | [completar] |
| **Deploy Frontend** | [snotify.vercel.app](https://snotify.vercel.app) |

---

## Descripción de la aplicación

S-otify es una SPA de música inspirada en Spotify. Permite explorar un catálogo de canciones, buscar por nombre o artista, filtrar por género, ver el detalle de cada canción, gestionar favoritos y reproducir audio. La aplicación está desarrollada con React 19, Vite, React Router y Tailwind CSS.

Este repositorio contiene el **backend** que da soporte a la aplicación, implementando una API REST con operaciones CRUD completas, búsqueda con ILIKE, paginación offset, filtro por género, y gestión de favoritos.

---

## Entidad principal: Song (Canción)

La entidad central del sistema es `Song`, que representa una canción en el catálogo.

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Int (auto) | Identificador único |
| `name` | String | Título de la canción |
| `artist` | String | Nombre del artista |
| `image` | String (URL) | Imagen de portada (600×600) |
| `youtubeId` | String | ID de YouTube (11 caracteres alfanuméricos) |
| `genre` | String | Género musical (15 géneros en el seed) |
| `album` | String | Nombre del álbum (default: "Unknown Album") |
| `duration` | String | Duración en formato `MM:SS` (default: "0:00") |
| `audioUrl` | String | URL del archivo de audio (default: `""`) |
| `createdAt` | DateTime | Fecha de creación (automático) |
| `updatedAt` | DateTime | Fecha de última actualización (automático) |

### Entidad secundaria: FavoriteSong

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Int (auto) | Identificador único |
| `userId` | String | Identificador de usuario (default: "anonymous") |
| `songId` | Int | Referencia a la canción (foreign key) |
| `createdAt` | DateTime | Fecha en que se marcó como favorito |

---

## Instalación y ejecución local

### Requisitos previos

- **Node.js** 20 o superior
- **npm** 10 o superior
- **PostgreSQL** (local o cuenta gratuita en [Neon](https://neon.tech))

### 1. Clonar el repositorio

```bash
git clone [completar-URL-del-repo]
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

Carga 30 canciones de prueba con 15 géneros musicales distintos.

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

## 🔧 Variables de entorno

Copiar `.env.example` a `.env` y completar los valores:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | String de conexión a PostgreSQL (Neon) | `postgresql://user:pass@ep-xyz.us-east-2.aws.neon.tech/db?sslmode=require` |
| `PORT` | Puerto del servidor | `3000` |
| `FRONTEND_URL` | URL del frontend para CORS | `http://localhost:5173` (dev) / `https://snotify.vercel.app` (prod) |
| `NODE_ENV` | Entorno de ejecución | `development` / `production` |

> ⚠️ **Importante**: El archivo `.env` contiene credenciales reales. **Nunca** se debe commitear al repositorio. Está incluido en `.gitignore`. Compartir las credenciales por mensajería privada.

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

El proyecto incluye un script de seed que carga **30 canciones** de prueba con **15 géneros musicales** distintos (2 canciones por género).

### Ejecutar el seed

```bash
npm run prisma:seed
```

### Géneros incluidos

Trap, Rap, Hip Hop, Experimental Hip Hop, Cumbia, R&B, Instrumental, Electronic, Alternative, Indie Rock, Post Punk, Shoegaze, Rock, Psychedelic Rock, Experimental Rock.

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

---

### Canciones

| Método | Ruta | Query Params | Body | Respuesta |
|--------|------|-------------|------|-----------|
| `GET` | `/api/songs` | `page`, `limit`, `search`, `genre` | — | `{ data: Song[], page, limit, total, totalPages }` |
| `GET` | `/api/songs/:id` | — | — | `Song` |
| `POST` | `/api/songs` | — | `{ name*, artist*, youtubeId*, image*, ... }` | `Song` (201) |
| `PUT` | `/api/songs/:id` | — | `{ name, artist, ... }` | `Song` (200) |
| `DELETE` | `/api/songs/:id` | — | — | `{ message }` (200) |

#### Ejemplo: Listar canciones (primera página, 10 resultados)

```bash
curl "http://localhost:3000/api/songs?page=1&limit=10"
```

#### Ejemplo: Buscar por nombre o artista

```bash
curl "http://localhost:3000/api/songs?search=rock"
```

#### Ejemplo: Buscar con filtro de género

```bash
curl "http://localhost:3000/api/songs?search=rock&genre=Rock"
```

#### Ejemplo: Obtener canción por ID

```bash
curl http://localhost:3000/api/songs/5
```

#### Ejemplo: Crear canción

```bash
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bohemian Rhapsody",
    "artist": "Queen",
    "youtubeId": "fJ9rUzIMcZQ",
    "image": "https://placehold.co/600x600/CC0000/white?text=Queen",
    "genre": "Rock"
  }'
```

**Respuesta 201**:
```json
{
  "id": 31,
  "name": "Bohemian Rhapsody",
  "artist": "Queen",
  "youtubeId": "fJ9rUzIMcZQ",
  "image": "https://placehold.co/600x600/CC0000/white?text=Queen",
  "genre": "Rock",
  "album": "Unknown Album",
  "duration": "0:00",
  "audioUrl": "",
  "createdAt": "2026-05-28T00:00:00.000Z",
  "updatedAt": "2026-05-28T00:00:00.000Z"
}
```

#### Ejemplo: Error de validación (400)

```bash
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -d '{ "name": "" }'
```

**Respuesta 400**:
```json
{
  "error": "Error de validación",
  "fields": [
    { "field": "name", "message": "El nombre es requerido" },
    { "field": "artist", "message": "El artista es requerido" },
    { "field": "youtubeId", "message": "El YouTube ID es requerido" },
    { "field": "image", "message": "La imagen es requerida" }
  ]
}
```

---

### Favoritos

| Método | Ruta | Respuesta |
|--------|------|-----------|
| `GET` | `/api/songs/:id/favorites` | `{ songId, isFavorite }` (200) |
| `POST` | `/api/songs/:id/favorites` | `{ message }` (201) |
| `DELETE` | `/api/songs/:id/favorites` | `{ message }` (200) |

#### Ejemplo: Agregar a favoritos

```bash
curl -X POST http://localhost:3000/api/songs/5/favorites
```

**Respuesta 201**:
```json
{
  "message": "Canción agregada a favoritos"
}
```

---

### Códigos de respuesta HTTP

| Código | Significado | Cuándo se usa |
|--------|-------------|---------------|
| `200` | OK | GET, PUT, DELETE exitosos |
| `201` | Created | POST exitoso |
| `400` | Bad Request | Body inválido (validación) |
| `404` | Not Found | Recurso no encontrado |
| `409` | Conflict | Favorito duplicado |
| `500` | Internal Server Error | Error inesperado del servidor |

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con hot reload |
| `npm start` | Inicia el servidor en modo producción |
| `npm run prisma:generate` | Genera el cliente de Prisma |
| `npm run prisma:migrate` | Ejecuta migraciones pendientes en desarrollo |
| `npm run prisma:seed` | Carga los datos iniciales (seed) |

---

## Deploy

- **Backend**: Desplegado en [Vercel](https://vercel.com) — [completar-URL]
- **Base de datos**: [Neon](https://neon.tech) — PostgreSQL serverless
- **Frontend**: [snotify.vercel.app](https://snotify.vercel.app)

---

## 📸 Capturas de pantalla

> *[Agregar capturas de Postman/HTTPie mostrando los endpoints principales]*

---

*Trabajo Práctico — Programación Web Avanzada — Facultad de Informática, UNCo*
