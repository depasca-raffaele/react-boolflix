import { useState } from 'react';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const POSTER_SIZE = 'w342';

function getPosterUrl(posterPath) {
  if (!posterPath) return null;
  return IMAGE_BASE_URL + POSTER_SIZE + posterPath;
}

function Poster({ title, posterPath }) {
  const [imgError, setImgError] = useState(false);
  const posterUrl = getPosterUrl(posterPath);

  if (!posterUrl || imgError) {
    return <div>Nessuna copertina disponibile</div>;
  }

  return (
    <img
      src={posterUrl}
      alt={'Copertina di ' + title}
      width='154'
      onError={() => setImgError(true)}
    />
  );
}

export default Poster;