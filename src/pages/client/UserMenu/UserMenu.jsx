import "./UserMenu.scss";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import FloatingCart from "../../../components/FloatingCart/FloatingCart";
import { searchMenuItems, getAllMenuItems } from "../../../api/menuApi";
import ClientMenuBar from "../../../components/ClientMenuBar/ClientMenuBar";
import ClientMenuItems from "../../../components/ClientMenuItems/ClientMenuItems";

function UserMenu() {
  const{ tableNumber } = useParams();
  const { t, i18n } = useTranslation();
  const [menuItems, setMenuItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem(`cart_${tableNumber}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getAllMenuItems(i18n.language);

        const groupeMenu = items.reduce((acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        }, {});

        setMenuItems(groupeMenu);
        setCategories(Object.keys(groupeMenu));
        setSelectedCategory(Object.keys(groupeMenu)[0] || null);
      } catch (error) {
        console.log("error fetching data:", error);
      }
    };

    fetchMenuItems();
  }, [i18n.language]);

  // handle search
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setIsSearching(false);
        return;
      }

      setLoading(true);
      setIsSearching(true);

      try {
        const results = await searchMenuItems(debouncedQuery, i18n.language);
        setSearchResults(results);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, i18n.language]);

  //clear search
  const clearSearch = () => {
    setQuery("");
    setIsSearching(false);
    setSearchResults([]);
  };

  const handleIconSearch = () => {
    setForceSearch((prev) => prev + 1);
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
          <Search className="menu-search__icon" onClick={handleIconSearch} />
        </div>
      </div>
      <div className="c-menu">
        {!isSearching && (
          <ClientMenuBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        )}
        <div className="menu-content">
          {isSearching ? (
            <div className="search-results">
              <h3 className="search-title">
                {t("search_results_for")}: "{debouncedQuery}"
              </h3>

              {loading ? (
                <div className="loading-indicator">Loading...</div>
              ) : searchResults.length > 0 ? (
                <ClientMenuItems
                  menuItems={{ [t("search_results")]: searchResults }}
                  selectedCategory={t("search_results")}
                  isSearchResult
                  cart={cart}
                  setCart={setCart}
                  tableNumber={tableNumber}
                />
              ) : (
                <div className="no-results">
                  {t("no_search_results")} "{debouncedQuery}"
                </div>
              )}
            </div>
          ) : (
            <ClientMenuItems
              selectedCategory={selectedCategory}
              menuItems={menuItems}
              cart={cart}
              setCart={setCart}
              tableNumber={tableNumber}
            />
          )}
        </div>
      </div>
      <Link to={`/user/${tableNumber}/myorder`}>
      <FloatingCart cart={cart} />
      </Link>
    </div>
  );
}

export default UserMenu;
