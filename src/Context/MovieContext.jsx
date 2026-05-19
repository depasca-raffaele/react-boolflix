import { createContext, useState } from 'react';

const MovieContext = createContext();

const MOVIE_API_URL = 'https://api.themoviedb.org/3/search/movie';
const TV_API_URL = 'https://api.themoviedb.org/3/search/tv';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function MovieProvider({ children }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    const movieUrl =
      MOVIE_API_URL +
      '?api_key=' +
      API_KEY +
      '&query=' +
      encodeURIComponent(trimmedQuery) +
      '&include_adult=false';

    const tvUrl =
      TV_API_URL +
      '?api_key=' +
      API_KEY +
      '&query=' +
      encodeURIComponent(trimmedQuery) +
      '&include_adult=false';

    Promise.all([fetch(movieUrl), fetch(tvUrl)])
      .then((responses) => {
        const movieResponse = responses[0];
        const tvResponse = responses[1];

        if (!movieResponse.ok || !tvResponse.ok) {
          throw new Error('Errore nella chiamata API');
        }

        return Promise.all([movieResponse.json(), tvResponse.json()]);
      })
      .then((data) => {
        const movieData = data[0];
        const tvData = data[1];

        const normalizedMovie = (movieData.results || []).map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            originalTitle: movie.original_title,
            language: movie.original_language,
            vote: movie.vote_average,
            poster: movie.poster_path,
            posterPath: movie.poster_path,
            overview: movie.overview,
            posterUrl: movie.poster_path ? 'https://image.tmdb.org/t/p/w342' + movie.poster_path : null
          };
        });

        const normalizedTv = (tvData.results || []).map((tv) => {
          return {
            id: tv.id,
            title: tv.name,
            originalTitle: tv.original_name,
            language: tv.original_language,
            vote: tv.vote_average,
            poster: tv.poster_path,
            posterPath: tv.poster_path,
            overview: tv.overview,
            posterUrl: tv.poster_path ? 'https://image.tmdb.org/t/p/w342' + tv.poster_path : null
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

  const value = {
    query,
    setQuery,
    movies,
    tvSeries,
    loading,
    error,
    searchAll
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContext;