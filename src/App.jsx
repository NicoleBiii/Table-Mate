import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from './context/LanguageContent.jsx';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import ClientLayout from "./layouts/ClientLayout/ClientLayout";
import MerchantLayout from "./layouts/MerchantLayout/MerchantLayout";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
// User Pages
import UserScan from "./pages/client/UserScan/UserScan.jsx";
import UserHomePage from "./pages/client/UserHomePage/UserHomePage";
import UserMenu from "./pages/client/UserMenu/UserMenu";
import UserOrderPage from './pages/client/UserOrderPage/UserOrderPage.jsx';
import UserProfile from './pages/client/UserProfile/UserProfile.jsx';
// Merchant Pages
import MerchantHomePage from "./pages/merchant/MerchantHomePage/MerchantHomePage";
import LoginPage from './pages/merchant/MerchantLogin/MerchantLogin.jsx';
import MerchantMenu from "./pages/merchant/MerchantMenu/MerchantMenu";
import MerchantMenuEdit from "./pages/merchant/MerchantMenuEdit/MerchantMenuEdit.jsx";
import MenuCreate from "./pages/merchant/MerchantMenuCreate/MerchantMenuCreate.jsx";
import MerchantOrder from './pages/merchant/MerchantOrder/MerchantOrder.jsx';
import MerchantOrderEdit from "./pages/merchant/MerchantOrderEdit/MerchantOrderEdit.jsx"
import MerchantTable from './pages/merchant/MerchantTable/MerchantTable.jsx';


function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<LandingPage />} />
            {/* user routes */}
            <Route path="/scan" element={<UserScan />} />
            <Route path="/user/:tableNumber" element={<ClientLayout><UserHomePage /></ClientLayout>} />
            <Route path="/user/" element={<ClientLayout><UserHomePage /></ClientLayout>} />
            <Route path="/user/:tableNumber/menu" element={<ClientLayout><UserMenu /></ClientLayout>} />
            <Route path="/user/:tableNumber/myorder" element={<ClientLayout><UserOrderPage /></ClientLayout>} />
            <Route path="/user/:tableNumber/profile" element={<ClientLayout><UserProfile /></ClientLayout>} />

            {/* merchant routes */}
            <Route path="/merchant" element={<ProtectedRoute><MerchantLayout><MerchantHomePage /></MerchantLayout></ProtectedRoute>} />
            <Route path="/merchant/login" element={<MerchantLayout><LoginPage /></MerchantLayout>} />
            <Route path="/merchant/order" element={<ProtectedRoute><MerchantLayout><MerchantOrder /></MerchantLayout></ProtectedRoute>} />
            <Route path="/merchant/order/:id/edit" element={<ProtectedRoute><MerchantLayout><MerchantOrderEdit /></MerchantLayout></ProtectedRoute>} />
            <Route path="/merchant/menu" element={<ProtectedRoute><MerchantLayout><MerchantMenu /></MerchantLayout></ProtectedRoute>} />
            <Route path="/merchant/menu/edit/:id" element={<ProtectedRoute><MerchantLayout><MerchantMenuEdit /></MerchantLayout></ProtectedRoute>} />
            <Route path="/merchant/menu/create" element={<ProtectedRoute><MerchantLayout><MenuCreate /></MerchantLayout></ProtectedRoute>} />
            <Route path="/merchant/table" element={<ProtectedRoute><MerchantLayout><MerchantTable /></MerchantLayout></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
