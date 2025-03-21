import React from 'react';
import "./UserHomePage.scss"
import logo from "../../../assets/images/logo_bright.PNG";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import '../../../i18n';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChefHat, ListEnd } from 'lucide-react';

function UserHomePage() {
    const { tableNumber } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        if(!tableNumber) {
            navigate('/scan');
        }
    },[tableNumber, navigate]);

  return (
    <div className="u-home">

      <img src={logo} alt="logo" className="u-home__logo" />
      <Link
        to={`/user/${tableNumber}/menu`} 
        className='u-home__link'
      >
        {t("order")}
        <ChefHat className='u-home__icon'/>
      </Link>
      <Link className='u-home__link'>
        {t("waitlist")}
        <ListEnd className='u-home__icon'/>
      </Link>
    </div>
  )
}

export default UserHomePage;
