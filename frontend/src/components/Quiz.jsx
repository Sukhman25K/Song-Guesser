import AudioPlayer from "./AudioPlayer";
import ImageTile from "./ui/ImageTile";
import QuizComplete from './QuizComplete'
import QuizHeader from "./QuizHeader";
import { useQuiz } from "../hooks/useQuiz";
import ErrorMessage from "./ui/ErrorMessage";

function Quiz({ genreId, rounds: numRounds, difficulty, onExit }) {
    const {loading, finished, currentRound, roundIndex, totalRounds, score, playDuration, feedback, submitAnswer, error} = useQuiz(genreId, numRounds, difficulty);

    if (loading) {
        return <p className="text-center text-muted mt-20">Loading quiz...</p>
    }

    if (finished){
        return (
            <QuizComplete score={score} totalRounds={totalRounds} onExit={onExit} />
        );
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={onExit}/>
    }

    return (
        <div className="min-h-screen bg-bg px-6 py-10 flex flex-col items-center">
            <QuizHeader onExit={onExit} roundNumber={roundIndex + 1} totalRounds={totalRounds} score={score}/>

            <div className="w-full max-w-xl mb-8">
                <AudioPlayer key={roundIndex} src={currentRound.preview} playDuration={playDuration} />
            </div>

            <div className="relative grid grid-cols-2 gap-4 max-w-xl w-full">
                {currentRound.options.map(opt => (
                    <ImageTile key={opt.title} image={opt.albumCover} label={opt.title} onClick={() => submitAnswer(opt.title)} disabled={!!feedback} ringColor="teal"/>
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