import { useContext } from "react";
import SearchContext from "../../Context/SearchContext";

const GENRES = [
  { id: 'all', label: 'Tutti i generi' },
  { id: 28, label: 'Azione' },
  { id: 12, label: 'Avventura' },
  { id: 16, label: 'Animazione' },
  { id: 35, label: 'Commedia' },
  { id: 80, label: 'Crime' },
  { id: 99, label: 'Documentario' },
  { id: 18, label: 'Dramma' },
  { id: 10751, label: 'Family' },
  { id: 14, label: 'Fantasy' },
  { id: 27, label: 'Horror' },
  { id: 9648, label: 'Mistero' },
  { id: 10749, label: 'Romance' },
  { id: 878, label: 'Fantascienza' },
  { id: 53, label: 'Thriller' }
];

function FilterSelect(){
    const {selectedGenre, setSelectedGenre} = useContext(SearchContext);

    return(
        <select
        className="genre-select"
        value={selectedGenre}
        onChange={(event) => setSelectedGenre(event.target.value)}
        >
            {GENRES.map((genre) =>(
                <option key={genre.id} value={genre.id}>
                    {genre.label}
                </option>
            ))}

        </select>
    );
}

export default FilterSelect;