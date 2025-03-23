import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { login as apiLogin } from "../api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return !!localStorage.getItem("token");
    });
  
    const login = useCallback(async (username, password) => {
        try {
          const data = await apiLogin(username, password);
          setIsAuthenticated(true);
          return data;
        } catch (error) {
          throw error;
        }
      }, []);

    const logout = useCallback(() => {
      localStorage.removeItem("token"); 
      setIsAuthenticated(false);
    }, []);
  
    const value = useMemo(() => ({
      isAuthenticated,
      login,
      logout
    }), [isAuthenticated, login, logout]);
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => useContext(AuthContext);