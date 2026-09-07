import { useEffect, useState } from "react";
import axios from "axios";

function Quiz({genreId, onExit}) {
    const [rounds, setRounds] = useState([]);
    const [roundIndex, setRoundIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/round/${genreId}`)
        .then(res => setRounds(res.data))
        .catch(err => console.log(err));
    }, [genreId]);

    if (rounds.length === 0) {
        return <p>Loading quiz...</p>
    }

    if (finished){
        return (
            <div>
                <h1>Quiz complete!</h1>
                <p>Your score: {score} / {rounds.length}</p>
                <button onClick={onExit}>Play again (choose genre)</button>
            </div>
        );
    }

    const currentRound = rounds[roundIndex];
    const isLastRound = roundIndex === rounds.length - 1;

    function handleAnswer(chosenTitle) {
        const isCorrect = chosenTitle === currentRound.correctAnswer;
        setFeedback(isCorrect ? "Correct!" : `Wrong - it was ${currentRound.correctAnswer}`);
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

    if (isLastRound && feedback === null && roundIndex === rounds.length && score !== null) {
        
    }

    return (
        <div>
            <button onClick={onExit}>Change Genre</button>
            <p>Round {roundIndex + 1} of {rounds.length} - Score: {score}</p>

            <audio key={roundIndex} controls autoPlay src={currentRound.preview} />

            <div className="options-grid">
                {currentRound.options.map(opt => (
                    <button key={opt.title} onClick={() => handleAnswer(opt.title)} disabled={!!feedback}>
                        <img src={opt.albumCover} alt={opt.title} />
                        <p>{opt.title}</p>
                    </button>
                ))}
            </div>

            {feedback && <p>{feedback}</p>}
        </div>
    );
}

export default Quiz;