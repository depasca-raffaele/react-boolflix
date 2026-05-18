import { useState } from 'react';
import { getFlag, getFallback } from './modules/languageFlags';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Flag({ languageCode }) {
  const [imgError, setImgError] = useState(false);

  const flagUrl = getFlag(languageCode);
  const fallback = getFallback(languageCode);

  if (!flagUrl || imgError) {
    return <span>{fallback}</span>;
  }

  return (
    <img
      src={flagUrl}
      alt={`Bandiera ${fallback}`}
      width="24"
      height="18"
      onError={() => setImgError(true)}
    />
  )
}



function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  /* CONTROLLO ERRORI SULLA SEARCHBAR E APIKEY */
  const searchMovies = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setMovies([]);
      setError('Inserisci almeno un titolo da cercare.');
      return;
    }

    if (!API_KEY) {
      setError('Chiave API mancante: imposta VITE_TMDB_API_KEY nel file .env');
      return;
    }

    setLoading(true);
    setError('');


    /* FETCH DELL'API  */

    fetch(
      `${API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(trimmedQuery)}&include_adult=false`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore nella chiamata API');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch(() => {
        setError('Si è verificato un errore durante la ricerca.');
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  };

  return (
    /*   CREAZIONE CARD DEI FILM */
    <main className='app'>
      <h1>Boolflix</h1>
      <form className='searchbar' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Cerca un film...'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type='submit'>Cerca</button>
      </form>

      {loading && <p>Caricamento...</p>}
      {error && <p className='error'>{error}</p>}

      <section className='results'>
        {movies.map((movie) => (
          <article key={movie.id} className='movie-card'>
            <h2>{movie.title}</h2>
            <p><strong>Titolo originale:</strong>{movie.original_title}</p>
            <p>
              <strong>Lingua:</strong>
              <Flag languageCode ={movie.original_language}/>
            </p>
            <p><strong>Voto:</strong>{movie.vote_average}</p>
          </article>

        ))}
      </section>
    </main>
  );
}

export default App
