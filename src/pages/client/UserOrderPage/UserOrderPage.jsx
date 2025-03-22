import "./UserOrderPage.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createOrder, getOrderById, updateOrder } from "../../../api/orderApi"; 
import { getAllMenuItems } from "../../../api/menuApi";
import i18n from "../../../i18n";

function UserOrderPage() {
    const{ tableNumber } = useParams();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    // Get cart
    const [cart, setCart] = useState(() => {
        const savedCart = sessionStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) :  [];
    })
    
    // update cart information
    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const [allMenuItems, setAllMenuItems] = useState([]);

    const updateCartNames = async () => {
        try {
            const latestMenu = await getAllMenuItems(i18n.language);
            
            const menuMap = new Map(latestMenu.map(item => [item.id, item]));
            
            const updatedCart = cart.map(cartItem => {
                const latestItem = menuMap.get(cartItem.id);
                return latestItem 
                    ? { ...cartItem, name: latestItem.name }
                    : cartItem;
            });

            setCart(updatedCart);
        } catch (error) {
            console.error("fail update cart", error);
        }
    };

    useEffect(() => {
        if (cart.length > 0) {
            updateCartNames();
        }
    }, [i18n.language]);
    
    // order
    const [order, setOrder] = useState(null);
    const orderId = localStorage.getItem("orderId");
    
    // Getting order of current table

    
    useEffect(() => {
        if (!orderId || orderId === "undefined") return;

        const fetchOrder = async () => {
            try {
                const fetchedOrder = await getOrderById(orderId);
                
                setOrder(fetchedOrder);

                // if order is paid or fail fetch order, clear localStorage and set order to null
                if (fetchedOrder.paymentStatus === "paid" || !fetchedOrder || fetchedOrder == -1 ) {
                    localStorage.removeItem("orderId");
                    setOrder(null);
                }
            } catch (error) {
                console.error("fail fetch order:", error);
            }
        }
        fetchOrder();
    }, [orderId]);

    const updateQuantity = (id, delta) => {
        setCart((prevCart) => 
            prevCart.map((item) => 
                item.id === id ? {...item, quantity: item.quantity + delta} : item
            )
            .filter((item) => item.quantity > 0)
        );
    };

    const handleCheckout = async() => {
        if(!cart.length) return alert(t("cart_empty"));
        try {
            const orderData = {
                tableNumber: Number(tableNumber),
                items: cart.map((item) => ({ menuItem: item.id, quantity: item.quantity })),
                totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
            };
            
            if (orderId && orderId != "undefined") {
                // If the order already exists, update it
                // get current order
                const currentOrder = await getOrderById(orderId);
                //merge old and new menuitem
                const mergedItems = [...currentOrder.items];

                cart.forEach(newItem => {
                    const existingItem = mergedItems.find(
                      item => item.menuItem === newItem.id
                    );
                    
                    if (existingItem) {
                      existingItem.quantity += newItem.quantity;
                    } else {
                      mergedItems.push({
                        menuItem: newItem.id,
                        quantity: newItem.quantity
                      });
                    }
                  });

                // updated data
                const updateData = {
                    tableNumber: Number(tableNumber),
                    items: mergedItems,
                    totalPrice: currentOrder.totalPrice + 
                      cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
                  };
                await updateOrder(orderId, updateData);
                const updatedOrder = await getOrderById(orderId);
                setOrder(updatedOrder); 
                sessionStorage.removeItem("cart");
                setCart([]);
                alert(t("order_updated"));
                return;
            }

            // Create a new order and save the orderId to localStorage
            const newOrder = await createOrder(orderData);
            const populatedOrder = await getOrderById(newOrder._id);
            localStorage.setItem("orderId", populatedOrder._id);
            setOrder(populatedOrder);
            sessionStorage.removeItem("cart");
            setCart([]); 
            alert(t("order_successed"));
        } catch (e) {
            console.error("order fail:",e);
            alert(t("order_failed"));
        }
    }


    return (
        <div className="u-order">
            <h2 className="u-order__title">{t("table_number")}:{tableNumber}</h2>
            <div className="cart">
                <h3 className="cart__title">{t("cart")}</h3>
                {cart.length ? (
                    <ul>
                    {cart.map((item) => (
                        <li className="u-dish" key={item.id}>
                        <p className="u-dish__name">{item.name}</p>
                        <div className="u-dish__modify">
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        {item.quantity}
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>{t("cart_empty")}</p>
                )}
                <button onClick={handleCheckout}>{t("add")}</button> 
            </div>
                {order && (
                    <div className="myorder">
                        <h3>{t("ordered")}</h3>
                        <p>{t("order_status")}:{t(order.status)}</p>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.menuItem._id}>
                                    {i18n.language === "en" ? item.menuItem.name.en : item.menuItem.name.cn} x {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
        </div>
    )
}

export default UserOrderPage
