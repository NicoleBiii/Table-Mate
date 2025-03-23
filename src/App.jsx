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
import MarchantMenuEdit from "./pages/marchant/MarchantMenuEdit/MarchantMenuEdit.jsx";
import MenuCreate from "./pages/marchant/MarchantMenuCreate/MarchantMenuCreate.jsx";
import MarchantOrder from './pages/marchant/MarchantOrder/MarchantOrder.jsx';
import MarchantOrderEdit from "./pages/marchant/MarchantOrderEdit/MarchantOrderEdit.jsx"
import MarchantTable from './pages/marchant/MarchantTable/MarchantTable.jsx';


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
          <Route path="/merchant/order" element={<MarchantLayout><MarchantOrder /></MarchantLayout>} />
          <Route path="/merchant/order/:id/edit" element={<MarchantLayout><MarchantOrderEdit /></MarchantLayout>} />
          <Route path="/merchant/menu" element={<MarchantLayout><MarchantMenu /></MarchantLayout>} />
          <Route path="/merchant/menu/edit/:id" element={<MarchantLayout><MarchantMenuEdit /></MarchantLayout>} />
          <Route path="/merchant/menu/create" element={<MarchantLayout><MenuCreate /></MarchantLayout>} />
          <Route path="/merchant/table" element={<MarchantLayout><MarchantTable /></MarchantLayout>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
