import express from "express";
import cors from "cors";
import genresRouter from "./routes/genres.js";
import quizRouter from "./routes/quiz.js";

const app = express();
app.use(cors({
    origin: "https://song-guesser-liard.vercel.app"
}));
const PORT = process.env.PORT || 3000;

app.use('/api', genresRouter);
app.use('/api', quizRouter);

app.listen(3000, () => console.log(`Server is running on port ${PORT}`));
