import express from "express";
import cors from "cors";
import genresRouter from "./routes/genres.js";
import quizRouter from "./routes/quiz.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://song-guesser-liard.vercel.app"
];

const app = express();
app.use(cors({
    origin: (origin, callback) =>
        allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error("Not allowed by CORS"))
}));
const PORT = process.env.PORT || 3000;

app.use('/api', genresRouter);
app.use('/api', quizRouter);

app.listen(3000, () => console.log(`Server is running on port ${PORT}`));
