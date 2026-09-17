import { useEffect, useState } from "react";
import api from "../lib/api"
import ImageTile from "./ui/ImageTile";
import ErrorMessage from "./ui/ErrorMessage";

function GenreSelect({onSelect}) {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function loadGenres() {
        setLoading(true);
        setError(null);

        api.get("/genres")
        .then(res => setGenres(res.data))
        .catch(() => setError("We couldn't load genres right now. The music service might be temporarily unavailable."))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        let ignore = false;

        setLoading(true);
        api.get("/genres")
        .then(res => {if (!ignore) setGenres(res.data);})
        .catch(() => {if (!ignore) setError("We couldn't load genres right now. The music service might be temporarily unavailable.");})
        .finally(() => {if (!ignore) setLoading(false);});

        return () => {ignore = true; };
    }, []);

    return (
        <div className="min-h-screen bg-bg px-6 py-12 bg-ambient">
            <h1 className="font-display text-5xl font-semibold text-center mb-2">What's your sound?</h1>
            <p className="text-muted text-center mb-10">Pick a genre to start playing</p>
            {error ? (
                <ErrorMessage message={error} onRetry={loadGenres} />
            ): loading ? (
                <div className="flex flex-col items-center justify-center gap-4 mt-20">
                    <div className="w-12 h-12 border-4 border-muted border-t-accent rounded-full animate-spin" />
                    <p className="font-display text-3xl text-text animate-pulse">Loading genres...</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {genres.map(genre => (
                        <ImageTile key={genre.id} image={genre.picture} label={genre.name} onClick={() => onSelect(genre.id)} size="w-40 sm:w-44 md:w-48"/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GenreSelect;