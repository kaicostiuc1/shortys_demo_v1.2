import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CateringPage from "./CateringPage.jsx";
import "./index.css";

const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {path === "/catering" ? <CateringPage /> : <App />}
  </React.StrictMode>
);
