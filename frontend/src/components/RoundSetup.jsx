import { useState } from "react";
import DifficultyOption from "./DifficultyOption";

const DIFFICULTIES = [
  { id: "easy", label: "Easy", color: "bg-green-500", ring: "ring-green-500", desc: "Top charts · 30s clips" },
  { id: "medium", label: "Medium", color: "bg-yellow-500", ring: "ring-yellow-500", desc: "Deeper cuts · 15s clips" },
  { id: "hard", label: "Hard", color: "bg-red-500", ring: "ring-red-500", desc: "Niche tracks · 5s clips" },
];

function RoundSetup({onConfirm, onBack}) {
    const [rounds, setRounds] = useState(10);
    const [difficulty, setDifficulty] = useState("easy");

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-bg">
        <div className="w-full max-w-md">
          <button onClick={onBack} className="text-muted hover:text-text transition text-sm mb-8">← Genres</button>

          <h1 className="font-display text-4xl font-semibold text-center mb-10">Set up your quiz</h1>

          <div className="mb-10">
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-muted text-sm">Rounds</label>
              <span className="font-display text-2xl">{rounds}</span>
            </div>
            <input type="range" min={5} max={25} step={1} value={rounds} onChange={e => setRounds(Number(e.target.value))} className="w-full accent-accent"/>
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>5</span>
              <span>25</span>
            </div>
          </div>

          <div className="mb-10">
            <label className="text-muted text-sm block mb-3">Difficulty</label>
            <div className="flex flex-col gap-3">
              {DIFFICULTIES.map(d => (
                <DifficultyOption key={d.id} difficulty={d} isSelected={difficulty === d.id} onSelect={setDifficulty} />
              ))}
            </div>
          </div>

          <button onClick={() => onConfirm({ rounds, difficulty })} className="w-full bg-accent font-display text-lg py-3 rounded-lg hover:opacity-90 transition">Start quiz</button>
        </div>
      </div>
  );
}

export default RoundSetup;