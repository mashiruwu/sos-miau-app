import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import BrazilIcon from "../../assets/brazil.svg";
import UnitedStatesIcon from "../../assets/unitedStates.svg";

function LanguageSwitcher() {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    useEffect(() => {
        const savedLang = localStorage.getItem("lang") || "en   ";
        if (currentLanguage !== savedLang) {
            i18n.changeLanguage(savedLang);
        }
    }, [i18n, currentLanguage]);

    function handleChangeCurrentLanguage(lang: "br" | "en") {
        if (currentLanguage !== lang) {
            localStorage.setItem("lang", lang);
            i18n.changeLanguage(lang);
        }
    }

    return (
        <div className="language-switcher flex items-center gap-2">
            <button
                className={`transition-all duration-75 bg-yellow-200 dark:bg-blue-200 rounded-lg p-2 ${
                    currentLanguage === "en"
                        ? ""
                        : "border-b-2 border-yellow-600 dark:border-blue-600"
                }`}
                onClick={() => handleChangeCurrentLanguage("en")}
            >
                <img width={22} src={UnitedStatesIcon} alt={t("altLanguage")} />
            </button>
            <div className="h-4 w-[1px] bg-white"></div>
            <button
                className={`transition-all duration-75 bg-yellow-200 dark:bg-blue-200 rounded-lg p-2 ${
                    currentLanguage === "br"
                        ? ""
                        : "border-b-2 border-yellow-600 dark:border-blue-600"
                }`}
                onClick={() => handleChangeCurrentLanguage("br")}
            >
                <img width={24} src={BrazilIcon} alt={t("altLanguage")} />
            </button>
        </div>
    );
}

export default LanguageSwitcher;
