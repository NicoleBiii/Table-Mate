import "./UserMenu.scss";
import { useDebounce } from 'use-debounce'; 
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search } from 'lucide-react';
import { Link } from "react-router-dom";
import { searchMenuItems, getAllMenuItems } from "../../../api/menuApi";
import ClientMenuBar from "../../../components/ClientMenuBar/ClientMenuBar";
import ClientMenuItems from "../../../components/ClientMenuItems/ClientMenuItems";


function UserMenu() {
  const { t, i18n } = useTranslation();
  const [ forceSearch, setForceSearch ] = useState(0);
  const [ menuItems, setMenuItems ] = useState({});
  const [ categories, setCategories ] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchMenuItems= async () => {
      try {
        const items = await getAllMenuItems(i18n.language);

        const groupeMenu = items.reduce((acc, item) =>{
          if(!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});

        setMenuItems(groupeMenu);
        setCategories(Object.keys(groupeMenu));
        setSelectedCategory(Object.keys(groupeMenu)[0] || null);
      } catch (error) {
        console.log("error fetching data:", error);
      }
    }
      
    fetchMenuItems();
  }, [i18n.language]);


  const handleIconSearch = () => {
    setForceSearch(prev => prev + 1);
  };

  return (
    <div className="c-menu-page">
      <div className="c-menu-page__header">
        <div className="menu-search">
          <input 
          type="text" 
          className="menu-search__input" 
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
          <Search
            className="menu-search__icon" 
            onClick={handleIconSearch}
            />
          </div>
      </div>
          <div className="c-menu">
            <ClientMenuBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
            <ClientMenuItems
              selectedCategory={selectedCategory}
              menuItems={menuItems}
            />
          </div>
    </div>
  )
}

export default UserMenu
