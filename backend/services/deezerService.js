import axios from "axios";

const DEEZER_BASE = "https://api.deezer.com";

export async function fetchGenres() {
    const response = await axios.get(`${DEEZER_BASE}/genre`);
    return response.data.data.map(genre => ({
            id: genre.id,
            name: genre.name,
            picture: genre.picture_medium
    }));
}

export async function fetchChartTracks(genreId, index, limit) {
    const response = await axios.get(`${DEEZER_BASE}/chart/${genreId}/tracks?index=${index}&limit=${limit}`);
    return formatTracks(response);
}

function formatTracks(chartsResponse) {
    return chartsResponse.data.data.map(track => ({
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        albumCover: track.album.cover_medium,
        preview: track.preview 
    }));
}