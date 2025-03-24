import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "/api/orders";


const getHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
};


export const fetchOrders = async (date) => {
  try {
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    
    const response = await fetch(`${API_BASE_URL}?${params}`, 
      { headers: getHeaders() }
    );
    
    if (!response.ok) throw new Error("Failed to fetch orders");
    return response.json();
  } catch (error) {
    throw error;
  }
};


// Get order by date
export const getOrdersByDate = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?date=${date}`, 
      { headers: getHeaders() }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

// Get all orders
export const getAllOrders = async () => {
    try {
      const response = await axios.get(API_BASE_URL, 
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

// Get order by id ( that doesn't need auth)
export const getOrderById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      return -1;
    }
  };

// Place an order( that doesn't need auth)
export const createOrder = async (orderData) => {
    try {
      const response = await axios.post(API_BASE_URL, orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

// Update order
export const updateOrder = async (id, orderData) => {  
  if (!id || !orderData) {
  throw new Error("order id and data are needed");
}
  
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  };

// Delete order
export const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, 
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  };

// update order status
export const updateOrderStatus = async (id, status) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/status`, 
        { status }, 
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

// update payment status
export const updatePaymentStatus = async (id, paymentStatus) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/payment`, 
        { paymentStatus }, 
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  };