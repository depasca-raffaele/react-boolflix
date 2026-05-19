import { SearchProvider } from './Context/SearchContext';
import { ResultsProvider } from './Context/ResultsContext';
import Header from './Components/Header';
import Main from './Components/Main';

function App() {
  return (
   <SearchProvider>
      <ResultsProvider>
        <Header />
        <Main />
      </ResultsProvider>
    </SearchProvider>
  );
}

export default App;