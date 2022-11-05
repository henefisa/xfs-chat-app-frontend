import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_vi from './translations/vi/common.json';
import common_en from './translations/en/common.json';
import getLanguageCode from './utils/getLanguageCode';

const resources = {
  en: common_en,
  vi: common_vi,
};

i18next.use(initReactI18next).init({
  resources,
  lng: getLanguageCode(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
