import { Router } from "express";
import { fetchGenres } from "../services/deezerService.js";

const router = Router();

router.get('/genres', async (req, res) => {
    try{
        const genres = await fetchGenres();
        res.json(genres);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch genres"});
    }
});

export default router;