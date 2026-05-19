import { useContext } from 'react';
import MovieContext from '../Context/MovieContext';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import ResultSection from './Results/ResultSection';

function Main() {
  const { movies, tvSeries, loading, error } = useContext(MovieContext);

  return (
    <main className='app'>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}

      <ResultSection title='FILM' items={movies} type='movie' />
      <ResultSection title='SERIE TV' items={tvSeries} type='tv' />
    </main>
  );
}

export default Main;