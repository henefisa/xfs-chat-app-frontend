import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_vi from 'src/translations/vi/common.json';
import common_en from 'src/translations/en/common.json';
import getLanguageCode from 'src/utils/getLanguageCode';

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
