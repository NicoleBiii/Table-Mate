import "./CheckoutModal.scss"
import { useEffect } from 'react';
import { useTranslation } from "react-i18next"; 

const CheckoutModal = ({ 
  show, 
  order,
  onClose, 
  onConfirm 
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="checkout-modal">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        <h3 className="modal-title">Confirm Checkout</h3>
        <p className="modal-description">
        {`${t("checkout_page.confirm_checkout")} #${order.tableNumber}? ${t("checkout_page.checkout_warning")}`}

        </p>

        <div className="modal-actions">
          <button 
            className="merchant-btn"
            onClick={onClose}
          >
            {t("cancel")}
          </button>
          <button 
            className="merchant-btn"
            onClick={onConfirm}
          >
            {t("checkout_page.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;