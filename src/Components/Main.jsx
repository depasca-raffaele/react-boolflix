import { useContext } from 'react';
import ResultsContext from '../Context/ResultsContext';
import SearchContext from '../Context/SearchContext';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import ResultSection from './Results/ResultSection';

function Main() {
  const { movies, tvSeries, loading, error } = useContext(ResultsContext);
  const { selectedGenre } = useContext(SearchContext);

  const filteredMovies = selectedGenre === 'all'
    ? movies
    : movies.filter((movies) => movies.genreIds.includes(Number(selectedGenre)));

  const filteredTv = selectedGenre === 'all'
    ? tvSeries
    : tvSeries.filter((tv) => tv.genreIds.includes(Number(selectedGenre)));

  return (
    <main className='app'>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}

      <ResultSection title='FILM' items={filteredMovies} type='movie' />
      <ResultSection title='SERIE TV' items={filteredTv} type='tv' />
    </main>
  );
}

export default Main;