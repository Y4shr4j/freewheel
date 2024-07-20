import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";  
import { SearchProvider } from "./context/search";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from "react-router-dom";
import 'antd/dist/reset.css';
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Toaster />
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <ErrorBoundary>
          <Router>
            <App />
          </Router>
          </ErrorBoundary>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
