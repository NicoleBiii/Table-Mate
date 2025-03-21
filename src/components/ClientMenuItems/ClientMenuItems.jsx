import { useState, useEffect } from "react";
import "./ClientMenuItems.scss";
import AlterImage from "../../assets/images/logo_withbg.PNG";
import { Plus } from 'lucide-react';

function ClientMenuItems({ selectedCategory, menuItems}) {
    const [cart, setCart] = useState(() => {
        const savedCart = sessionStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
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

    return (
    <div className="c-dishes">
        {menuItems[selectedCategory]?.map((item, index) => (
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
                <button className="c-dish__add" onClick={() => addToCart(item)}>
                    <Plus className="c-dish__icon"/>
                </button>
                </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default ClientMenuItems
