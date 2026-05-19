import { useState } from 'react';
import { getFlag, getFallback } from '../modules/languageFlags';

function Flag({ languageCode }) {
  const [imgError, setImgError] = useState(false);

  const flagUrl = getFlag(languageCode);
  const fallback = getFallback(languageCode);

  if (!flagUrl || imgError) {
    return <span>{fallback}</span>;
  }

  return (
    <img
      src={flagUrl}
      alt={'Bandiera ' + fallback}
      width='24'
      height='18'
      onError={() => setImgError(true)}
    />
  );
}

export default Flag;