import { Router } from "express";
import { fetchGenres } from "../services/deezerService.js";

const router = Router();

router.get('/genres', async (req, res) => {
    try{
        const genres = await fetchGenres();
        res.json(genres);
    } catch (error) {
        console.error("Genres fetch failed:", error.message);
        if (error.response){
            console.error("Deezer responded with status:", error.response.status);
            console.error("Deezer response data:", error.response.data);
        }
        res.status(500).json({error: "Failed to fetch genres"});
    }
});

export default router;