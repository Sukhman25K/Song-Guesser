function DifficultyOption({difficulty, isSelected, onSelect}) {
    return(
        <button onClick={() => onSelect(difficulty.id)} className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-surface text-left ring-2 transition ${isSelected ? difficulty.ring : "ring-transparent"}`}>
            <span className={`w-3 h-3 rounded-full shrink-0 ${difficulty.color}`} />
            <span>
                <span className="font-display text-lg block">{difficulty.label}</span>
                <span className="text-muted text-xs">{difficulty.desc}</span>
            </span>
        </button>
    );
}

export default DifficultyOption;