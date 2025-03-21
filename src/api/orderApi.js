import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "/api/orders";

// Get all orders
export const getAllOrders = async (token) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

// Get order by id ( that doesn't need auth)
export const getOrderById = async (id, token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  };

// Get order by date
export const getOrdersByDate = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?date=${date}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

// Place an order( that doesn't need auth)
export const createOrder = async (orderData, token) => {
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
  console.log("Calling API to update order:", id, orderData);
  
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  };

// Delete order
export const deleteOrder = async (id, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  };

// update order status
export const updateOrderStatus = async (id, status, token) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

// update payment status
export const updatePaymentStatus = async (id, paymentStatus, token) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}/payment`, { paymentStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  };