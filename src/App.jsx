import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from './context/LanguageContent.jsx';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import ClientLayout from "./layouts/ClientLayout/ClientLayout";
import MarchantLayout from "./layouts/MarchantLayout/MarchantLayout";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
// User Pages
import UserScan from "./pages/client/UserScan/UserScan.jsx";
import UserHomePage from "./pages/client/UserHomePage/UserHomePage";
import UserMenu from "./pages/client/UserMenu/UserMenu";
import UserOrderPage from './pages/client/UserOrderPage/UserOrderPage.jsx';
import UserProfile from './pages/client/UserProfile/UserProfile.jsx';
// Marchant Pages
import MarchantHomePage from "./pages/marchant/MarchantHomePage/MarchantHomePage";
import LoginPage from './pages/marchant/MarchantLogin/MarchantLogin.jsx';
import MarchantMenu from "./pages/marchant/MarchantMenu/MarchantMenu";
import MarchantMenuEdit from "./pages/marchant/MarchantMenuEdit/MarchantMenuEdit.jsx";
import MenuCreate from "./pages/marchant/MarchantMenuCreate/MarchantMenuCreate.jsx";
import MarchantOrder from './pages/marchant/MarchantOrder/MarchantOrder.jsx';
import MarchantOrderEdit from "./pages/marchant/MarchantOrderEdit/MarchantOrderEdit.jsx"
import MarchantTable from './pages/marchant/MarchantTable/MarchantTable.jsx';


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

            {/* marchant routes */}
            <Route path="/merchant" element={<ProtectedRoute><MarchantLayout><MarchantHomePage /></MarchantLayout></ProtectedRoute>} />
            <Route path="/merchant/login" element={<MarchantLayout><LoginPage /></MarchantLayout>} />
            <Route path="/merchant/order" element={<ProtectedRoute><MarchantLayout><MarchantOrder /></MarchantLayout></ProtectedRoute>} />
            <Route path="/merchant/order/:id/edit" element={<ProtectedRoute><MarchantLayout><MarchantOrderEdit /></MarchantLayout></ProtectedRoute>} />
            <Route path="/merchant/menu" element={<ProtectedRoute><MarchantLayout><MarchantMenu /></MarchantLayout></ProtectedRoute>} />
            <Route path="/merchant/menu/edit/:id" element={<ProtectedRoute><MarchantLayout><MarchantMenuEdit /></MarchantLayout></ProtectedRoute>} />
            <Route path="/merchant/menu/create" element={<ProtectedRoute><MarchantLayout><MenuCreate /></MarchantLayout></ProtectedRoute>} />
            <Route path="/merchant/table" element={<ProtectedRoute><MarchantLayout><MarchantTable /></MarchantLayout></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
