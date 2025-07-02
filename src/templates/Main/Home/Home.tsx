import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const changeLanguage = (lng: "en" | "ar") => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <button
        onClick={() => changeLanguage(currentLanguage === "en" ? "ar" : "en")}
      >
        {currentLanguage}
      </button>
      <div>{t("home")}</div>
    </>
  );
}
