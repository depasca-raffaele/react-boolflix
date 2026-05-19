import { createContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const value = {
    query,
    setQuery,
    selectedGenre,
    setSelectedGenre
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;