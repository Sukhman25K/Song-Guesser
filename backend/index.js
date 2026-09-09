import express, { response } from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const DIFFICULTY_SETTINGS = {
    easy:   { index: 0,   limit: 100, playDuration: 30 },
    medium: { index: 100, limit: 100, playDuration: 15 },
    hard:   { index: 200, limit: 100, playDuration: 5 }
};

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
        albumCover: track.album.cover_medium,
        preview: track.preview 
    }));
}

// Fisher-Yates suffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function buildRound(pool){
    const correct = pool[Math.floor(Math.random() * pool.length)];
    const decoys = pool.filter(t => t.id !== correct.id);

    const options = shuffle([correct, ...decoys]).map(t => ({
        title: t.title,
        albumCover: t.albumCover
    }));

    return {
        preview: correct.preview,
        correctAnswer: correct.title,
        options
    };
}

function buildQuiz(tracks, numRounds){
    const shuffledTracks = shuffle(tracks);
    const rounds = [];

    for (let i = 0; i < numRounds; i++) {
        const pool = shuffledTracks.slice(i * 4, i * 4 + 4);
        if (pool.length < 4) break;
        rounds.push(buildRound(pool));
    }

    return rounds;
}

app.get('/api/round/:genreId', async (req, res) => {
    const {genreId} = req.params;
    const { rounds = 5, difficulty = "easy"} = req.query;

    const numRounds = Math.min(Math.max(parseInt(rounds), 5), 25);
    const settings = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.easy;
    const tracksNeeded = numRounds * 4;

    try {
        const response = await axios.get(`https://api.deezer.com/chart/${genreId}/tracks?index=${settings.index}&limit=${settings.limit}`);
        const tracks = formatTracks(response);

        if(tracks.length < tracksNeeded) {
            return res.status(404).json({
                error: `Not enough tracks for ${difficulty} difficulty in this genre (need ${tracksNeeded}), found ${tracks.length}`
            });
        }

        const quiz = buildQuiz(tracks, numRounds);
        res.json({playDuration: settings.playDuration, rounds: quiz});
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch round" });
        console.log(error);
    }
});

app.listen(3000, () => {console.log('Server is running on http://localhost:3000')});