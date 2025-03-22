import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from './context/LanguageContent.jsx';
import ClientLayout from "./layouts/ClientLayout/ClientLayout";
import MarchantLayout from "./layouts/MarchantLayout/MarchantLayout";
// User Pages
import UserScan from "./pages/client/UserScan/UserScan.jsx";
import UserHomePage from "./pages/client/UserHomePage/UserHomePage";
import UserMenu from "./pages/client/UserMenu/UserMenu";
import UserOrderPage from './pages/client/UserOrderPage/UserOrderPage.jsx';
import UserProfile from './pages/client/UserProfile/UserProfile.jsx';
// Marchant Pages
import MarchantHomePage from "./pages/marchant/MarchantHomePage/MarchantHomePage";
import MarchantMenu from "./pages/marchant/MarchantMenu/MarchantMenu";


function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* user routes */}
          <Route path="/scan" element={<UserScan />} />
          <Route path="/user/:tableNumber" element={<ClientLayout><UserHomePage /></ClientLayout>} />
          <Route path="/user/" element={<ClientLayout><UserHomePage /></ClientLayout>} />
          <Route path="/user/:tableNumber/menu" element={<ClientLayout><UserMenu /></ClientLayout>} />
          <Route path="/user/:tableNumber/myorder" element={<ClientLayout><UserOrderPage /></ClientLayout>} />
          <Route path="/user/:tableNumber/profile" element={<ClientLayout><UserProfile /></ClientLayout>} />

          {/* marchant routes */}
          <Route path="/" element={<MarchantLayout><MarchantHomePage /></MarchantLayout>} />
          <Route path="/merchant" element={<MarchantLayout><MarchantHomePage /></MarchantLayout>} />
          <Route path="/merchant/menu" element={<MarchantLayout><MarchantMenu /></MarchantLayout>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
