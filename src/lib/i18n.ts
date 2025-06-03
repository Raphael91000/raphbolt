import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from '../constants/translations';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    lng: 'en', // Langue initiale
    detection: {
      order: ['localStorage', 'navigator'], // Détection via localStorage ou navigateur
      caches: ['localStorage'], // Stocke dans localStorage
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  console.log('i18n - Langue changée vers :', lng);
});

export default i18n;
