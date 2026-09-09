import { useEffect, useState, useRef } from "react";
import axios from "axios";
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer from "./AudioPlayer";

function Quiz({ genreId, rounds: numRounds, difficulty, onExit }) {
    const [rounds, setRounds] = useState([]);
    const [playDuration, setPlayDuration] = useState(30);
    const [roundIndex, setRoundIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        let ignore = false;

        axios.get(`http://localhost:3000/api/round/${genreId}`, {params: {rounds: numRounds, difficulty}})
        .then(res => {if (!ignore) {setRounds(res.data.rounds); setPlayDuration(res.data.playDuration)}})
        .catch(err => console.log(err));

        return () => { ignore = true; };
    }, [genreId, numRounds, difficulty]);

    if (rounds.length === 0) {
        return <p className="text-center text-muted mt-20">Loading quiz...</p>
    }

    if (finished){
        return (
            <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-6">
                <h1 className="font-display text-5xl text-text">Quiz complete!</h1>
                <p className="text-xl text-muted">Your score: {score} / {rounds.length}</p>
                <button onClick={onExit} className="bg-accent text-text font-display text-lg px-6 py-3 rounded-lg hover:opacity-90 transition">Play again (choose genre)</button>
            </div>
        );
    }

    const currentRound = rounds[roundIndex];
    const isLastRound = roundIndex === rounds.length - 1;

    function handleAnswer(chosenTitle) {
        const isCorrect = chosenTitle === currentRound.correctAnswer;
        setFeedback({
            message: isCorrect ? ( 
            <>Correct! <span className="font-semibold">"{currentRound.correctAnswer}"</span></>) : (
            <>Wrong - it was <em className="not-italic font-semibold">"{currentRound.correctAnswer}"</em></>),
            correct: isCorrect
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

    return (
        <div className="min-h-screen bg-bg px-6 py-10 flex flex-col items-center">
            <div className="w-full max-w-2xl md:max-w-3xl flex items-center justify-between mb-8 md:mb-10">
                <button onClick={onExit} className="text-muted hover:text-text transition text-sm md:text-base flex items-center gap-1">
                    ← Genres</button>
                <div className="font-display text-text text-sm md:text-lg bg-surface px-4 md:px-6 py-1.5 md:py-2 rounded-full">
                    Round {roundIndex + 1} / {rounds.length}</div>
                <p className="font-display text-gold text-sm md:text-lg">Score: {score}</p>
            </div>

            {/* <div className="w-full max-w-xl mb-8">
                <AudioPlayer ref={playerRef} key={roundIndex} src={currentRound.preview} autoPlay showJumpControls={false} 
                showSkipControls={false} showDownloadProgress={false} customVolumeControls={[]} customAdditionalControls={[]} 
                onListen={handleAudioPlayer} layout="horizontal-reverse" className="rounded-full"/>
            </div> */}
            <div className="w-full max-w-xl mb-8">
                <AudioPlayer key={roundIndex} src={currentRound.preview} playDuration={playDuration} />
            </div>

            <div className="relative grid grid-cols-2 gap-4 max-w-xl w-full">
                {currentRound.options.map(opt => (
                    <button key={opt.title} onClick={() => handleAnswer(opt.title)} disabled={!!feedback} className="relative aspect-square rounded-lg overflow-hidden group disabled:opacity-50 ring-2 ring-transparent hover:ring-teal transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/40">
                        <img src={opt.albumCover} alt={opt.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <p className="absolute bottom-3 left-3 right-3 text-text text-sm font-medium text-left">{opt.title}</p>
                    </button>
                ))}

                {feedback && (
                    <div className="absolute inset-0 flex items-center justify-center bg-bg/80 backdrop-blur-sm rounded-lg">
                        <p className={`font-display text-3xl md:text-4xl text-center px-6 ${feedback.correct ? "text-teal" : "text-accent"}`}>{feedback.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Quiz;