import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageContext } from '../../context/LanguageContent.jsx';
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LandingPage.scss";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { toggleLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/merchant");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="landing-container">
              {/* language switch button */}
      <button 
        onClick={toggleLanguage}
        className="language-switch"
      >
        {i18n.language === 'en' ? '中文' : 'EN'}
      </button>
      <h1>{t("welcome")}</h1>
      <div className="link-group">
        <Link to="/merchant/login" className="landing-link">
          {t("merchant_login")}
        </Link>
        <Link to="/scan" className="landing-link">
          {t("scan_to_order")}
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
