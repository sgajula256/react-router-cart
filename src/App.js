import "./App.css";
import Header from "./components/Header";
import ProductsMenu from "./components/ProductsMenu";
import ProductDetails from "./components/ProductDetails";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsMenu />} />
        <Route path="/cart/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
