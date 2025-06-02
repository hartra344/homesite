import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    
    // Configure backend for dynamic loading
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    // Languages that will be loaded dynamically
    supportedLngs: ['en', 'es', 'vi'],
    
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    
    // Load translations on demand
    load: 'languageOnly',
    
    // React Suspense mode
    react: {
      useSuspense: true
    }
  });

export default i18n;