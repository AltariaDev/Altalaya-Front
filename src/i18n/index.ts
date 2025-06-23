import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
};

const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
