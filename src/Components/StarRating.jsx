function voteToStars(vote) {
  if (!vote || vote <= 0) return 0;
  const stars = Math.ceil(vote / 2);
  return Math.max(1, Math.min(5, stars));
}

function StarRating({ vote }) {
  const fullStars = voteToStars(vote);
  const emptyStars = 5 - fullStars;

  return (
    <span aria-label={'Valutazione: ' + fullStars}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <i key={'full-' + index} className='fa-solid fa-star' aria-hidden='true'></i>
      ))}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <i key={'empty-' + index} className='fa-regular fa-star' aria-hidden='true'></i>
      ))}
    </span>
  );
}

export default StarRating;