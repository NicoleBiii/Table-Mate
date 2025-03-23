import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuItemById, updateMenuItem } from "../../../api/menuApi";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import Loader from "../../../components/Loader/Loader";
import "./MarchantMenuEdit.scss";

const MenuEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: { cn: "", en: "" },
    description: { cn: "", en: "" },
    category: { cn: "", en: "" },
    price: 0,
    image: "",
    available: true,
  });

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
      alert("中英文名称和分类为必填项");
      return;
    }

    try {
      await updateMenuItem(id, formData);
      navigate("/merchant/menu"); // back to menu page
    } catch (error) {
      console.error("Update failed:", error);
      alert("更新失败");
    }
  };

  const handleUploadSuccess = (url) => {
    setFormData(prev => ({
        ...prev,
        image: url
      }));
    console.log('updated image url:', url);
  };

  if (loading) return <Loader />;

  return (
    <div className="menu-edit">
      <h1>编辑菜品</h1>

      <form onSubmit={handleSubmit}>
        {/* photo upload */}
        <div className="form-section">
          <label>菜品图片</label>
          <ImageUploader
            currentImage={formData.image}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>

        {/* name */}
        <div className="language-inputs">
          <div className="input-group">
            <label>中文名称</label>
            <input
              type="text"
              value={formData.name.cn}
              onChange={handleChange("name", "cn")}
              required
            />
          </div>
          <div className="input-group">
            <label>英文名称</label>
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
            <label>中文分类</label>
            <input
              type="text"
              value={formData.category.cn}
              onChange={handleChange("category", "cn")}
              required
            />
          </div>
          <div className="input-group">
            <label>英文分类</label>
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
          <label>价格</label>
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
            <label>中文描述</label>
            <textarea
              value={formData.description.cn}
              onChange={handleChange("description", "cn")}
            />
          </div>
          <div className="input-group">
            <label>英文描述</label>
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
            是否可用
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">保存修改</button>
          <button type="button" onClick={() => navigate(-1)}>
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuEdit;
