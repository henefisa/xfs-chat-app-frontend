const getLanguageCode = (): string => {
  const languageLocalStorage = localStorage.getItem('persist:language');

  return languageLocalStorage
    ? JSON.parse(JSON.parse(languageLocalStorage)?.languageCode)
    : 'en';
};

export default getLanguageCode;
