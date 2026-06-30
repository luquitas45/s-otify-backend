# 🎵 S-otify Backend

Backend REST desarrollado para la materia **Programación Web Avanzada** de la **Facultad de Informática - UNCo**.

La API proporciona autenticación mediante JWT, administración de canciones y favoritos persistentes para la aplicación S-otify.

---

# 👥 Integrantes

- Gastón Berhau
- Fabrizio Brollo
- Valentín Bustamante
- Lucas Ortiz

---

# 🚀 Funcionalidades

La API implementa:

- 🔐 Registro de usuarios
- 🔑 Inicio de sesión
- 👤 Obtención del usuario autenticado
- 🎵 CRUD completo de canciones
- ❤️ Gestión de favoritos
- 🔒 Protección de rutas mediante JWT
- 📄 Validación de datos
- 🗄 Persistencia con PostgreSQL
- ⚙ ORM Prisma

---

# 🛠 Tecnologías

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- dotenv

---

# 📂 Estructura

```
src
│
├── controllers
├── middlewares
├── routes
├── services
├── validators
├── prisma
├── app.js
└── index.js
```

---

# 🔐 Autenticación

La autenticación utiliza JWT.

Flujo implementado:

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
Authorization Bearer Token
      │
      ▼
Rutas protegidas
```

---

# ❤️ Favoritos

Cada usuario posee su propia lista de favoritos.

Los favoritos se almacenan en la tabla:

```
FavoriteSong
```

Relacionando

```
User
↓

FavoriteSong

↑

Song
```

No se utiliza LocalStorage.

Toda la persistencia se realiza en PostgreSQL.

---

# 📦 Base de datos

Modelo principal:

```
User

Song

FavoriteSong
```

Relaciones:

- User 1:N FavoriteSong
- Song 1:N FavoriteSong

---

# 🌐 Endpoints

## Health

```
GET /api/health
```

---

## Auth

```
POST /api/auth/register

POST /api/auth/login

GET /api/auth/me
```

---

## Songs

```
GET /api/songs

GET /api/songs/:id

POST /api/songs

PUT /api/songs/:id

DELETE /api/songs/:id
```

---

## Favorites

```
GET /api/favorites

POST /api/favorites/:songId

DELETE /api/favorites/:songId

GET /api/favorites/:songId
```

---

# ⚙ Variables de entorno

Crear un archivo `.env`

```env
DATABASE_URL=

JWT_SECRET=

PORT=3000
```

---

# 🗄 Base de datos

Instalar dependencias

```bash
npm install
```

Ejecutar migraciones

```bash
npx prisma migrate dev
```

Generar Prisma Client

```bash
npx prisma generate
```

---

# ▶ Ejecutar

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

Servidor

```
http://localhost:3000
```

---

# 📦 Scripts

Instalar dependencias

```bash
npm install
```

Desarrollo

```bash
npm run dev
```

Producción

```bash
npm start
```

Migraciones

```bash
npx prisma migrate dev
```

Generar Prisma Client

```bash
npx prisma generate
```

Abrir Prisma Studio

```bash
npx prisma studio
```

---

# 🔒 Seguridad

La API implementa:

- Hash de contraseñas con bcrypt
- JWT para autenticación
- Middleware de autorización
- Validación de datos
- Manejo de errores HTTP

---

# 🧪 Testing Manual

Se verificaron los siguientes endpoints:

### Health

- GET /health

### Auth

- Registro
- Login
- Usuario autenticado

### Songs

- GET
- GET por ID
- POST
- PUT
- DELETE

### Favorites

- Obtener favoritos
- Agregar favorito
- Eliminar favorito
- Consultar favorito

Todos los endpoints devuelven los códigos HTTP correspondientes:

- 200
- 201
- 400
- 401
- 404
- 409

---

# 🔗 Integración

Este backend está diseñado para ser consumido por el proyecto **S-otify Frontend** desarrollado en React.

---

# 📖 Materia

Programación Web Avanzada

Facultad de Informática

Universidad Nacional del Comahue

---

# © Licencia

Proyecto académico desarrollado con fines educativos.