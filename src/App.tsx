import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayoutComponent from "./components/LayoutComponent";

import Home from "./views/Home";
import Academy from "./views/Academy";
import Consulting from "./views/Consulting";
import Projects from "./views/Products";
import About from "./views/About";
import Callus from "./views/Callus";
import Products from "./views/Products";

export default function App() {
  return (
    <BrowserRouter>
      <LayoutComponent>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/academy" element={<Academy />} />

          <Route path="/consulting" element={<Consulting />} />

          <Route path="/products" element={<Products />} />

          <Route path="/about" element={<About />} />

          <Route path="/callus" element={<Callus />} />
        </Routes>
      </LayoutComponent>
    </BrowserRouter>
  );
}
