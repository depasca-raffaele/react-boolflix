import Card from './Card';

function ResultSection({ title, items, type }) {
  return (
    <section className='results'>
      <h2>{title}</h2>

      {items.length === 0 ? (
        <p>Nessun risultato trovato.</p>
      ) : (
        <div className='results-grid'>
          {items.map((item) => (
            <Card key={type + '-' + item.id} item={item} type={type} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ResultSection;