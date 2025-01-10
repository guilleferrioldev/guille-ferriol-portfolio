import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import TranslationsEN from "./en";
import TranslationsES from "./es";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TranslationsEN,
      },
      es: {
        translation: TranslationsES,
      },
    },
    lng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;