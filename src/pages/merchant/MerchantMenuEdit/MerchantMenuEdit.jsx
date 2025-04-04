import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getMenuItemById, updateMenuItem, deleteMenuItem } from "../../../api/menuApi";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import Loader from "../../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import "./MerchantMenuEdit.scss";

const MenuEdit = () => {
  const location = useLocation();
  const fromCategory =
    location.state?.fromCategory || localStorage.getItem("lastCategory");
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [formData, setFormData] = useState({
    name: { cn: "", en: "" },
    description: { cn: "", en: "" },
    category: { cn: "", en: "" },
    price: 0,
    image: "",
    available: true,
  });

  useEffect(() => {
    const savedCategory =
      location.state?.fromCategory || localStorage.getItem("lastCategory");
  }, [i18n.language, location.state]);

  // getting menu item
  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await getMenuItemById(id);
        setFormData({
          name: item.name,
          description: item.description || { cn: "", en: "" },
          category: item.category,
          price: item.price,
          image: item.image,
          available: item.available,
        });
      } catch (error) {
        console.error("Error fetching menu item:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // handle input change
  const handleChange = (field, lang) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: e.target.value,
      },
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.cn ||
      !formData.name.en ||
      !formData.category.cn ||
      !formData.category.en
    ) {
      alert("chinede name and english name are needed");
      return;
    }

    try {
      await updateMenuItem(id, formData);
      navigate("/merchant/menu", {
        state: { fromCategory },
        replace: true,
      }); // back to menu page
    } catch (error) {
      console.error("Update failed:", error);
      alert("fail update");
    }
  };

  const handleUploadSuccess = (url) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
    console.log("updated image url:", url);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    try {
      const token = localStorage.getItem("token");
      await deleteMenuItem(id, token);
      navigate("/merchant/menu", {
        state: { fromCategory },
        replace: true,
      });
    } catch (error) {
      console.error("Delete failed:", error);
      alert(t("menu_management.delete_failed"));
    }
  };



  if (loading) return <Loader />;

  return (
    <div className="menu-edit">
      <h1>{t("menu_management.edit_dish")}</h1>

      <form onSubmit={handleSubmit}>
        {/* photo upload */}
        <div className="form-section">
          <label>{t("menu_management.dish_image")}</label>
          <ImageUploader
            currentImage={formData.image}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>

        {/* name */}
        <div className="language-inputs">
          <div className="input-group">
            <label>{t("menu_management.name_cn")}</label>
            <input
              type="text"
              value={formData.name.cn}
              onChange={handleChange("name", "cn")}
              required
            />
          </div>
          <div className="input-group">
            <label>{t("menu_management.name_en")}</label>
            <input
              type="text"
              value={formData.name.en}
              onChange={handleChange("name", "en")}
              required
            />
          </div>
        </div>

        {/* category */}
        <div className="language-inputs">
          <div className="input-group">
            <label>{t("menu_management.category_cn")}</label>
            <input
              type="text"
              value={formData.category.cn}
              onChange={handleChange("category", "cn")}
              required
            />
          </div>
          <div className="input-group">
            <label>{t("menu_management.category_en")}</label>
            <input
              type="text"
              value={formData.category.en}
              onChange={handleChange("category", "en")}
              required
            />
          </div>
        </div>

        {/* price */}
        <div className="input-group">
          <label>{t("menu_management.price")}</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
            min="0"
            step="0.01"
            required
          />
        </div>

        {/* description */}
        <div className="language-inputs">
          <div className="input-group">
            <label>{t("menu_management.description_cn")}</label>
            <textarea
              value={formData.description.cn}
              onChange={handleChange("description", "cn")}
            />
          </div>
          <div className="input-group">
            <label>{t("menu_management.description_en")}</label>
            <textarea
              value={formData.description.en}
              onChange={handleChange("description", "en")}
            />
          </div>
        </div>

        {/* available */}
        <div className="input-group">
          <label>
            <input
              type="checkbox"
              checked={formData.available}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  available: e.target.checked,
                }))
              }
            />
            {t("menu_management.available")}
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="merchant-btn">{t("menu_management.save")}</button>
          <button
            type="button"
            onClick={() =>
              navigate("/merchant/menu", {
                state: { fromCategory },
                replace: true,
              })
            }
            className="merchant-btn"
        >
            {t("menu_management.cancel")}
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => setShowDeleteModal(true)}
          >
            {t("menu_management.delete")}
          </button>
        </div>
      </form>

      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <p>{t("menu_management.confirm_delete")}</p>
            <div className="modal-actions">
              <button onClick={handleConfirmDelete} className="merchant-btn">
                {t("menu_management.confirm")}
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="merchant-btn">
                {t("menu_management.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuEdit;
