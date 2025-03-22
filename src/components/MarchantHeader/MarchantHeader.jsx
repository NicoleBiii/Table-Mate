import React from 'react'
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContent.jsx";
import { useTranslation } from "react-i18next"; 
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo_dark.PNG";
import MarchantButton from '../MarchantButton/MarchantButton.jsx';
import "./MarchantHeader.scss";

function MarchantHeader() {
  const { toggleLanguage } = useContext(LanguageContext);
  const { t, i18n } = useTranslation();
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

        <MarchantButton>
          <Link>{t("login")}</Link>
        </MarchantButton>
      </div>
    </div>
  )
}

export default MarchantHeader;
