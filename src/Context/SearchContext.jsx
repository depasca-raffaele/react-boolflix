import { createContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('');

  const value = {
    query,
    setQuery
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;