import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "/api/menu";


const getHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
};

// Get all menu item
export const getAllMenuItems = async (lang = "en") => {
    try {
      const langKey = lang === "zh" ? "cn" : lang;
      const response = await axios.get(`${API_BASE_URL}?lang=${langKey}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw error;
    }
  };


// get menu item by id 
export const getMenuItemById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching menu item:", error);
      throw error;
    }
  };

// get menu item by category
export const getMenuItemsByCategory = async (category, lang = "en") => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${category}?lang=${lang}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching menu items by category:", error);
      throw error;
    }
  };

// Search menu item
export const searchMenuItems = async (query, lang = "en") => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search?query=${query}&lang=${lang}`);
      return response.data;
    } catch (error) {
      console.error("Error searching menu items:", error);
      throw error;
    }
  };

// Create menu item(need authority)
export const createMenuItem = async (menuItem, token) => {
    try {
      const response = await axios.post(API_BASE_URL, menuItem, 
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating menu item:", error);
      throw error;
    }
  };

// Update menu item
export const updateMenuItem = async (id, menuItem, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, menuItem, 
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating menu item:", error);
      throw error;
    }
  };

// Delete menu item 
export const deleteMenuItem = async (id, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, 
        { headers: getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting menu item:", error);
      throw error;
    }
  };

// upload menu item image
export const uploadMenuItemImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('upload success:', response.data);
      return response.data.imageUrl;
    } catch (error) {
      console.error('error upload:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  };