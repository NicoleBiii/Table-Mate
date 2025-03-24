import { useState, useEffect } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { updatePaymentStatus, updateOrderStatus, getAllOrders } from '../../../api/orderApi';
import CheckoutModal from '../../../components/CheckoutModal/CheckoutModal';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../../context/AuthContext";
import "./MarchantTable.scss";

function MarchantTable() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data.filter(order => order.paymentStatus === 'unpaid'));
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);


  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert("you need logined to chekout");
      return;
    }
  
    try {
      await updatePaymentStatus(selectedOrder, "paid");
      await updateOrderStatus(selectedOrder, "completed");
      loadOrders();
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setShowModal(false);
    }
  };


  return (
<div className="table-management">
      <div className="tables-grid">
        {tables.map(tableNumber => {
          const tableOrder = orders.find(order => order.tableNumber === tableNumber);
          
          return (
            <div 
              key={tableNumber}
              className={`table-card ${tableOrder ? 'has-order' : 'no-order'}`}
            >
              <div className="table-number">#{tableNumber}</div>
              
              {tableOrder && (
                <div className="order-info">
                  <div className="status-group">
                    <span>{t(tableOrder.status)}</span>
                    <span>{t(tableOrder.paymentStatus)}</span>
                  </div>
                  <div className="time-created">
                    {formatDistanceToNowStrict(new Date(tableOrder.createdAt))} ago
                  </div>
                  <button 
                    className="marchant-btn"
                    onClick={() => {
                      setSelectedOrder(tableOrder._id);
                      setShowModal(true);
                    }}
                  >
                    {t("checkout")}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <CheckoutModal
        show={showModal}
        orderId={selectedOrder?.tableNumber}
        onClose={() => setShowModal(false)}
        onConfirm={handleCheckout}
      />
    </div>
  )
}

export default MarchantTable
