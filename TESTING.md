# 🧪 TESTING - 9 ENDPOINTS API S-OTIFY BACKEND

## Checklist de Testing Completo

Requisito de **T-25**: Todos los endpoints verificados y sus HTTP codes correctos. Sin errores 500 inesperados.

---

## 📋 Endpoints a Probar

### 1. GET `/api/health` - Health Check
**Descripción**: Verificar que la API está funcionando

```bash
curl -X GET http://localhost:3000/api/health
```

**Respuesta esperada (200)**:
```json
{
  "status": "ok",
  "message": "API funcionando correctamente"
}
```

**Checklist**:
- [ ] Responde con código 200
- [ ] Estructura JSON correcta

---

### 2. GET `/api/songs` - Listar canciones (paginadas)
**Descripción**: Obtener lista de canciones con paginación (20 por página)

```bash
# Página 1 (default)
curl -X GET http://localhost:3000/api/songs

# Página específica
curl -X GET "http://localhost:3000/api/songs?page=2"

# Página inexistente
curl -X GET "http://localhost:3000/api/songs?page=999"
```

**Respuesta esperada (200)**:
```json
{
  "status": "ok",
  "data": [
    {
      "id": 1,
      "name": "Buenos Tiempos",
      "artist": "Dillom",
      "genre": "Trap",
      "youtubeId": "kYvM-iR6FpQ",
      "image": "https://placehold.co/600x600/FF6B35/white?text=Trap",
      "album": "Trap Album 1",
      "duration": "3:45",
      "audioUrl": "...",
      "createdAt": "...",
      "updatedAt": "...",
      "favorites": []
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 30,
    "hasMore": true
  }
}
```

**Checklist**:
- [ ] Responde con código 200
- [ ] Retorna 20 canciones máximo por página
- [ ] Incluye paginación (page, pageSize, total, hasMore)
- [ ] Página 999 retorna array vacío pero hasMore=false
- [ ] Todos los campos presentes (image, album, duration)

---

### 3. GET `/api/songs/:id` - Obtener canción por ID

```bash
# ID válido
curl -X GET http://localhost:3000/api/songs/1

# ID inválido
curl -X GET http://localhost:3000/api/songs/9999
```

**Respuesta esperada (200)**:
```json
{
  "status": "ok",
  "data": {
    "id": 1,
    "name": "Buenos Tiempos",
    "artist": "Dillom",
    "genre": "Trap",
    "youtubeId": "kYvM-iR6FpQ",
    "image": "...",
    "album": "...",
    "duration": "...",
    "audioUrl": "...",
    "createdAt": "...",
    "updatedAt": "...",
    "favorites": []
  }
}
```

**Respuesta esperada (404)**:
```json
{
  "error": "Canción no encontrada"
}
```

**Checklist**:
- [ ] ID válido → Responde 200 con canción
- [ ] ID inexistente → Responde 404
- [ ] Todos los campos presentes

---

### 4. POST `/api/songs` - Crear canción (válido)

```bash
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Song",
    "artist": "Test Artist",
    "genre": "Rock",
    "youtubeId": "abcDEF123xy",
    "image": "https://placehold.co/600x600/CC0000/white?text=Rock",
    "album": "Test Album",
    "duration": "3:30",
    "audioUrl": "https://example.com/audio.mp3"
  }'
```

**Respuesta esperada (201)**:
```json
{
  "status": "ok",
  "data": {
    "id": 31,
    "name": "Test Song",
    "artist": "Test Artist",
    "genre": "Rock",
    "youtubeId": "abcDEF123xy",
    "image": "...",
    "album": "...",
    "duration": "...",
    "audioUrl": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Checklist**:
- [ ] Datos válidos → Responde 201
- [ ] Nueva canción se crea correctamente
- [ ] Incluye todos los campos

---

### 5. POST `/api/songs` - Crear canción (inválido)

```bash
# Body vacío
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -d '{}'

# Campos faltantes
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'

# Campo vacío
curl -X POST http://localhost:3000/api/songs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "artist": "Artist",
    "genre": "Rock",
    "youtubeId": "abcDEF123xy",
    "image": "url",
    "album": "Album",
    "duration": "3:30",
    "audioUrl": "url"
  }'
```

**Respuesta esperada (400)**:
```json
{
  "error": "Datos inválidos",
  "details": [
    {
      "field": "name",
      "message": "El nombre es obligatorio"
    }
  ]
}
```

**Checklist**:
- [ ] Body vacío → Responde 400
- [ ] Campos faltantes → Responde 400
- [ ] Strings vacíos → Responde 400
- [ ] Mensaje de error claro

---

### 6. PUT `/api/songs/:id` - Actualizar canción (válido)

```bash
curl -X PUT http://localhost:3000/api/songs/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "artist": "Updated Artist",
    "genre": "Rock",
    "youtubeId": "kYvM-iR6FpQ",
    "image": "https://...",
    "album": "Updated Album",
    "duration": "4:00",
    "audioUrl": "https://..."
  }'
```

**Respuesta esperada (200)**:
```json
{
  "status": "ok",
  "data": {
    "id": 1,
    "name": "Updated Name",
    "artist": "Updated Artist",
    ...
  }
}
```

**Checklist**:
- [ ] ID válido → Responde 200
- [ ] Canción se actualiza correctamente
- [ ] updatedAt se modifica

---

### 7. PUT `/api/songs/:id` - Actualizar canción (ID inválido)

```bash
curl -X PUT http://localhost:3000/api/songs/9999 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated",
    "artist": "Artist",
    "genre": "Rock",
    "youtubeId": "kYvM-iR6FpQ",
    "image": "url",
    "album": "Album",
    "duration": "3:30",
    "audioUrl": "url"
  }'
```

**Respuesta esperada (404)**:
```json
{
  "error": "Canción no encontrada"
}
```

**Checklist**:
- [ ] ID inexistente → Responde 404

---

### 8. DELETE `/api/songs/:id` - Eliminar canción (válido)

```bash
curl -X DELETE http://localhost:3000/api/songs/1
```

**Respuesta esperada (200)**:
```json
{
  "status": "ok",
  "message": "Canción eliminada"
}
```

**Checklist**:
- [ ] ID válido → Responde 200
- [ ] Canción se elimina correctamente
- [ ] GET posterior devuelve 404

---

### 9. DELETE `/api/songs/:id` - Eliminar canción (ID inválido)

```bash
curl -X DELETE http://localhost:3000/api/songs/9999
```

**Respuesta esperada (404)**:
```json
{
  "error": "Canción no encontrada"
}
```

**Checklist**:
- [ ] ID inexistente → Responde 404

---

## 🎯 ENDPOINTS DE FAVORITOS (Bonus - 3 adicionales)

### 10. GET `/api/songs/:id/favorites` - Verificar si es favorito

```bash
curl -X GET "http://localhost:3000/api/songs/1/favorites"
```

**Respuesta esperada (200)**:
```json
{
  "status": "ok",
  "data": {
    "songId": 1,
    "isFavorite": false
  }
}
```

**Checklist**:
- [ ] Retorna isFavorite: boolean
- [ ] Código 200

---

### 11. POST `/api/songs/:id/favorites` - Agregar a favoritos

```bash
curl -X POST "http://localhost:3000/api/songs/1/favorites"
```

**Respuesta esperada (201)**:
```json
{
  "status": "ok",
  "data": {
    "id": 1,
    "userId": "anonymous",
    "songId": 1,
    "song": {...},
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Checklist**:
- [ ] Primera vez → Responde 201
- [ ] Segunda vez (duplicado) → Responde 409
- [ ] Crea registro en FavoriteSong

---

### 12. DELETE `/api/songs/:id/favorites` - Eliminar de favoritos

```bash
curl -X DELETE "http://localhost:3000/api/songs/1/favorites"
```

**Respuesta esperada (200)**:
```json
{
  "status": "ok",
  "message": "Favorito eliminado"
}
```

**Checklist**:
- [ ] Favorito existente → Responde 200
- [ ] Favorito inexistente → Responde 404

---

## 📊 Resumen de HTTP Codes

| Código | Escenario |
|--------|-----------|
| 200 | GET exitoso, PUT exitoso, DELETE exitoso |
| 201 | POST exitoso |
| 400 | Body inválido |
| 404 | Recurso no encontrado |
| 409 | Favorito duplicado |
| 500 | Error del servidor |

---

## ✅ Checklist Final

- [ ] GET /api/health → 200
- [ ] GET /api/songs → 200, paginación correcta
- [ ] GET /api/songs/1 → 200
- [ ] GET /api/songs/9999 → 404
- [ ] POST /api/songs (válido) → 201
- [ ] POST /api/songs (inválido) → 400
- [ ] PUT /api/songs/1 → 200
- [ ] PUT /api/songs/9999 → 404
- [ ] DELETE /api/songs/1 → 200
- [ ] DELETE /api/songs/9999 → 404
- [ ] GET /api/songs/:id/favorites → 200
- [ ] POST /api/songs/:id/favorites → 201/409
- [ ] DELETE /api/songs/:id/favorites → 200/404
- [ ] Sin errores 500 inesperados
- [ ] Todos los campos presentes en respuestas
- [ ] userId por defecto es "anonymous"

---

## 🚀 Ejecutar Testing Automatizado (Optional)

Se puede crear un script `test.sh` para automatizar estas pruebas:

```bash
#!/bin/bash
BASE_URL="http://localhost:3000/api"

echo "Testing GET /health"
curl -s -w "\nStatus: %{http_code}\n" -X GET $BASE_URL/health

echo "Testing GET /songs"
curl -s -w "\nStatus: %{http_code}\n" -X GET $BASE_URL/songs

# ... más tests
```

