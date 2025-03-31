import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Home, List, Utensils, Table, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./MerchantSideNav.scss";


function MerchantSideNav() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  const activeLink = useMemo(() => {
    if (location.pathname.includes('/order')) return 'm-order';
    if (location.pathname.includes('/menu')) return 'menu_manage';
    if (location.pathname.includes('/table')) return 'table';
    return 'home';
  }, [location.pathname]); 

  useEffect(() => {
    const storedState = localStorage.getItem("sidebarExpanded");
    if (storedState !== null) setExpanded(JSON.parse(storedState));
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(expanded));
  }, [expanded]);

  const menuItems = [
    { label: "home", path: "/merchant", icon: Home },
    { label: "m-order", path: "/merchant/order", icon: List },
    { label: "menu_manage", path: "/merchant/menu", icon: Utensils },
    { label: "table", path: "/merchant/table", icon: Table },
  ];
  return (
    <div className={`${expanded ? "sidebar expanded" : "sidebar collapsed"}`}>
      
      <div className="sidebar__header">
        {expanded && <h1 className="sidebar__title">{t("merchant_panel")}</h1>}
        <button className="sidebar__toggleButton" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <nav className="sidebar__menu">
        {menuItems.map(({ label, path, icon: Icon }) => (
          <Link
            key={label} 
            to={path} 
            className={`sidebar__menuItem ${
              activeLink === label ? 'sidebar__menuItem--active' : '' 
            }`}
          >
            <Icon size={24} />
            {expanded && <span className="sidebar__text">{t(label)}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default MerchantSideNav
