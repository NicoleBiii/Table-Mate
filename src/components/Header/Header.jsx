import "./Header.scss";

function Header({ toggleLanguage }) {
  return (
    <div className="header">
      <button
      onClick={toggleLanguage}
      className="header__lang-switch">
        {i18n.language === 'en' ? 'Switch to 中文' : 'Switch to English'}
      </button>
    </div>
  )
}

export default Header
