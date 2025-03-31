import "./MerchantHomePage.scss";
import { useTranslation } from "react-i18next"; 
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrdersByDate } from "../../../api/orderApi";

function MerchantHomePage() {
  const { t, i18n } = useTranslation();
  const [ orderCount, setOrderCount ] = useState(0);
  const [ activeOrderCount, setActiveOrderCount ] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  
  useEffect(() => {
    const getOrder = async() => {
      try {
        const order_today = await getOrdersByDate(today);
        const unpaidOrders = order_today.filter(order => order.paymentStatus === 'unpaid');
        setOrderCount(order_today.length);
        setActiveOrderCount(unpaidOrders.length);
      } catch (error) {
        console.log("Error Fetching data:", error);
      }
    }
    getOrder();
  },[])

  return (
    <div className="m-home">
      <div className="infor-card">
        <h3 className="infor-card__title">{t("order_count")}</h3>
        <h3 className="infor-card__number">{orderCount}</h3>
        <Link to="/merchant/order" className="infor-card__link">{t("orders")}</Link>
      </div>
      <div className="infor-card">
        <h3 className="infor-card__title">{t("active_order_count")}</h3>
        <h3 className="infor-card__number">{activeOrderCount}</h3>
        <Link to="/merchant/table" className="infor-card__link">{t("tables")}</Link>
      </div>
    </div>
  )
}

export default MerchantHomePage
