import { useEffect, useState } from "react";
import api from "../lib/api";

export function useQuiz(genreId, numRounds, difficulty) {
    const [rounds, setRounds] = useState([]);
    const [playDuration, setPlayDuration] = useState(30);
    const [roundIndex, setRoundIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        setError(null);

        api.get(`/round/${genreId}`, { params: { rounds: numRounds, difficulty } })
            .then(res => {if (!ignore) {setRounds(res.data.rounds); setPlayDuration(res.data.playDuration);}})
            .catch(() => {if (!ignore) setError("We couldn't load this round. The music service might be temporarily unavailable.")})

        setError("We couldn't load this round. The music service might be temporarily unavailable.")
        return () => {ignore = true};
    }, [genreId, numRounds, difficulty]);

    const currentRound = rounds[roundIndex];
    const isLastRound = roundIndex === rounds.length - 1;

    function submitAnswer(chosenTitle) {
        const isCorrect = chosenTitle === currentRound.correctAnswer;

        setFeedback({
            message: isCorrect ? (<>Correct! <br /><span className="font-semibold">"{currentRound.correctAnswer}"</span></>) :
            (<>Wrong - it was <em className="not-italic font-semibold">"{currentRound.correctAnswer}"</em></>), correct: isCorrect
        });

        if (isCorrect) setScore(s => s + 1);

        setTimeout(() => {
            setFeedback(null);
            if (isLastRound) {
                setFinished(true);
            } else {
                setRoundIndex(i => i + 1);
            }
        }, 1500);
    }

    return {loading: rounds.length === 0, finished, currentRound, roundIndex, totalRounds: rounds.length, score, playDuration, feedback, submitAnswer, error};
}