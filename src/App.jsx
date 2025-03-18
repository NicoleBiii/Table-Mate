import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientHomePage from "./pages/ClientHomePage/ClientHomePage";
import UserHomePage from "./pages/UserHomePage/UserHomePage";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientHomePage />} />
        <Route path="/table/:tableNumber" element={<UserHomePage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
