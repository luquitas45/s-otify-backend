const prisma = require("../prisma/prismaClient");

function validateSong(body) {
  const errors = [];

  if (!body || typeof body !== "object") {
    errors.push({ field: "body", message: "El body no puede estar vacío" });
    return errors;
  }

  if (!body.name || body.name.toString().trim() === "") {
    errors.push({ field: "name", message: "El nombre es obligatorio" });
  }

  if (!body.artist || body.artist.toString().trim() === "") {
    errors.push({ field: "artist", message: "El artista es obligatorio" });
  }

  if (!body.genre || body.genre.toString().trim() === "") {
    errors.push({ field: "genre", message: "El género es obligatorio" });
  }

  if (!body.youtubeId || body.youtubeId.toString().trim() === "") {
    errors.push({ field: "youtubeId", message: "El ID de YouTube es obligatorio" });
  }

  if (!body.image || body.image.toString().trim() === "") {
    errors.push({
      field: "image",
      message: "La imagen es obligatoria",
    });
  }

  if (!body.audioUrl || body.audioUrl.toString().trim() === "") {
    errors.push({ field: "audioUrl", message: "La URL de audio es obligatoria" });
  }

  return errors;
}

async function checkSongExists(youtubeId) {
  const song = await prisma.song.findUnique({
    where: { youtubeId },
  });
  return song;
}

module.exports = {
  validateSong,
  checkSongExists,
};