import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const [checked, setChecked] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setChecked(true), 50);
      return () => clearTimeout(timer);
    }, []);
  
    if (!checked) return null;
  
    if (!isAuthenticated) {
      return (
        <Navigate 
          to="/merchant/login" 
          state={{ from: location }} 
          replace
        />
      );
    }
  
    return children;
};

export default ProtectedRoute;