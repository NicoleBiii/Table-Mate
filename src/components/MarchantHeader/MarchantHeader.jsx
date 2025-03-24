import React, { useContext, useCallback }  from 'react';
import { LanguageContext } from "../../context/LanguageContent.jsx";
import { useTranslation } from "react-i18next"; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from "../../assets/images/logo_dark.PNG";
import MarchantButton from '../MarchantButton/MarchantButton.jsx';
import "./MarchantHeader.scss";

function MarchantHeader() {
  const { toggleLanguage } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/merchant/login", { replace: true }); 
  }, [logout, navigate]);

  return (
    <div className='m-header'>
      <Link to="/merchant">
      <img src={logo} alt="logo" className="m-header__logo" />
      </Link>

      <div className="m-header__right">
        <MarchantButton>
          <div
          onClick={toggleLanguage}>
          {i18n.language === 'en' ? 'Switch to 中文' : 'Switch to English'}
          </div>
        </MarchantButton>

        {isAuthenticated ? (
          <MarchantButton onClick={handleLogout}>
            {t("logout")}
          </MarchantButton>
        ) : (
          <MarchantButton>
            <Link to="/login">{t("login")}</Link>
          </MarchantButton>
        )}
      </div>
    </div>
  )
}

export default MarchantHeader;
