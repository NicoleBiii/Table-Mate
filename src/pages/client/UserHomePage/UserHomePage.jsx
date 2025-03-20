import React from 'react';
import "./UserHomePage.scss"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import '../../../i18n';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
    <div className="user-home">
      
      <button>{t("order")}</button>
      <button>{t("waitlist")}</button>
    </div>
  )
}

export default UserHomePage;
