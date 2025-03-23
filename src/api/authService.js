
const API_BASE_URL = import.meta.env.VITE_API_URL + "/api/auth";

export const login = async (username, password) => {
  let response; 
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const responseText = await response.text();
    
    try {
      const data = JSON.parse(responseText);
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      
      localStorage.setItem("token", data.token); 
      return data;
    } catch (jsonError) {
      throw new Error(`Invalid response: ${responseText.slice(0, 100)}`);
    }
  } catch (error) {
    console.error('Login error details:', {
      url: `${API_BASE_URL}/login`,
      error: error.message,
      status: response?.status || 'N/A'
    });
    throw new Error(t('login_page.error')); 
  }
};


export const getAuthToken = () => {
  return localStorage.getItem("token");
};
