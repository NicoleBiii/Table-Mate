import "./CheckoutModal.scss"
import { useEffect } from 'react';

const CheckoutModal = ({ 
  show, 
  orderId,
  onClose, 
  onConfirm 
}) => {
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
          Are you sure you want to checkout Table #{orderId}?
          <br />
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button 
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="confirm-btn"
            onClick={onConfirm}
          >
            Confirm Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;