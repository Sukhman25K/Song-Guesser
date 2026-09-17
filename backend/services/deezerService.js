import axios from "axios";

const DEEZER_BASE = "https://twilight-snow-6f4a.sukhman-25k-279.workers.dev";
const genreCache = {data: null, timestamp: 0};
const GENRE_CACHE_DURATION = 24 * 60 * 60 * 1000;

export async function fetchGenres() {
    const now = Date.now();

    if (genreCache.data && now - genreCache.timestamp < GENRE_CACHE_DURATION) {
        return genreCache.data;
    }

    const response = await axios.get(`${DEEZER_BASE}/genre`);
    const genres =  response.data.data.map(genre => ({
            id: genre.id,
            name: genre.name,
            picture: genre.picture_medium
    }));

    genreCache.data = genres;
    genreCache.timestamp = now;

    return genres;
}

export async function fetchChartTracks(genreId, index, limit) {
    const response = await axios.get(`${DEEZER_BASE}/chart/${genreId}/tracks?index=${index}&limit=${limit}`);
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