import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../store";

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const { setLanguage } = useAppStore();

  const changeLanguage = useCallback(
    (language: "es" | "en") => {
      i18n.changeLanguage(language);
      setLanguage(language);
    },
    [i18n, setLanguage]
  );

  const currentLanguage = i18n.language;

  return {
    currentLanguage,
    changeLanguage,
    isSpanish: currentLanguage === "es",
    isEnglish: currentLanguage === "en",
  };
};
