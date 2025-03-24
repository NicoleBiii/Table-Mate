import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createMenuItem } from "../../../api/menuApi";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import { useTranslation } from "react-i18next";
import "./MarchantMenuCreate.scss";

const MenuCreate = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: { cn: "", en: "" },
    description: { cn: "", en: "" },
    category: { cn: "", en: "" },
    price: 0,
    image: "",
    available: true,
  });

  const handleChange = (field, lang) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.cn ||
      !formData.name.en ||
      !formData.category.cn ||
      !formData.category.en
    ) {
      alert(t("menu_management.name_category_required"));
      return;
    }

    try {
      await createMenuItem(formData);
      navigate("/merchant/menu", {
        state: { fromCategory: formData.category[i18n.language === 'cn' ? 'cn' : 'en'] },
        replace: true,
      });
    } catch (error) {
      console.error("Create failed:", error);
      alert(t("menu_management.create_failed"));
    }
  };

  const handleUploadSuccess = (url) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
  };

  return (
    <div className="menu-edit">
      <h1>{t("menu_management.create_dish")}</h1>

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
          <button type="submit" className="marchant-btn">
            {t("menu_management.create")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/merchant/menu")}
            className="marchant-btn"
          >
            {t("menu_management.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuCreate;