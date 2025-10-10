import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "./locales/en/translation.json";
import am from "./locales/am/translation.json";
import oro from "./locales/or/translation.json";
// Initialize i18n
i18n
  .use(LanguageDetector) // 🔹 Detect user language
  .use(initReactI18next) // 🔹 Connect with React
  .init({
    resources: {
      en: { translation: en },
      am: { translation: am },
      oro: { translation: oro },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes
    },
    supportedLngs: ["en", "am", "oro"],
    // 🔹 Add language detection configuration here
    detection: {
      order: ["localStorage", "navigator"], // check localStorage first, then browser
      caches: ["localStorage"], // save the user choice
    },
  });

export default i18n;
