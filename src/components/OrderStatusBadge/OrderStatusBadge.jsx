import { useTranslation } from 'react-i18next';

const statusColors = {
  pending: 'orange',
  preparing: 'blue',
  served: 'purple',
  completed: 'green'
};

export default function OrderStatusBadge({ status }) {
  const { t } = useTranslation();
  
  return (
    <span 
      className="status-badge"
      style={{ backgroundColor: statusColors[status] }}
    >
      {t(`status.${status}`)}
    </span>
  );
}