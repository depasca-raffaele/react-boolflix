import SearchBar from './Filters/SearchBar';
import FilterSelect from './Filters/FilterSelect';

function Header() {
  return (
    <header className='header'>
      <h1>Boolflix</h1>
      <div className='header-actions'>
        <FilterSelect />
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;