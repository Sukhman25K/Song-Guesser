import { useState } from 'react'
import GenreSelect from "./components/GenreSelect"
import Quiz from "./components/Quiz"

function App() {
  const [genreId, setGenreId] = useState(null);

  return (
    <div>
      {genreId === null ? (
        <GenreSelect onSelect={setGenreId} />
      ) : (
        <Quiz genreId={genreId} onExit={() => setGenreId(null)} />
      )}
    </div>
  )
}

export default App;
