const {validateSong} = require("../services/validateSong");

const songs= [
  { id: 1, name: "Buenos Tiempos", artist: "Dillom", youtubeId: "kYvM-iR6FpQ", genre: "Trap", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/DILLOM_-_Buenos_tiempos_Videoclip_izatzc.mp3"},
  { id: 2, name: "Platos Rotos", artist: "Kamada", youtubeId: "H77O0u8Nq5g", genre: "Rap", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/Homer_el_Mero_Mero_-_Platos_Rotos_Video_Lyric_ij2top.mp3" },
  { id: 3, name: "Josear", artist: "Acru", youtubeId: "3u_xYVvWcUA", genre: "Rap", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/ACRU_-_JOSEAR_Video_Oficial_ffegx1.mp3" },
  { id: 4, name: "Guchi Polo", artist: "Saramalacara", youtubeId: "Gk6f7-t6YJ8", genre: "Trap", audioUrl: "https://res.cloudinary.com/doamuwxuq/video/upload/q_auto/f_auto/v1778124637/SARAMALACARA_-_GUCHI_POLO_Videoclip_Oficial_mvcedk.mp3"}
];


function getSongs(req, res) {
    res.status(200).json({
        status: "ok",
        data: songs
    });
}

function getSongById(req, res) {
    const { id } = req.params;
    const song = songs.find(s => s.id === parseInt(id));
    if (!song) {
        return res.status(404).json({
            status: "error",
            message: "Song not found"
        });
    }
    res.status(200).json({
        status: "ok",
        data: song
    });
}
function createSong(req, res) {
    const { name, artist, youtubeId, genre, image, duration } = req.body;
    const newSong = {
        id: songs.length + 1,
        name,
        artist,
        youtubeId,
        genre,
        image: image || null,
    };
    const { isValid, errors } = validateSong(newSong);
    if (!isValid) {
        return res.status(400).json({
            status: "error",
            message: "Invalid song data",
            errors
        });
    }

    songs.push(newSong);

    res.status(201).json({
        status: "ok",
        data: newSong
    });
}

module.exports = {
    getSongs
    , getSongById
    , createSong
};