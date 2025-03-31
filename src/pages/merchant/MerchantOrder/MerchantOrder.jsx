import "./MerchantOrder.scss";
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import { fetchOrders, updateOrderStatus } from '../../../api/orderApi';
import OrderStatusBadge from "../../../components/OrderStatusBadge/OrderStatusBadge";
import Loader from "../../../components/Loader/Loader";

const STATUS_LIST = ["pending", "preparing", "served", "completed"];

function MerchantOrder() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === 'zh' ? 'cn' : i18n.language;
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadOrders = async (date) => {
    try {
      setLoading(true);
      const data = await fetchOrders(date?.toISOString().split('T')[0]);
      
      const processedData = date 
        ? data
        : data.filter(order => order.paymentStatus === 'unpaid'); 
      setOrders(processedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    loadOrders(selectedDate);
  }, [selectedDate]);

  
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders(selectedDate);
    } catch (err) {
      setError(err.message);
    }
  };

  const groupOrdersByStatus = () => {
    return STATUS_LIST.reduce((groups, status) => ({
      ...groups,
      [status]: orders.filter(order => order.status === status)
    }), {});
  };

  
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="order-management">
      <div className="toolbar">
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText={t('select_date')}
          isClearable
          className="date-picker"
        />
      </div>

      {loading ? <Loader /> : (
        <div className="order-columns">
        {Object.entries(groupOrdersByStatus()).map(([status, statusOrders]) => (
          <div key={status} className="status-column">
            <h2 className="column-title">{t(`${status}`)}</h2>
            <div className="order-list">
              {statusOrders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-card__header">
                    <span className="order-card__table">#{order.tableNumber}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  
                  <div className="order-card__meta">
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                    <span className="order-card__price">${order.totalPrice}</span>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="item">
                        <span>{item.quantity}x </span>
                        <span>{item.menuItem?.name?.[currentLang] || 
                          item.menuItem?.name?.en || 
                          t('unknown_item')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="actions">
                    <Link 
                      to={`/merchant/order/${order._id}/edit`}
                      className="edit-button"
                    >
                      {t('edit_order')}
                    </Link>
                    
                    {order.status !== 'completed' && (
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="status-select"
                      >
                        {STATUS_LIST.map(s => (
                          <option key={s} value={s}>
                            {t(`${s}`)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default MerchantOrder
