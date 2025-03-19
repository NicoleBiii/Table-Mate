// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    lng: 'en', 
    fallbackLng: localStorage.getItem("i18nLanguage") || "en",
    interpolation: {
      escapeValue: false,
    },
  });

// document.documentElement.lang = savedLang;

// i18n.on('languageChanged', (lang) => {
//   document.documentElement.lang = lang;
//   localStorage.setItem("i18nLanguage", lang);
// });


export default i18n;
