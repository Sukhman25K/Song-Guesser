import express, { response } from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

app.get('/api/genres', async (req, res) => {
    try{
        const response = await axios.get("https://api.deezer.com/genre");
        const genres = response.data.data.map(genre => ({
            id: genre.id,
            name: genre.name,
            picture: genre.picture_medium
        }));
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch genres" });
    }
});

function formatTracks(chartsResponse) {
    return chartsResponse.data.data.map(track => ({
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        artistPicture: track.artist.picture_medium,
        albumCover: track.album.cover_medium,
        preview: track.preview 
    }));
}

app.get('/api/round/:genreId', async (req, res) => {
    const {genreId} = req.params;
    console.log(genreId);
    try {
        const response = await axios.get(`https://api.deezer.com/chart/${genreId}/tracks?limit=20`);
        const tracks = formatTracks(response);
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch round" });
        console.log(error);
    }
});

app.listen(3000, () => {console.log('Server is running on http://localhost:3000')});