import "./MerchantMenu.scss";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, Edit, Plus } from "lucide-react";
import AlterImage from "../../../assets/images/logo_withbg.PNG";
import { Link, useLocation } from "react-router-dom";
import { getAllMenuItems } from "../../../api/menuApi";

function MerchantMenu() {
  const location = useLocation(); 
  const { t, i18n } = useTranslation();
  const [menuItems, setMenuItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await getAllMenuItems(i18n.language);
      const groupedMenu = items.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});
      setMenuItems(groupedMenu);
      const categoriesList = Object.keys(groupedMenu);
      setCategories(categoriesList);

      const savedCategory = location.state?.fromCategory;
      
      if (savedCategory &&  categoriesList.includes(savedCategory)) {
        setSelectedCategory(savedCategory);
      } else {
        setSelectedCategory(categoriesList[0] || null);
      }
    };

    fetchMenuItems();
  }, [i18n.language, location.state]);
  
  const allItems = Object.values(menuItems).flat();

  const filteredItems = searchQuery
  ? allItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : selectedCategory
    ? menuItems[selectedCategory] || []
    : [];


  return (
    <div className="merchant-menu-page">
      <div className="menu-search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder={t("search_menu")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* hide nav bar when search */}
      {!searchQuery && (
        <div className="category-scroll-container">
          <div className="category-nav">
            {categories.map(category => (
              <div
                key={category}
                className={`category-card ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* menu item list */}
      <div className="menu-items-grid">
        {filteredItems.map(item => (
          <div key={item._id} className="menu-item-card">
            <div className="item-image-container">
              <img 
                src={item.image || AlterImage} 
                alt={item.name} 
                className="item-image"
              />
              <span className={`item-status ${item.available.toString()}`}>
                {t(item.available ? 'available' : 'unavailable')}
              </span>
            </div>
            
            <div className="item-info">
              <h3 className="item-name">{item.name}</h3>
              <div className="item-meta">
                <span className="item-price">${item.price}</span>
                <Link 
                  to={`/merchant/menu/edit/${item.id}`}
                  state={{ fromCategory: selectedCategory }}
                  className="edit-link"
                >
                  <Edit size={16} />
                  {t("edit")}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link 
        to="/merchant/menu/create"
        className="floating-add-button"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}

export default MerchantMenu;