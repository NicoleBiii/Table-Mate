import React from 'react'
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContent.jsx";
import { useTranslation } from "react-i18next"; 
import { Link } from 'react-router-dom'

function MarchantHeader() {
  const { toggleLanguage } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Link>{t("home")}</Link>
      <button
      onClick={toggleLanguage}
      className="header__lang-switch">
        {i18n.language === 'en' ? 'Switch to 中文' : 'Switch to English'}
      </button>
      <Link>{t("login")}</Link>
    </div>
  )
}

export default MarchantHeader;
