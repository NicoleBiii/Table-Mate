import "./ClientHeader.scss";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContent";
import logo from "../../assets/images/logo_dark.PNG"
import { useTranslation } from "react-i18next"; 

function ClientHeader() {
      
  const { toggleLanguage } = useContext(LanguageContext);
  const { i18n } = useTranslation();

  return (
    <div className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <button
      onClick={toggleLanguage}
      className="header__lang-switch">
        {i18n.language === 'en' ? 'Switch to 中文' : 'Switch to English'}
      </button>
    </div>
  )
}

export default ClientHeader;
