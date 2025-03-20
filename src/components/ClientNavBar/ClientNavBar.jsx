import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { House, Utensils, SquareMenu, User } from 'lucide-react';
import "./ClientNavBar.scss";
import '../../i18n';


function ClientNavBar() {
  const { t, i18n } = useTranslation();
  const [activeLink, setActiveLink] = useState('home');
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className='c-nav'>
      <Link
        to="/home"
        onClick={() => handleLinkClick('home')}
        className={activeLink === 'home' ? 'c-nav__link c-nav__link--active' : 'c-nav__link'}
      >
        <House className='c-nav__icon'/>
        {t("home")}
      </Link>
      <Link
        to="/order"
        onClick={() => handleLinkClick('order')}
        className={activeLink === 'order' ? 'c-nav__link c-nav__link--active' : 'c-nav__link'}
      >
        <Utensils className='c-nav__icon'/>
        {t("order")}
      </Link>
      <Link
          to="/myorder"
          onClick={() => handleLinkClick('myorder')}
          className={activeLink === 'myorder' ? 'c-nav__link c-nav__link--active' : 'c-nav__link'}      
      >
        <SquareMenu className='c-nav__icon'/>
        {t("myorder")}
      </Link>
      <Link
        to="/profile"
        onClick={() => handleLinkClick('profile')}
        className={activeLink === 'profile' ? 'c-nav__link c-nav__link--active' : 'c-nav__link'}      
      >
        <User className='c-nav__icon'/>
        {t("profile")}
      </Link>
    </div>
  )
}

export default ClientNavBar;
