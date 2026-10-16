import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useUiStore } from "@shared/store";
import { en } from "./locales/en";
import { ne } from "./locales/ne";

const initialLanguage = useUiStore.getState().language;

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ne: { translation: ne },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

document.documentElement.lang = initialLanguage;

// Whenever the saved language changes, switch the dictionary too
useUiStore.subscribe((state, prev) => {
  if (state.language !== prev.language) {
    void i18n.changeLanguage(state.language);
    document.documentElement.lang = state.language;
  }
});

export default i18n;