//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import RegiSucessfullpage from "./pages/RegiSucessfullpage";
import Productpage from "./pages/Productpage";
import ProductDetailspage from "./pages/ProductDetailspage";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import CartPage from "./pages/CartPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderHistory from "./pages/OrderHistory";
import Compo from "./components/Compo";
import UserProvider from "./components/UserProvider";
import Farmerspage from "./pages/Farmerspage";

import FarmersInformation from "./pages/FarmersInformationpage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Landing />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="registered" element={<RegiSucessfullpage />} />
            <Route path="products" element={<Productpage />} />
            <Route path="products/:id" element={<ProductDetailspage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order" element={<OrderConfirmationPage />} />
            <Route path="orderhistory" element={<OrderHistory />} />
            <Route path="campo" element={<Compo />} />
            <Route path="farmers" element={<Farmerspage />} />
            <Route path="farmers/:id" element={<FarmersInformation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
