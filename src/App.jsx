import { useState } from 'react';
import { getFlag, getFallback } from './modules/languageFlags';

/* API */
const MOVIE_API_URL = 'https://api.themoviedb.org/3/search/movie';
const TV_API_URL = 'https://api.themoviedb.org/3/search/tv';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;



/* FUNZIONE RICERCA BANDIERA */
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
  const [tvSeries, setTvSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  /* RICERCA COMBINATA TRA FILM E SERIE TV */
  const searchAll = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setMovies([]);
      setTvSeries([]);
      setError('Inserisci almeno un titolo da cercare.');
      return;
    }

    if (!API_KEY) {
      setError('Chiave API mancante: imposta VITE_TMDB_API_KEY nel file .env');
      return;
    }

    setLoading(true);
    setError('');

    /* CREZIONE URL COMPLETI PER RICERCA */
    const movieUrl = MOVIE_API_URL + '?api_key=' + API_KEY +'&query=' + encodeURIComponent(trimmedQuery) + '&include_adult=false';
    const tvUrl = TV_API_URL + '?api_key=' + API_KEY +'&query=' + encodeURIComponent(trimmedQuery) + '&include_adult=false';


    /* FETCH DELL'API  */

    Promise.all([fetch(movieUrl), fetch(tvUrl)])
      .then((responses) => {
        const movieResponse = responses[0];
        const tvResponse = responses[1];

        if (!movieResponse.ok || !tvResponse.ok) {
          throw new Error('Errore nella chiamata API');
        }
        return Promise.all([movieResponse.json(), tvResponse.json()])
      })
      .then((data) => {
        const movieData = data[0];
        const tvData = data[1];

        const normalizedMovie = (movieData.results || []).map((movie) =>{
          return {
            id: movie.id,
            title: movie.title,
            originalTitle: movie.original_title,
            language: movie.original_language,
            vote: movie.vote_average
          };
        });
        const normalizedTv = (tvData.results || []).map((tv) =>{
          return {
            id: tv.id,
            title: tv.name,
            originalTitle: tv.original_name,
            language: tv.original_language,
            vote: tv.vote_average
          };
        });

        setMovies(normalizedMovie);
        setTvSeries(normalizedTv);

      })
      .catch(() => {
        setError('Si è verificato un errore durante la ricerca.');
        setMovies([]);
        setTvSeries([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    searchAll();
  };

  return (
    /*   CREAZIONE CARD DEI FILM */
    <main className='app'>
      <h1>Boolflix</h1>
      <form className='searchbar' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Cerca un film o una serie TV...'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type='submit'>Cerca</button>
      </form>

      {loading && <p>Caricamento...</p>}
      {error && <p className='error'>{error}</p>}

      <section className='results'>
        <h2><strong>FILM</strong></h2>
        {movies.length === 0 && !loading && <p>Nessun film trovato.</p>} 
        {movies.map((movie) => (
          <article key={'movie-' + movie.id} className='movie-card'>
            <h3>{movie.title}</h3>
            <p><strong>Titolo originale:</strong>{movie.originalTitle}</p>
            <p>
              <strong>Lingua:</strong>
              <Flag languageCode ={movie.language}/>
            </p>
            <p><strong>Voto:</strong>{movie.vote}</p>
          </article>
        ))}
      </section>


      <section className='results'>
        <h2><strong>SERIE TV</strong></h2>
        {tvSeries.length === 0 && !loading && <p>Nessuna serie trovata.</p>} 
        {tvSeries.map((tv) => (
          <article key={'tv-' + tv.id} className='tv-card'>
            <h3>{tv.title}</h3>
            <p><strong>Titolo originale:</strong>{tv.originalTitle}</p>
            <p>
              <strong>Lingua:</strong>
              <Flag languageCode ={tv.language}/>
            </p>
            <p><strong>Voto:</strong>{tv.vote}</p>
          </article>
        ))}
      </section>


    </main>
  );
}

export default App
