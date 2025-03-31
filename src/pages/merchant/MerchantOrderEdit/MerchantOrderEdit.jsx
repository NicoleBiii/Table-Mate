import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateOrder, getOrderById } from "../../../api/orderApi";
import { getAllMenuItems } from "../../../api/menuApi";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader/Loader";
import "./MerchantOrderEdit.scss";

const OrderEdit = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === 'zh' ? 'cn' : i18n.language;
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [orderData, setOrderData] = useState({
    tableNumber: 0,
    items: [],
    status: "pending",
    paymentStatus: "unpaid"
  });

  // load data
  useEffect(() => {
    const loadData = async () => {
      try {
          // get all menu item
          const allMenuItems = await getAllMenuItems( currentLang );
          setMenuItems(allMenuItems);
          
        // get order data
        const order = await getOrderById(id);
        setOrderData({
            ...order,
            items: order.items.map(item => ({
              menuItem: item.menuItem._id,
              quantity: item.quantity
            }))
          });
        
      } catch (error) {
        console.error("fail load data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id, i18n.language]);

  // handle change
  const handleChange = (field) => (e) => {
    setOrderData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // handele menu item change
  const handleItemChange = (index, field) => (e) => {
    const newItems = [...orderData.items];
    newItems[index][field] = field === 'quantity' ? parseInt(e.target.value) : e.target.value;
    setOrderData(prev => ({ ...prev, items: newItems }));
  };

  // handle add item
  const addItem = () => {
    setOrderData(prev => ({
      ...prev,
      items: [...prev.items, { menuItem:  menuItems[0]?.id || "", quantity: 1 }]
    }));
  };

  // remove item
  const removeItem = (index) => {
    const newItems = orderData.items.filter((_, i) => i !== index);
    setOrderData(prev => ({ ...prev, items: newItems }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateOrder(id, orderData);
      alert(t("order_management.update_success"));
      navigate("/merchant/order");
    } catch (error) {
      console.error("更新失败:", error);
      alert(t("order_management.update_failed"));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="order-edit-container">
      <h1>{t("order_management.edit_order")}</h1>
      
      <form onSubmit={handleSubmit}>
        {/* table number */}
        <div className="form-group">
          <label>{t("order_management.table_number")}</label>
          <input
            type="number"
            value={orderData.tableNumber}
            onChange={handleChange("tableNumber")}
            required
          />
        </div>

        {/* menu item list */}
        <div className="items-section">
          <h3>{t("order_management.items")}</h3>
          
          {orderData.items.map((item, index) => {
            const selectedMenuItem = menuItems.find(m => m.id === item.menuItem);
            
            return (
            <div key={index} className="item-row">
              <select
                value={item.menuItem}
                onChange={handleItemChange(index, "menuItem")}
                required
              >
                <option value={item.menuItem}>{selectedMenuItem.name}</option>
                {menuItems
                    .filter(m => m.id !== item.menuItem) 
                    .map(menuItem => (
                    <option key={menuItem.id} value={menuItem.id}>
                        {menuItem.name}
                    </option>
                    ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={handleItemChange(index, "quantity")}
                className="quantity-input"
              />

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="remove-btn"
              >
                {t("order_management.remove_item")}
              </button>
            </div>
          )})}

          <button
            type="button"
            onClick={addItem}
            className="merchant-btn"
          >
            {t("order_management.add_item")}
          </button>
        </div>

        {/* update status */}
        <div className="form-group">
          <label>{t("order_management.status")}</label>
          <select
            value={orderData.status}
            onChange={handleChange("status")}
          >
            {Object.entries(t("order_management.status_options", { returnObjects: true })).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* payment status */}
        <div className="form-group">
          <label>{t("order_management.payment_status")}</label>
          <select
            value={orderData.paymentStatus}
            onChange={handleChange("paymentStatus")}
          >
            {Object.entries(t("order_management.payment_status_options", { returnObjects: true })).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* action button */}
        <div className="form-actions">
          <button type="submit" className="merchant-btn confirm-btn">
            {t("update")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/merchant/order")}
            className="merchant-btn cancel-btn"
          >
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderEdit;