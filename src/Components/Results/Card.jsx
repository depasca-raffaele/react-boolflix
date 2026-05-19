import Flag from '../Flag';
import StarRating from '../StarRating';

function Card({ item, type }) {
  const cardStyle = item.posterUrl
    ?{backgroundImage: 'url(' + item.posterUrl + ')'}
    :{}

  return (
    <article className={type + '-card'} style={cardStyle}>
      <div className='card-content'>
      <h3>{item.title}</h3>
      <p><strong>Titolo originale:</strong> {item.originalTitle}</p>
      <p><strong>Lingua:</strong> <Flag languageCode={item.language} /></p>
      <p><strong>Voto:</strong> <StarRating vote={item.vote} /></p>
      <p className='card-overview'>
        {item.overview || 'Nessuna descrizione disponibile'}
      </p>
      </div>
    </article>
  );
}

export default Card;