import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CateringPage from "./CateringPage.jsx";
import SplashPage from "./SplashPage.jsx";
import OrderPage from "./OrderPage.jsx";
import MenuPage from "./MenuPage.jsx";
import AboutPage from "./AboutPage.jsx";
import "./index.css";

const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {path === "/catering" ? <CateringPage /> : path === "/" ? <SplashPage /> : path === "/order" ? <OrderPage /> : path === "/menu" ? <MenuPage /> : path === "/about" ? <AboutPage /> : <App />}
  </React.StrictMode>
);
