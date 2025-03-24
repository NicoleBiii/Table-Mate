import { useEffect } from "react";
import "./ClientMenuItems.scss";
import AlterImage from "../../assets/images/logo_withbg.PNG";
import { Plus, Minus } from 'lucide-react';

function ClientMenuItems({ isSearchResult,selectedCategory, menuItems, cart, setCart, tableNumber }) {

    useEffect(() => {
        sessionStorage.setItem(`cart_${tableNumber}`, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id);
            if(existingItem) {
                return prevCart.map((i) =>
                i.id ===item.id ? {...i, quantity: i.quantity + 1}: i
            );
            } else {
                return [...prevCart, {...item, quantity: 1}];
            }
        });
    };

    const removeFromCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(i => i.id === item.id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    return prevCart.filter(i => i.id !== item.id);
                }
                return prevCart.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
                );
            }
            return prevCart;
        });
    };

    return (
    <div  className={`c-dishes ${isSearchResult ? 'c-dishes--search' : ''}`}>
        {menuItems[selectedCategory]?.map((item, index) => {
            const cartItem = cart.find(i => i.id === item.id);
            const quantity = cartItem?.quantity || 0;
            
            return (
                <div className="c-dish">
                    <div className="c-dish__photo">
                    <img 
                        src={item.image || AlterImage} 
                        alt="menuitem photo" 
                    />
                    </div>
                    <div className="c-dish__bottom">
                        <h3 className="c-dish__name">{item.name}</h3>
                        <p className="c-dish__description">{item.description}</p>
                        <div className="c-dish__order">
                        <h3 className="c-dish__price">${item.price}</h3>
                        <div className="quantity-control">
                            {quantity > 0 ? (
                                <>
                                    <button 
                                        className="quantity-control__btn"
                                        onClick={() => removeFromCart(item)}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="quantity-control__count">
                                        {quantity}
                                    </span>
                                    <button
                                        className="quantity-control__btn"
                                        onClick={() => addToCart(item)}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </>
                            ) : (
                                <button 
                                    className="quantity-control__btn"
                                    onClick={() => addToCart(item)}
                                >
                                    <Plus size={16} />
                                </button>
                            )}
                        </div>
                        </div>
                    </div>
                </div>
      )})}
    </div>
  )
}

export default ClientMenuItems
