import { MovieProvider } from './Context/MovieContext';
import Header from './Components/Header';
import Main from './Components/Main';

function App() {
  return (
    <MovieProvider>
      <Header />
      <Main />
    </MovieProvider>
  );
}

export default App;