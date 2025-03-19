import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Home, List, Utensils, Table, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./MarchantSideNav.scss";


function MarchantSideNav() {
  const [expanded, setExpanded] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const storedState = localStorage.getItem("sidebarExpanded");
    if (storedState !== null) setExpanded(JSON.parse(storedState));
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(expanded));
  }, [expanded]);

  const menuItems = [
    { label: "home", path: "/merchant", icon: Home },
    { label: "orders", path: "/merchant/orders", icon: List },
    { label: "menu_manage", path: "/merchant/menu", icon: Utensils },
    { label: "tables", path: "/merchant/tables", icon: Table },
  ];
  return (
    <div className={`${expanded ? "sidebar expanded" : "sidebar collapsed"}`}>
      
      <div className="sidebar__header">
        {expanded && <h1 className="sidebar__title">{t("marchant_panel")}</h1>}
        <button className="sidebar__toggleButton" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      <nav className="sidebar__menu">
        {menuItems.map(({ label, path, icon: Icon }) => (
          <Link key={label} to={path} className="sidebar__menuItem">
            <Icon size={24} />
            {expanded && <span className="sidebar__text">{t(label)}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default MarchantSideNav
