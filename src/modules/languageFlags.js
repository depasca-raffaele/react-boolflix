export const LANGUAGE_TO_COUNTRY = {
  en: 'us',
  it: 'it',
  fr: 'fr',
  de: 'de',
  es: 'es',
  pt: 'pt',
  ja: 'jp',
  ko: 'kr',
  zh: 'cn',
  ru: 'ru',
  hi: 'in',
  ar: 'sa',
  tr: 'tr',
  nl: 'nl',
  sv: 'se',
  no: 'no',
  da: 'dk',
  fi: 'fi',
  pl: 'pl',
  cs: 'cz',
  el: 'gr',
  he: 'il',
  uk: 'ua'
};

export function getFlag(languageCode, size = 'w40') {
  const lang = (languageCode || '').toLowerCase();
  const countryCode = LANGUAGE_TO_COUNTRY[lang];

  if (!countryCode) return null;

  return `https://flagcdn.com/${size}/${countryCode}.png`;
}

export function getFallback(languageCode) {
  return (languageCode || 'N/D').toUpperCase();
}