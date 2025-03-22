import { useTranslation } from 'react-i18next';
import "./OrderStatusBadge.scss";

const statusStyles = {
  pending: 'status-badge__pending',
  preparing: 'status-badge__preparing',
  served: 'status-badge__served',
  completed: 'status-badge__completed'
};

export default function OrderStatusBadge({ status }) {
  const { t } = useTranslation();
  
  return (
    <span 
      className={`status-badge ${statusStyles[status]}`}
    >
      {t(`${status}`)}
    </span>
  );
}