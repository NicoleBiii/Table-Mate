import "./UserOrderPage.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createOrder, getOrderById, updateOrder,getOrderByTableNumber } from "../../../api/orderApi"; 
import { getAllMenuItems } from "../../../api/menuApi";

function UserOrderPage() {
    const{ tableNumber } = useParams();
    
    // const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [order, setOrder] = useState(null);

    // Get cart
    const [cart, setCart] = useState(() => {
        const savedCart = sessionStorage.getItem(`cart_${tableNumber}`);
        return savedCart ? JSON.parse(savedCart) :  [];
    })
    
    // update cart information
    useEffect(() => {
        sessionStorage.setItem(`cart_${tableNumber}`, JSON.stringify(cart));
    }, [cart, tableNumber]);

    // update cart language when language change
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
    
    
    // Getting order of current table
    useEffect(() => {
        const fetchOrder = async () => {
          try {
            const fetchedOrder = await getOrderByTableNumber(tableNumber);
            
            if (fetchedOrder?._id && fetchedOrder.paymentStatus !== 'paid') {
              localStorage.setItem("orderId", fetchedOrder._id);
              setOrder(fetchedOrder);
            } else {
              localStorage.removeItem("orderId");
              setOrder(null);
            }
          } catch (error) {
            console.error("Fetch order error:", error);
            localStorage.removeItem("orderId");
            setOrder(null);
          }
        };
        fetchOrder();
      }, [tableNumber]);
    

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
        // const currentOrderId = order?._id || localStorage.getItem("orderId");
        try {
            const orderData = {
                tableNumber: Number(tableNumber),
                items: cart.map((item) => ({ menuItem: item.id, quantity: item.quantity })),
                totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
            };
            
            if (order?._id) {
                // If the order already exists, update it
                // get current order
                
                const currentOrder = await getOrderById(order._id);
                
                if (!currentOrder || !currentOrder.items) {
                    console.error("currentOrder is invalid", currentOrder);
                    alert(t("order_failed"));
                    return;
                }
    
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

                await updateOrder(order._id, updateData);
                const updatedOrder = await getOrderByTableNumber(tableNumber);
                
                setOrder(updatedOrder); 

                sessionStorage.removeItem(`cart_${tableNumber}`);
                setCart([]);
                alert(t("order_updated"));
                return;
            }

            // Create a new order and save the orderId to localStorage
            const newOrder = await createOrder(orderData);
            
            if (!newOrder || !newOrder._id) {
                throw new Error("Failed to create order");
            }

            await new Promise((resolve) => setTimeout(resolve, 200));

            const populatedOrder = await getOrderById(newOrder._id);
            console.log(populatedOrder);
            

            localStorage.setItem("orderId", populatedOrder._id);
            setOrder(populatedOrder);
            
            sessionStorage.removeItem(`cart_${tableNumber}`);
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
                {order?.items?.length > 0 && (
                    <div className="myorder">
                        <h3>{t("ordered")}</h3>
                        <p>{t("order_status")}:{t(order.status)}</p>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.menuItem?._id || item.menuItem}>
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
