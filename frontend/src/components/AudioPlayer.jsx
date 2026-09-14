import { useRef, useState, useEffect } from "react";

function AudioPlayer({src, playDuration}) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(0);
        audioRef.current?.play().then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }, [src]);

    function togglePlay() {
        const audio = audioRef.current;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            return
        }

        if (audio.currentTime >= playDuration){
            audio.currentTime = 0;
            setProgress(0);
        }

        audio.play();
        setIsPlaying(true);
    }

    function handleTimeUpdate(){
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.currentTime >= playDuration){
            audio.pause();
            audio.currentTime = playDuration;
            setIsPlaying(false);
            setProgress(100);
            return;
        }

        setProgress((audio.currentTime / playDuration) * 100);
    }

    return (
    <div className="w-full flex items-center gap-4 bg-muted rounded-full px-5 py-3">
      <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)}/>

      <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="shrink-0 w-11 h-11 rounded-full bg-bg flex items-center justify-center text-text hover:opacity-90 transition">
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="2" y="1" width="4" height="14" rx="1" />
            <rect x="10" y="1" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 1.5v13l11-6.5-11-6.5z" />
          </svg>
        )}
      </button>

      <div className="flex-1 h-1.5 bg-black/20 rounded-full overflow-hidden">
        <div className="h-full bg-bg transition-all duration-150" style={{ width: `${progress}%` }}/>
      </div>
    </div>
  );
}

export default AudioPlayer;