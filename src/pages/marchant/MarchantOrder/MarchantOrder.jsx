import "./MarchantOrder.scss";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import { fetchOrders } from '../../../api/orderApi';
import OrderStatusBadge from "../../../components/OrderStatusBadge/OrderStatusBadge";
import Loader from "../../../components/Loader/Loader";

const STATUS_ORDER = {
  pending: 1,
  preparing: 2,
  served: 3,
  completed: 4
};


function MarchantOrder() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadOrders = async (date) => {
    try {
      setLoading(true);
      const data = await fetchOrders(date?.toISOString().split('T')[0]);
      
      
      const sortedOrders = data.sort((a, b) => {
        const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
        return statusDiff !== 0 ? statusDiff : new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setOrders(sortedOrders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    loadOrders(selectedDate);
  }, [selectedDate]);

  
  // const handleStatusChange = async (orderId, newStatus) => {
  //   try {
  //     await updateOrderStatus(orderId, newStatus);
  //     loadOrders(selectedDate);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  if (error) return <ErrorAlert message={error} />;

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
        <div className="order-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="header">
                <span>#{order.tableNumber}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              
              <div className="meta">
                <span>{new Date(order.createdAt).toLocaleString()}</span>
                <span>${order.totalPrice}</span>
              </div>

              <div className="actions">
                <Link 
                  to={`/merchant/orders/${order._id}/edit`}
                  className="edit-button"
                >
                  {t('edit_order')}
                </Link>
                
                {order.status !== 'completed' && (
                  <select 
                    value={order.status}
                    // onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="status-select"
                  >
                    {Object.keys(STATUS_ORDER).map(status => (
                      <option key={status} value={status}>
                        {t(`status.${status}`)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MarchantOrder
