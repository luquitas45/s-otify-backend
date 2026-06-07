const prisma = require("../src/prisma/prismaClient");

const songs = [
  // Trap (2)
  { name: "Buenos Tiempos", artist: "Dillom", genre: "Trap", youtubeId: "kYvM-iR6FpQ", image: "https://placehold.co/600x600/FF6B35/white?text=Trap", album: "Trap Album 1", duration: "3:45", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/DILLOM_-_Buenos_tiempos_Videoclip_izatzc.mp3" },
  { name: "Guchi Polo", artist: "Saramalacara", genre: "Trap", youtubeId: "Gk6f7-t6YJ8", image: "https://placehold.co/600x600/FF6B35/white?text=Trap", album: "Trap Album 2", duration: "4:12", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/SARAMALACARA_-_GUCHI_POLO_Videoclip_Oficial_mvcedk.mp3" },

  // Rap (2)
  { name: "Platos Rotos", artist: "Kamada", genre: "Rap", youtubeId: "H77O0u8Nq5g", image: "https://placehold.co/600x600/004E89/white?text=Rap", album: "Rap Album 1", duration: "3:28", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/Homer_el_Mero_Mero_-_Platos_Rotos_Video_Lyric_ij2top.mp3" },
  { name: "Josear", artist: "Acru", genre: "Rap", youtubeId: "3u_xYVvWcUA", image: "https://placehold.co/600x600/004E89/white?text=Rap", album: "Rap Album 2", duration: "3:15", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/ACRU_-_JOSEAR_Video_Oficial_ffegx1.mp3" },

  // Hip-Hop (2)
  { name: "PROUD", artist: "iñigo Quintero", genre: "Hip-Hop", youtubeId: "T7ViJVjDpT0", image: "https://placehold.co/600x600/1E90FF/white?text=Hip-Hop", album: "Hip-Hop Album 1", duration: "3:52", audioUrl: "" },
  { name: "Cali Hip Hop", artist: "Kilo & Gallo", genre: "Hip-Hop", youtubeId: "R_xv3s-kMp0", image: "https://placehold.co/600x600/1E90FF/white?text=Hip-Hop", album: "Hip-Hop Album 2", duration: "4:05", audioUrl: "" },

  // Cumbia (2)
  { name: "Cumbanchero", artist: "Beny Moré", genre: "Cumbia", youtubeId: "YxJKyW3mH7s", image: "https://placehold.co/600x600/FF1493/white?text=Cumbia", album: "Cumbia Album 1", duration: "3:18", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/v1778124637/cumbia_1.mp3" },
  { name: "La Clave de la Cumbia", artist: "Oscar D'León", genre: "Cumbia", youtubeId: "dQw4w9WgXcQ", image: "https://placehold.co/600x600/FF1493/white?text=Cumbia", album: "Cumbia Album 2", duration: "3:42", audioUrl: "" },

  // R&B (2)
  { name: "Superstition", artist: "Stevie Wonder", genre: "R&B", youtubeId: "ZPPSJuENx0s", image: "https://placehold.co/600x600/FFD700/black?text=R&B", album: "R&B Album 1", duration: "3:33", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/v1778124637/rb_1.mp3" },
  { name: "What's Going On", artist: "Marvin Gaye", genre: "R&B", youtubeId: "H-kA3ybxe9w", image: "https://placehold.co/600x600/FFD700/black?text=R&B", album: "R&B Album 2", duration: "3:54", audioUrl: "" },

  // Instrumental (2)
  { name: "Take Five", artist: "Dave Brubeck", genre: "Instrumental", youtubeId: "vmDDOCXfb8Q", image: "https://placehold.co/600x600/228B22/white?text=Instrumental", album: "Instrumental Album 1", duration: "5:24", audioUrl: "" },
  { name: "Autumn Leaves", artist: "Bill Evans", genre: "Instrumental", youtubeId: "R4t0wP_nKEY", image: "https://placehold.co/600x600/228B22/white?text=Instrumental", album: "Instrumental Album 2", duration: "4:47", audioUrl: "" },

  // Electronic (2)
  { name: "Blinding Lights", artist: "The Weeknd", genre: "Electronic", youtubeId: "4NRXx6U8ABQ", image: "https://placehold.co/600x600/00CED1/black?text=Electronic", album: "Electronic Album 1", duration: "3:20", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/v1778124637/electronic_1.mp3" },
  { name: "Levitating", artist: "Dua Lipa ft. DaBaby", genre: "Electronic", youtubeId: "TUVcZfQe-Kw", image: "https://placehold.co/600x600/00CED1/black?text=Electronic", album: "Electronic Album 2", duration: "3:23", audioUrl: "" },

  // Alternative (2)
  { name: "Take Me Out", artist: "Franz Ferdinand", genre: "Alternative", youtubeId: "GhCXAVLFY1s", image: "https://placehold.co/600x600/DC143C/white?text=Alternative", album: "Alternative Album 1", duration: "4:08", audioUrl: "" },
  { name: "Sex on Fire", artist: "Kings of Leon", genre: "Alternative", youtubeId: "RF0HhrSCGrk", image: "https://placehold.co/600x600/DC143C/white?text=Alternative", album: "Alternative Album 2", duration: "3:53", audioUrl: "" },

  // Indie Rock (2)
  { name: "La Muralla Verde", artist: "Fito Páez", genre: "Indie Rock", youtubeId: "y8YV-4F7BVE", image: "https://placehold.co/600x600/8B008B/white?text=Indie", album: "Indie Album 1", duration: "4:32", audioUrl: "" },
  { name: "Pesadilla", artist: "Serú Girán", genre: "Indie Rock", youtubeId: "LoZccX0cPJQ", image: "https://placehold.co/600x600/8B008B/white?text=Indie", album: "Indie Album 2", duration: "3:41", audioUrl: "" },

  // Post Punk (2)
  { name: "Boredom", artist: "Idles", genre: "Post Punk", youtubeId: "qqXQcqKVrE8", image: "https://placehold.co/600x600/2F4F4F/white?text=Post+Punk", album: "Post Punk Album 1", duration: "3:09", audioUrl: "" },
  { name: "Atrocity Exhibition", artist: "Idles", genre: "Post Punk", youtubeId: "JnOuA2P5MQc", image: "https://placehold.co/600x600/2F4F4F/white?text=Post+Punk", album: "Post Punk Album 2", duration: "3:38", audioUrl: "" },

  // Shoegaze (2)
  { name: "Sometimes", artist: "My Bloody Valentine", genre: "Shoegaze", youtubeId: "yfBLOlzcOEA", image: "https://placehold.co/600x600/FFB6C1/black?text=Shoegaze", album: "Shoegaze Album 1", duration: "4:08", audioUrl: "" },
  { name: "Alison Road", artist: "Cocteau Twins", genre: "Shoegaze", youtubeId: "DUT5rEU6pqM", image: "https://placehold.co/600x600/FFB6C1/black?text=Shoegaze", album: "Shoegaze Album 2", duration: "3:47", audioUrl: "" },

  // Rock (2)
  { name: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", youtubeId: "fJ9rUzIMcZQ", image: "https://placehold.co/600x600/CC0000/white?text=Rock", album: "Rock Album 1", duration: "5:55", audioUrl: "" },
  { name: "Stairway to Heaven", artist: "Led Zeppelin", genre: "Rock", youtubeId: "QkF3O6EZDcY", image: "https://placehold.co/600x600/CC0000/white?text=Rock", album: "Rock Album 2", duration: "8:02", audioUrl: "" },

  // Psychedelic Rock (2)
  { name: "Purple Haze", artist: "Jimi Hendrix", genre: "Psychedelic Rock", youtubeId: "EFfCrWzGjo0", image: "https://placehold.co/600x600/9932CC/white?text=Psychedelic", album: "Psychedelic Album 1", duration: "3:31", audioUrl: "" },
  { name: "The End", artist: "The Doors", genre: "Psychedelic Rock", youtubeId: "JSbDhpFMVyo", image: "https://placehold.co/600x600/9932CC/white?text=Psychedelic", album: "Psychedelic Album 2", duration: "11:41", audioUrl: "" },

  // Experimental Rock (2)
  { name: "Anarchy in the UK", artist: "Sex Pistols", genre: "Experimental Rock", youtubeId: "j5SmVcZGrDw", image: "https://placehold.co/600x600/FF4500/white?text=Experimental", album: "Experimental Album 1", duration: "3:32", audioUrl: "" },
  { name: "Blitzkrieg Bop", artist: "Ramones", genre: "Experimental Rock", youtubeId: "x64zOasfYoQ", image: "https://placehold.co/600x600/FF4500/white?text=Experimental", album: "Experimental Album 2", duration: "2:15", audioUrl: "" },
];

async function main() {
  try {
    console.log("🌱 Limpiando datos previos...");
    await prisma.favoriteSong.deleteMany({});
    await prisma.song.deleteMany({});

    console.log("🎵 Creando 30 canciones (15 géneros x 2)...");
    for (const song of songs) {
      await prisma.song.create({
        data: song,
      });
    }

    console.log(`✅ Seed completado: ${songs.length} canciones creadas`);
  } catch (error) {
    console.error("❌ Error en seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
