import { useState } from 'react'
import GenreSelect from "./components/GenreSelect"
import Quiz from "./components/Quiz"
import RoundSetup from './components/RoundSetup';
import Footer from './components/Footer';

function App() {
  const [genreId, setGenreId] = useState(null);
  const [config, setConfig] = useState(null);

  function resetToGenres(){
    setGenreId(null);
    setConfig(null);
  }

  function renderScreen(){
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

  return (
    <>
      {renderScreen()}
      <Footer />
    </>
  );
}

export default App;
