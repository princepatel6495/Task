import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetail.js";
import Orders from "./Components/Orders.js";
import { ToastContainer } from "react-toastify";
import Checkout from "./Components/Checkout.js";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Cart from "./Components/Cart.js";

const NavigationPanel = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand me-auto">
          My Store
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/Cart" className="nav-link">
                {`Cart ${cart?.length > 0 ? cart?.length : ""}`}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <div>
        <NavigationPanel />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
