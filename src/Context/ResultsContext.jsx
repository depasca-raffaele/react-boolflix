import { createContext, useContext } from 'react';
import { useTmdbSearch } from '../hooks/useTmdbSearch';
import SearchContext from './SearchContext';

const ResultsContext = createContext();

export function ResultsProvider({ children }) {
  const { query } = useContext(SearchContext);
  const { movies, tvSeries, loading, error, searchAll } = useTmdbSearch();

  const value = {
    movies,
    tvSeries,
    loading,
    error,
    searchAll: () => searchAll(query)
  };

  return (
    <ResultsContext.Provider value={value}>
      {children}
    </ResultsContext.Provider>
  );
}

export default ResultsContext;