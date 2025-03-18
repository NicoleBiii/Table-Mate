import "./Header.scss";
import i18n from "../../i18n";
import logo from "../../assets/images/logo_dark.PNG"

function Header({ toggleLanguage }) {
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

export default Header
