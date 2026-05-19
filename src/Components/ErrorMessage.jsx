function ErrorMessage({ error }) {
  if (!error) return null;
  return <p className='error'>{error}</p>;
}

export default ErrorMessage;