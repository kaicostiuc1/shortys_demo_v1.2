import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage.jsx";
import LocationPage from "./pages/LocationPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CateringPage from "./pages/CateringPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import { LOCATIONS } from "./lib/locations.js";
import "./index.css";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#FBF9F4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      Page not found
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route
          path="/williamsburg"
          element={<LocationPage location={LOCATIONS.williamsburg} />}
        />
        <Route
          path="/yorktown"
          element={<LocationPage location={LOCATIONS.yorktown} />}
        />
        <Route
          path="/richmond"
          element={<LocationPage location={LOCATIONS.richmond} />}
        />
        <Route
          path="/stlouis"
          element={<LocationPage location={LOCATIONS.stlouis} />}
        />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/catering" element={<CateringPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
