import { Router } from "express";
import { fetchChartTracks } from "../services/deezerService.js";
import { buildQuiz } from "../services/quizService.js";
import { DIFFICULTY_SETTINGS } from "../config/difficulty.js";

const router = Router();

router.get('/round/:genreId', async (req, res) => {
    const {genreId} = req.params;
    const {rounds = 5, difficulty = "easy"} = req.query;

    const parsedRounds = parseInt(rounds);
    const numRounds = Number.isNaN(parsedRounds) ? 5 : Math.min(Math.max(parseInt(parsedRounds), 5), 25);
    const settings = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.easy;
    const tracksNeeded = numRounds * 4;

    try {
        const tracks = await fetchChartTracks(genreId, settings.index, settings.limit);

        if (tracks.length < tracksNeeded) {
            return res.status(404).json({
                error: `Not enough tracks for ${difficulty} difficulty in this genre (need ${tracksNeeded}, found ${tracks.length})`            
            });
        }

        const quiz = buildQuiz(tracks, numRounds);
        res.json({playDuration: settings.playDuration, rounds: quiz});
    } catch (error){
        console.error(error);
        res.status(500).json({error: "Failed to fetch round"});
    }
});

export default router;