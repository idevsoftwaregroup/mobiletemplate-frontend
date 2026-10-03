import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./contexts/CartContext";

import LayoutComponent from "./components/LayoutComponent";

import Home from "./views/Home";
import Academy from "./views/Academy";
import Consulting from "./views/Consulting";
import Products from "./views/Products";
import About from "./views/AboutUs";
import Callus from "./views/ContactUs";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Login from "./views/Login";

import Profile from "./views/Profile";
import Payments from "./views/Payments";
import Orders from "./views/Orders";
import AboutUs from "./views/AboutUs";
import ContactUs from "./views/ContactUs";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <LayoutComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/consulting" element={<Consulting />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/callus" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </LayoutComponent>
      </BrowserRouter>
    </CartProvider>
  );
}
