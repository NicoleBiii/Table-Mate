import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import '../../i18n';


function ClientNavBar() {
    const { t, i18n } = useTranslation();
  return (
    <div>
      <Link>{t("home")}</Link>
      <Link>{t("order")}</Link>
      <Link>{t("myorder")}</Link>
      <Link>{t("profile")}</Link>
    </div>
  )
}

export default ClientNavBar
