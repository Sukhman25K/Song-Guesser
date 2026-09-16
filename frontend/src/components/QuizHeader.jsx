function QuizHeader({onExit, roundNumber, totalRounds, score}) {
    return(
        <div className="w-full max-w-2xl md:max-w-3xl flex items-center justify-between mb-8 md:mb-10">
                <button onClick={onExit} className="text-muted hover:text-text transition text-sm md:text-base flex items-center gap-1">
                    ← Genres</button>
                <div className="font-display text-sm md:text-lg bg-surface px-4 md:px-6 py-1.5 md:py-2 rounded-full">
                    Round {roundNumber} / {totalRounds}</div>
                <p className="font-display text-gold text-sm md:text-lg">Score: {score}</p>
        </div>
    );
}

export default QuizHeader;