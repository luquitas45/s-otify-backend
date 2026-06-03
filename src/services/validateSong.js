function validateSong(song) {
    const errors = [];
    if(!song.name || typeof song.name !== 'string' || song.name.trim() === '') {
        errors.push({ field: 'name', message: 'Name is required and must be a non-empty string.' });
    }
    if(!song.artist || typeof song.artist !== 'string' || song.artist.trim() === '') {
        errors.push({ field: 'artist', message: 'Artist is required and must be a non-empty string.' });
    }
    if(!song.youtubeId || !/^[A-Za-z0-9_-]{11}$/.test(song.youtubeId)) {
        errors.push({ field: 'youtubeId', message: 'YouTube ID is required and must be 11 characters long, containing only letters, numbers, underscores, or hyphens.' });
    }
    if(song.image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(song.image)) {
        errors.push({ field: 'image', message: 'Image must be a valid URL ending with .jpg, .jpeg, .png, or .gif.' });
    }
    if(song.duration && !/^\d{1,2}:\d{2}$/.test(song.duration)) {
        errors.push({ field: 'duration', message: 'Duration must be in the format MM:SS.' });
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}

export default validateSong;