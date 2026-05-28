# Notion Kanban — TP Express Backend (S-otify API)

## Setup Inicial

### 1. Crear Database en Notion

Creá una **Database** tipo **Board** (Kanban) llamada `TP Express — S-otify Backend`.

### 2. Propiedades (columnas de cada tarjeta)

Agregá estas propiedades a la database:

| Propiedad | Tipo | Valores |
|-----------|------|---------|
| **Status** | Select | `Backlog`, `To Do`, `In Progress`, `Review`, `Done` |
| **Fase** | Select | `Foundation`, `Database`, `API Infra`, `Songs CRUD`, `Favorites`, `Seed`, `Deploy`, `Frontend`, `Docs & QA` |
| **Assignee** | Person | Lucas Ortiz, Gaston Berhau, Fabrizio Brollo, Valentin Bustamante |
| **Priority** | Select | `🔴 High`, `🟡 Medium`, `🟢 Low` |
| **Dependencies** | Text | IDs de tareas bloqueantes (ej: "T-05") |
| **Files** | Text | Archivos a crear/modificar |
| **Acceptance Criteria** | Text | Cómo verificar que está lista |

### 3. Vistas

Creá estas vistas para el equipo:

| Vista | Tipo | Agrupado por | Filtro |
|-------|------|-------------|--------|
| **Kanban** | Board | Status | — |
| **Por Fase** | Board | Fase | — |
| **Por Persona** | Board | Assignee | — |
| **Timeline** | Timeline | Fecha de entrega | — |

### 4. Invitar profesores

- **Agustin**: guillermo.chiarotto@est.fi.uncoma.edu.ar
- **Lucas**: lucas.margni@est.fi.uncoma.edu.ar

Darles acceso de **comment/edit** para que puedan ver el progreso.

---

## Las 26 Tareas

Copiá cada bloque como una card en la database.

---

### 🔴 FASE 1: Foundation — Project Setup

---

#### T-01: Init project + install dependencies + .gitignore

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Foundation |
| **Assignee** | Lucas Ortiz |
| **Priority** | 🔴 High |
| **Dependencies** | — |
| **Files** | `package.json`, `.gitignore` |
| **Acceptance Criteria** | `npm list` muestra express, @prisma/client, cors, dotenv, prisma. `.gitignore` excluye .env y node_modules. |

**Descripción**: `npm init`, instalar express, @prisma/client, cors, dotenv. Instalar prisma como devDep. Crear .gitignore con node_modules, .env, dist.

---

#### T-02: .env.example + scripts + vercel.json + env.js

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Foundation |
| **Assignee** | Lucas Ortiz |
| **Priority** | 🔴 High |
| **Dependencies** | T-01 |
| **Files** | `.env.example`, `package.json`, `vercel.json`, `src/config/env.js` |
| **Acceptance Criteria** | `npm run dev` arranca sin errores de import. DATABASE_URL se carga desde .env. |

**Descripción**: Agregar scripts (dev, start, prisma:generate, prisma:migrate, prisma:seed, postinstall). Configurar prisma.seed. Crear vercel.json con builder @vercel/node. Crear env.js loader de dotenv. .env.example con DATABASE_URL, PORT, FRONTEND_URL, NODE_ENV (sin valores reales).

---

#### T-03: GitHub repo + Kanban + invitar profes

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Foundation |
| **Assignee** | Lucas Ortiz |
| **Priority** | 🔴 High |
| **Dependencies** | — |
| **Files** | (externo — GitHub, Notion) |
| **Acceptance Criteria** | Repo backend creado. Profesores visibles en el board. |

**Descripción**: Crear repo backend en GitHub. Armar este board de Notion con todas las columnas. Invitar profesores: guillermo.chiarotto@est.fi.uncoma.edu.ar, lucas.margni@est.fi.uncoma.edu.ar.

---

### 🔴 FASE 2: Database Foundation

---

#### T-04: Crear schema.prisma (Song + FavoriteSong)

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Database |
| **Assignee** | (Dev C) |
| **Priority** | 🔴 High |
| **Dependencies** | T-01 |
| **Files** | `prisma/schema.prisma` |
| **Acceptance Criteria** | Schema matchea el design doc. `npx prisma validate` pasa. |

**Descripción**: Crear schema con datasource PostgreSQL. Model Song: id (autoincrement), name, artist, youtubeId, image, genre?, album (default "Unknown Album"), duration (default "0:00"), audioUrl (default ""), createdAt, updatedAt. Model FavoriteSong: id, userId (default "anonymous"), songId, createdAt. @@unique([userId, songId]). Cascade delete. @map para snake_case.

```prisma
model Song {
  id        Int            @id @default(autoincrement())
  name      String
  artist    String
  image     String
  youtubeId String         @map("youtube_id")
  genre     String?
  audioUrl  String         @default("")    @map("audio_url")
  album     String         @default("Unknown Album")
  duration  String         @default("0:00")
  createdAt DateTime       @default(now()) @map("created_at")
  updatedAt DateTime       @updatedAt      @map("updated_at")
  favorites FavoriteSong[]
  @@map("songs")
}

model FavoriteSong {
  id        Int      @id @default(autoincrement())
  userId    String   @default("anonymous") @map("user_id")
  songId    Int      @map("song_id")
  createdAt DateTime @default(now())
  song      Song     @relation(fields: [songId], references: [id], onDelete: Cascade)
  @@unique([userId, songId])
  @@map("favorite_songs")
}
```

---

#### T-05: Migración init + PrismaClient singleton

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Database |
| **Assignee** | (Dev C) |
| **Priority** | 🔴 High |
| **Dependencies** | T-04 |
| **Files** | `prisma/migrations/*`, `src/prisma/prismaClient.js` |
| **Acceptance Criteria** | Carpeta migrations creada. prismaClient.js exporta singleton. Sin connection leaks en hot reload. |

**Descripción**: `npx prisma migrate dev --name init`. Crear `src/prisma/prismaClient.js` exportando singleton `new PrismaClient()`. Agregar `prisma:generate` al postinstall.

---

### 🔴 FASE 3: API Infrastructure

---

#### T-06: Express app + index + middlewares (CORS, error, 404)

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | API Infra |
| **Assignee** | (Dev A) |
| **Priority** | 🔴 High |
| **Dependencies** | T-01, T-02 |
| **Files** | `src/app.js`, `src/index.js`, `src/middlewares/cors.js`, `src/middlewares/errorHandler.js`, `src/middlewares/notFound.js` |
| **Acceptance Criteria** | App levanta sin errores. Ruta inexistente → 404. Error forzado → 500 JSON. |

**Descripción**: `app.js`: crear Express app, usar express.json(), cors middleware, montar rutas, errorHandler al final, notFound al final. `index.js`: cargar env, importar app, listen en PORT. `cors.js`: permitir FRONTEND_URL de env. `errorHandler.js`: (err,req,res,next) → 500 con `{error, details}`. `notFound.js`: catch-all → 404.

---

#### T-07: Health check endpoint

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | API Infra |
| **Assignee** | (Dev A) |
| **Priority** | 🟡 Medium |
| **Dependencies** | T-06 |
| **Files** | `src/controllers/health.controller.js`, `src/routes/health.routes.js` |
| **Acceptance Criteria** | `curl GET /api/health` → 200, `{status:"ok", message:"API funcionando correctamente"}`. |

**Descripción**: Controller devuelve `{status: "ok", message: "API funcionando correctamente"}`. Ruta: `GET /api/health`.

---

### 🔴 FASE 4: Songs CRUD

---

#### T-08: Validación manual de canciones (validateSong)

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Songs CRUD |
| **Assignee** | (Dev B) |
| **Priority** | 🔴 High |
| **Dependencies** | — (JS puro, solo specs) |
| **Files** | `src/validations/songs.validation.js` |
| **Acceptance Criteria** | Body válido → `{isValid:true, errors:[]}`. `{name:""}` → field error. `{youtubeId:"abc"}` → length error. `{}` → body empty error. |

**Descripción**: `validateSong(body)` — valida name (string, no vacío tras trim), artist (ídem), youtubeId (`/^[A-Za-z0-9_-]{11}$/`), image (URL válida), genre (opcional string), album (opcional, default "Unknown Album"), duration (opcional, `/^\d{1,2}:\d{2}$/`, default "0:00"), audioUrl (opcional, URL o ""). Body vacío → rechazar. Retorna `{isValid, errors: [{field, message}]}`. SIN Zod/Joi — if/else manual.

---

#### T-09: Songs service (queries Prisma)

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Songs CRUD |
| **Assignee** | (Dev B) |
| **Priority** | 🔴 High |
| **Dependencies** | T-05 (prismaClient), T-04 (schema) |
| **Files** | `src/services/songs.service.js` |
| **Acceptance Criteria** | findAll retorna metadata de paginación correcta. Search busca por name Y artist (ILIKE). Genre es match exacto. |

**Descripción**: `findAll(page, limit, search, genre)`: where con ILIKE en name OR artist para search, match exacto para genre. `skip = (page-1)*limit`, `take = limit`, `orderBy: {id:'desc'}`. Dos queries en paralelo: findMany + count. Retorna `{data, page, limit, total, totalPages}`. `findById`, `create`, `update`, `delete`.

---

#### T-10: Songs controller + routes (5 endpoints)

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Songs CRUD |
| **Assignee** | (Dev B) |
| **Priority** | 🔴 High |
| **Dependencies** | T-09 (service), T-08 (validation) |
| **Files** | `src/controllers/songs.controller.js`, `src/routes/songs.routes.js` |
| **Acceptance Criteria** | 5 endpoints con HTTP codes correctos (200, 201, 400, 404). Paginación default page=1, limit=10. Search + genre combinados funcionan. |

**Descripción**: Controller: parsear query params con defaults, llamar service, formatear respuesta. POST/PUT llaman validación → 400 si inválido. Try/catch → next(err). Routes: `GET /api/songs` (lista), `GET /api/songs/:id`, `POST /api/songs`, `PUT /api/songs/:id`, `DELETE /api/songs/:id`.

---

### 🟡 FASE 5: Favorites API

---

#### T-11: Favorites service + sub-rutas en songs

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Favorites |
| **Assignee** | (Dev C) |
| **Priority** | 🟡 Medium |
| **Dependencies** | T-05 (prismaClient), T-10 (songs routes) |
| **Files** | `src/services/favorites.service.js`, `src/routes/songs.routes.js` |
| **Acceptance Criteria** | POST → 201. POST duplicado → 409. GET → isFavorite true/false. DELETE → 200. DELETE no fav → 404. |

**Descripción**: `favorites.service`: check(songId) → buscar por userId="anonymous", retorna `{songId, isFavorite}`. add(songId) → verificar existencia, 409 si ya existe. remove(songId) → verificar existencia, 404 si no. Wirear 3 sub-rutas: `GET /api/songs/:id/favorites` → 200, `POST` → 201/409, `DELETE` → 200/404.

---

#### T-12: Routes aggregator (index.js)

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Favorites |
| **Assignee** | (Dev A o Dev C) |
| **Priority** | 🟡 Medium |
| **Dependencies** | T-10, T-11, T-07 |
| **Files** | `src/routes/index.js` |
| **Acceptance Criteria** | 9 endpoints accesibles: /api/health, /api/songs (×5), /api/songs/:id/favorites (×3). |

**Descripción**: Combinar módulos: `app.use('/api/songs', songsRouter)`, `app.use('/api', healthRouter)`.

---

### 🟢 FASE 6: Seed Data

---

#### T-13: Seed script — 30 canciones

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Seed |
| **Assignee** | (Dev C o Lucas) |
| **Priority** | 🟡 Medium |
| **Dependencies** | T-05 (prismaClient + schema migrado) |
| **Files** | `prisma/seed.js` |
| **Acceptance Criteria** | `npx prisma db seed` inserta 30 rows. 15 géneros presentes. Seed es idempotente. |

**Descripción**: 30 canciones, 2 por género (Trap, Rap, Hip Hop, Cumbia, R&B, Instrumental, Electronic, Alternative, Indie Rock, Post Punk, Shoegaze, Rock, Psychedelic Rock, Experimental Rock, Experimental Hip Hop). Usar placehold.co con colores por género. youtubeIds válidos de 11 chars. Mix: algunas con audioUrl, otras sin. Algunas con info completa de álbum, otras mínimas. Usar `prisma.song.createMany()`.

---

### 🔴 FASE 7: Deployment

---

#### T-14: Neon PostgreSQL + connection string

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Deploy |
| **Assignee** | Lucas Ortiz |
| **Priority** | 🔴 High |
| **Dependencies** | — |
| **Files** | `.env` (local, NO committear) |
| **Acceptance Criteria** | Prisma se conecta a Neon. Tablas creadas vía migration. |

**Descripción**: Crear database Neon free-tier. Copiar DATABASE_URL al .env local. Testear conexión con `npx prisma db push`.

---

#### T-15: Deploy backend a Vercel

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Deploy |
| **Assignee** | Lucas Ortiz |
| **Priority** | 🔴 High |
| **Dependencies** | T-14 (DATABASE_URL), T-01 a T-13 |
| **Files** | Vercel dashboard, env vars |
| **Acceptance Criteria** | URL deployada → 200 en GET /api/health. CORS permite frontend. |

**Descripción**: Pushear a GitHub. Importar repo en Vercel. Setear env vars: DATABASE_URL (Neon), FRONTEND_URL (snotify.vercel.app), PORT, NODE_ENV=production. Deploy.

---

#### T-16: Migración + seed en producción

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Deploy |
| **Assignee** | Lucas Ortiz |
| **Priority** | 🔴 High |
| **Dependencies** | T-14, T-15 |
| **Files** | DB remota |
| **Acceptance Criteria** | GET /api/songs desde URL deployada retorna canciones. 15 géneros presentes. |

**Descripción**: `npx prisma migrate deploy` contra DATABASE_URL de prod. `npx prisma db seed`. Verificar 30 canciones.

---

### 🔴 FASE 8: Frontend Migration

---

#### T-17: VITE_API_URL + actualizar songsService base URL

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Frontend |
| **Assignee** | (Frontend Dev) |
| **Priority** | 🔴 High |
| **Dependencies** | T-15 (backend deployado) |
| **Files** | `.env` (frontend), `src/services/songsService.js` |
| **Acceptance Criteria** | Console muestra datos del nuevo backend. Canciones renderizan. |

**Descripción**: Agregar `VITE_API_URL` al .env del frontend. Actualizar songsService.js: cambiar MockAPI base URL por `VITE_API_URL/api`. Verificar GET /api/songs.

---

#### T-18: Search unificado (?search=X)

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Frontend |
| **Assignee** | (Frontend Dev) |
| **Priority** | 🔴 High |
| **Dependencies** | T-17 |
| **Files** | `src/services/songsService.js`, componentes de búsqueda |
| **Acceptance Criteria** | Búsqueda retorna resultados de name Y artist. Una sola request en DevTools. |

**Descripción**: Eliminar fetch dual (name + artist en paralelo). Reemplazar con `GET /api/songs?search=X`. Limpiar lógica de Promise.all.

---

#### T-19: localStorage favorites → API calls

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Frontend |
| **Assignee** | (Frontend Dev) |
| **Priority** | 🔴 High |
| **Dependencies** | T-11, T-17 |
| **Files** | todos los componentes con `localStorage.getItem('favorites')` |
| **Acceptance Criteria** | Corazón togglea correctamente. Favoritos persisten en reload. Sin llamadas a localStorage. |

**Descripción**: Agregar getFavorites, addFavorite, removeFavorite al service. Eliminar todos los reads/writes de localStorage para favoritos. Actualizar componentes.

---

#### T-20: Page size 20 + componentes favoritos

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Frontend |
| **Assignee** | (Frontend Dev) |
| **Priority** | 🟡 Medium |
| **Dependencies** | T-17 |
| **Files** | Header (extracción géneros), componentes paginados |
| **Acceptance Criteria** | Lista de géneros popupada. Paginación carga siguiente página. |

**Descripción**: Cambiar fetch limit de 100 a 20 para extracción de géneros en Header. Verificar infinite scroll/paginación.

---

#### T-21: Loading states (spinner/skeleton)

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Frontend |
| **Assignee** | (Frontend Dev) |
| **Priority** | 🟡 Medium |
| **Dependencies** | T-17 |
| **Files** | SongList, SongDetail, FavoritesButton |
| **Acceptance Criteria** | Spinner visible durante fetch. Desaparece al recibir datos. Sin flash de contenido vacío. |

**Descripción**: Mientras se fetchea, mostrar spinner o skeleton. Patrón `if (loading) return <Spinner />`.

---

#### T-22: Error + empty states

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Frontend |
| **Assignee** | (Frontend Dev) |
| **Priority** | 🟡 Medium |
| **Dependencies** | T-17 |
| **Files** | SongList, search, toast provider |
| **Acceptance Criteria** | Desconectar backend → toast de error. Búsqueda vacía → "No se encontraron canciones". App no crashea en fallo de API. |

**Descripción**: Error: toast/mensaje con error 4xx/5xx. Empty: "No se encontraron canciones". Manejar network errors (offline).

---

### 🟢 FASE 9: Docs & QA

---

#### T-23: README.md completo

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Docs & QA |
| **Assignee** | Lucas Ortiz |
| **Priority** | 🟡 Medium |
| **Dependencies** | T-15, T-13 |
| **Files** | `README.md` |
| **Acceptance Criteria** | Persona nueva puede setupear el proyecto solo con el README. |

**Descripción**: Incluir: nombre del proyecto, integrantes, link repo frontend, link Kanban, descripción app, descripción entidad (Song, FavoriteSong), instrucciones de instalación (clone, npm install, .env, migrate, seed), tabla de variables de entorno, links de deploy, screenshots de endpoints.

---

#### T-24: Finalizar Kanban + crear issues en GitHub

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Docs & QA |
| **Assignee** | Lucas Ortiz |
| **Priority** | 🟢 Low |
| **Dependencies** | T-03 |
| **Files** | GitHub Issues, Kanban |
| **Acceptance Criteria** | 1 issue por tarea pendiente. Profes pueden ver progreso. PR template creado. |

**Descripción**: Dividir trabajo restante en GitHub Issues. Taggear por persona/prioridad. Linkear issues a cards del Kanban. Crear PR template.

---

#### T-25: Test manual — 9 endpoints (casos básicos)

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Docs & QA |
| **Assignee** | Todos |
| **Priority** | 🔴 High |
| **Dependencies** | T-12, T-15 |
| **Files** | (testing manual) |
| **Acceptance Criteria** | Checklist con todos los endpoints + HTTP codes verificados. Sin 500 inesperados. |

**Descripción**: Probar 9 endpoints en URL deployada:
- GET /api/songs → 200, paginación
- GET /api/songs/:id → 200 / 404
- POST /api/songs (válido) → 201
- POST /api/songs (inválido) → 400
- PUT /api/songs/:id → 200 / 404
- DELETE /api/songs/:id → 200 / 404
- GET /api/songs/:id/favorites → 200
- POST /api/songs/:id/favorites → 201 / 409
- DELETE /api/songs/:id/favorites → 200 / 404
- GET /api/health → 200

---

#### T-26: Edge cases + frontend e2e

| Propiedad | Valor |
|-----------|-------|
| **Status** | To Do |
| **Fase** | Docs & QA |
| **Assignee** | Todos |
| **Priority** | 🔴 High |
| **Dependencies** | T-25, T-22 |
| **Files** | (testing manual) |
| **Acceptance Criteria** | Edge cases pasan. Frontend 100% funcional con nuevo backend. Sin rastros de MockAPI o localStorage. |

**Descripción**: Testear page=999 → array vacío. limit=1, limit=100. search+genre combinados. Search retorna de name Y artist. E2E: frontend → backend deployado → listar, buscar, filtrar, detalle, favoritos. Verificar que no quede uso de MockAPI ni localStorage.

---

## Orden de Ejecución Recomendado

```
Semana 1: T-01 → T-02 → T-03 (Lucas)  |  T-04 → T-05 (Dev C)  |  T-08 (Dev B en paralelo)
Semana 2: T-06 → T-07 (Dev A)         |  T-09 → T-10 (Dev B)   |  T-13 (Dev C)
Semana 3: T-11 → T-12 (Dev C)         |  T-14 → T-15 → T-16 (Lucas)
Semana 4: T-17 → T-18 → T-19 → T-20 → T-21 → T-22 (Frontend Dev)
Semana 5: T-23 → T-24 (Lucas)         |  T-25 → T-26 (Todos)
```

**Critical path**: T-01 → T-04 → T-05 → T-09 → T-10 → T-11 → T-12 → T-14 → T-15 → T-17

---

## Datos para el README

```
Nombre del proyecto: S-otify Backend API
Integrantes: Gaston Berhau, Fabrizio Brollo, Valentin Bustamante, Lucas Ortiz
Repo frontend: https://github.com/bgastong/S-otify
Kanban: [link al Notion]
Descripción: API REST para S-otify, SPA de música. CRUD de canciones, favoritos.
Entidad principal: Song (canciones) — name, artist, youtubeId, image, genre, album, duration, audioUrl
Entidad secundaria: FavoriteSong — userId, songId
Deploy backend: [URL de Vercel]
Deploy frontend: https://snotify.vercel.app
```
