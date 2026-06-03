const songs= [
    { name: "Buenos Tiempos", artist: "Dillom", youtubeId: "kYvM-iR6FpQ", genre: "Trap", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/DILLOM_-_Buenos_tiempos_Videoclip_izatzc.mp3"},
  { name: "Platos Rotos", artist: "Kamada", youtubeId: "H77O0u8Nq5g", genre: "Rap", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/Homer_el_Mero_Mero_-_Platos_Rotos_Video_Lyric_ij2top.mp3" },
  { name: "Josear", artist: "Acru", youtubeId: "3u_xYVvWcUA", genre: "Rap", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/ACRU_-_JOSEAR_Video_Oficial_ffegx1.mp3" },
  { name: "Guchi Polo", artist: "Saramalacara", youtubeId: "Gk6f7-t6YJ8", genre: "Trap", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/SARAMALACARA_-_GUCHI_POLO_Videoclip_Oficial_mvcedk.mp3"}
];

function getSongs(req, res) {
    res.status(200).json({
        status: "ok",
        data: songs
    });
}

module.exports = {
    getSongs
};