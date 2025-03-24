import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Create the context
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState(localStorage.getItem("i18nLanguage") || "en");

    // Function to toggle language
    const toggleLanguage = () => {
        const newLang = language === "en" ? "zh" : "en";
        setLanguage(newLang);
        i18n.changeLanguage(newLang);
        localStorage.setItem("i18nLanguage", newLang);
    };

    // Sync language on mount
    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
