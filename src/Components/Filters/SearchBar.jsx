import { useContext } from 'react';
import MovieContext from '../../Context/MovieContext';

function SearchBar() {
  const { query, setQuery, searchAll } = useContext(MovieContext);

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