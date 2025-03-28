import "./ClientHeader.scss";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContent.jsx";
import { useTranslation } from "react-i18next"; 
import "./ClientHeader.scss";

function ClientHeader() {
      
  const { toggleLanguage } = useContext(LanguageContext);
  const { i18n } = useTranslation();

  return (
    <div className="c-header">
      <button
      onClick={toggleLanguage}
      className="c-header__lang-switch">
        {i18n.language === 'en' ? 'Switch to 中文' : 'Switch to English'}
      </button>
    </div>
  )
}

export default ClientHeader;
