import axios from "axios";

const DEEZER_BASE = "https://api.deezer.com";
const DEEZER_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
};

export async function fetchGenres() {
    const response = await axios.get(`${DEEZER_BASE}/genre`, {headers: DEEZER_HEADERS});
    return response.data.data.map(genre => ({
            id: genre.id,
            name: genre.name,
            picture: genre.picture_medium
    }));
}

export async function fetchChartTracks(genreId, index, limit) {
    const response = await axios.get(`${DEEZER_BASE}/chart/${genreId}/tracks?index=${index}&limit=${limit}`, {headers: DEEZER_HEADERS});
    return formatTracks(response).filter(track => track.preview);
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