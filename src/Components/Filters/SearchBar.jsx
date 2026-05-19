import { useContext } from 'react';
import SearchContext from '../../Context/SearchContext';
import ResultsContext from '../../Context/ResultsContext';

function SearchBar() {
  const { query, setQuery} = useContext(SearchContext);
  const { searchAll } = useContext(ResultsContext);


  const handleSubmit = (event) => {
    event.preventDefault();
    searchAll();
  };

  return (
    <form className='searchbar' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Cerca un film o una serie TV...'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type='submit'>Cerca</button>
    </form>
  );
}

export default SearchBar;