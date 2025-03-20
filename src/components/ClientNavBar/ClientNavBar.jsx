import { useState } from 'react'
import { Link, useParams,useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { House, Utensils, SquareMenu, User } from 'lucide-react';
import "./ClientNavBar.scss";
import '../../i18n';


function ClientNavBar() {
  const{ tableNumber } = useParams();
  const location = useLocation();
  const { t } = useTranslation();

  const getActiveLink = () => {
    if (location.pathname.includes('/menu')) return 'order';
    if (location.pathname.includes('/myorder')) return 'myorder';
    if (location.pathname.includes('/profile')) return 'profile';
    return 'home';
  };

  const activeLink = getActiveLink();
  return (
    <div className='c-nav'>
      <Link
        to={`/user/${tableNumber}`}
        className={activeLink === 'home' ? 'c-nav__link c-nav__link--active' : 'c-nav__link'}
      >
        <House className='c-nav__icon'/>
        {t("home")}
      </Link>
      <Link
        to={`/user/${tableNumber}/menu`}
        className={activeLink === 'order' ? 'c-nav__link c-nav__link--active' : 'c-nav__link'}
      >
        <Utensils className='c-nav__icon'/>
        {t("order")}
      </Link>
      <Link
          to={`/user/${tableNumber}/myorder`}
          className={activeLink === 'myorder' ? 'c-nav__link c-nav__link--active' : 'c-nav__link'}      
      >
        <SquareMenu className='c-nav__icon'/>
        {t("myorder")}
      </Link>
      <Link
        to={`/user/${tableNumber}/profile`}
        className={activeLink === 'profile' ? 'c-nav__link c-nav__link--active' : 'c-nav__link'}      
      >
        <User className='c-nav__icon'/>
        {t("profile")}
      </Link>
    </div>
  )
}

export default ClientNavBar;
