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
        <div>
            <h1>Pick a genre</h1>
            <div className="genre-grid">
                {genres.map(genre => (
                    <button key={genre.id} onClick={() => onSelect(genre.id)}>
                        <img src={genre.picture} alt={genre.name} />
                        <p>{genre.name}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default GenreSelect;