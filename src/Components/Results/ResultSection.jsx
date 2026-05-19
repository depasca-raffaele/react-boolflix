import Card from './Card';

function ResultSection({ title, items, type }) {
  return (
    <section className='results'>
      <h2><strong>{title}</strong></h2>
      {items.length === 0 && <p>Nessun risultato trovato.</p>}
      {items.map((item) => (
        <Card key={type + '-' + item.id} item={item} type={type} />
      ))}
    </section>
  );
}

export default ResultSection;