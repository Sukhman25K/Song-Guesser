import { useEffect, useState } from "react";
import axios from "axios";

function GenreSelect({onSelect}) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/genres")
        .then(res => setGenres(res.data))
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="min-h-screen bg-bg px-6 py-12"
        style={{
        background: `
          radial-gradient(circle at 15% 20%, rgba(232, 80, 58, 0.25), transparent 40%),
          radial-gradient(circle at 85% 15%, rgba(46, 196, 182, 0.2), transparent 45%),
          radial-gradient(circle at 50% 90%, rgba(244, 185, 66, 0.15), transparent 50%),
          #1a1625
        `,
      }}>
            <h1 className="font-display text-5xl font-semibold text-text text-center mb-2">What's your sound?</h1>
            <p className="text-muted text-center mb-10">Pick a genre to start playing</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {genres.map(genre => (
                    <button
                    key={genre.id}
                    onClick={() => onSelect(genre.id)}
                    className="relative w-40 sm:w-44 md:w-48 aspect-square rounded-lg overflow-hidden group shadow-lg shadow-black/40 ring-2 ring-transparent hover:ring-accent transition-all duration-300 hover:-translate-y-1"
                    >
                        <img src={genre.picture} alt={genre.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        <p className="absolute bottom-3 left-3 font-display text-lg font-medium text-text">{genre.name}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default GenreSelect;