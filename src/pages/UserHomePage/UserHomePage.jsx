import "./UserHomePage.scss"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import '../../i18n';
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

function UserHomePage() {
    const { tableNumber } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if(!tableNumber) {
            navigate('/scan');
        }
    },[tableNumber, navigate]);

    const toggleLanguage = () => {
        const currentLang = i18n.language;
        i18n.changeLanguage(currentLang === 'en' ? 'zh' : 'en');
      };    


  return (
    <div className="user-home">
      <Header toggleLanguage={toggleLanguage} />
    </div>
  )
}

export default UserHomePage
