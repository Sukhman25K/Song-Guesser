import { useState } from 'react'
import GenreSelect from "./components/GenreSelect"
import Quiz from "./components/Quiz"
import RoundSetup from './components/RoundSetup';

function App() {
  const [genreId, setGenreId] = useState(null);
  const [config, setConfig] = useState(null);

  function resetToGenres(){
    setGenreId(null);
    setConfig(null);
  }

  if (genreId === null) {
    return <GenreSelect onSelect={setGenreId} />;
  }

  if (config === null) {
    return <RoundSetup onConfirm={setConfig} onBack={() => setGenreId(null)} />;
  }

  return (
  <Quiz genreId={genreId} onExit={resetToGenres} rounds={config.rounds} difficulty={config.difficulty} />
  )
}

export default App;
