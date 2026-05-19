import Poster from '../Poster';
import Flag from '../Flag';
import StarRating from '../StarRating';

function Card({ item, type }) {
  return (
    <article key={type + '-' + item.id} className={type + '-card'}>
      <Poster title={item.title} posterPath={item.posterPath || item.poster} />
      <h3>{item.title}</h3>
      <p><strong>Titolo originale:</strong> {item.originalTitle}</p>
      <p><strong>Lingua:</strong> <Flag languageCode={item.language} /></p>
      <p><strong>Voto:</strong> <StarRating vote={item.vote} /></p>
    </article>
  );
}

export default Card;