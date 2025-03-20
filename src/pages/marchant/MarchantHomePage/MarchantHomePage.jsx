import "./MarchantHomePage.scss";
import { useTranslation } from "react-i18next"; 
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrdersByDate } from "../../../api/orderApi";

function MarchantHomePage() {
  const { t, i18n } = useTranslation();
  const [ orderCount, setOrderCount ] = useState(0);
  const [ activeOrderCount, setActiveOrderCount ] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  
  useEffect(() => {
    const getOrder = async() => {
      try {
        const order_today = await getOrdersByDate(today);
        const unpaidOrders = orders.filter(order => order.paymentStatus === 'unpaid');
        setOrderCount(order_today.length);
        setActiveOrderCount(unpaidOrders.length);
      } catch (error) {
        console.log("Error Fetching data:", error);
      }
    }
    getOrder();
  },[])

  return (
    <div>
      <div className="inifor-card">
        <h3>{t("order_count")}</h3>
        <h3>{orderCount}</h3>
        <Link>{t("orders")}</Link>
      </div>
      <div className="inifor-card">
        <h3>{t("active_order_count")}</h3>
        <h3>{activeOrderCount}</h3>
        <Link>{t("tables")}</Link>
      </div>
    </div>
  )
}

export default MarchantHomePage
