import "./FloatingCart.scss";
import { ShoppingCart } from 'lucide-react';

function FloatingCart({ cart }) {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <div className={`floating-cart ${itemCount > 0 ? 'expanded' : ''}`}>
        <div className="cart-icon">
          <ShoppingCart size={24} />
        </div>
        {itemCount > 0 && (
          <div className="cart-count">
            {itemCount}
          </div>
        )}
      </div>
    );
}

export default FloatingCart
