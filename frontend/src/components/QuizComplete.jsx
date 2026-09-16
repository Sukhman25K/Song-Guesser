function QuizComplete({score, totalRounds, onExit}) {
    return (
        <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-6">
                <h1 className="font-display text-5xl">Quiz complete!</h1>
                <p className="text-xl text-muted">Your score: {score} / {totalRounds}</p>
                <button onClick={onExit} className="bg-accent font-display text-lg px-6 py-3 rounded-lg hover:opacity-90 transition">Play again (choose genre)</button>
        </div>
    );
}

export default QuizComplete;