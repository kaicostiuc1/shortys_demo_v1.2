import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage.jsx";
import LocationPage from "./pages/LocationPage.jsx";
import { LOCATIONS } from "./lib/locations.js";
import { C, DARK_BG, HEADING_FONT, BODY_FONT } from "./lib/brand.js";
import "./index.css";

function Placeholder({ name }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: DARK_BG,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: C.cream,
      }}
    >
      <h1
        style={{
          fontFamily: HEADING_FONT,
          fontSize: "clamp(3rem, 8vw, 6rem)",
          margin: 0,
          lineHeight: 1,
        }}
      >
        {name}
      </h1>
      <p
        style={{
          fontFamily: BODY_FONT,
          fontStyle: "italic",
          fontSize: "1rem",
          opacity: 0.6,
          marginTop: "16px",
        }}
      >
        coming soon
      </p>
    </div>
  );
}

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
        <Route path="/yorktown" element={<Placeholder name="Yorktown" />} />
        <Route path="/richmond" element={<Placeholder name="Richmond" />} />
        <Route path="/stlouis" element={<Placeholder name="St. Louis" />} />
        <Route path="/menu" element={<Placeholder name="Menu" />} />
        <Route path="/about" element={<Placeholder name="About" />} />
        <Route path="/order" element={<Placeholder name="Order" />} />
        <Route path="/catering" element={<Placeholder name="Catering" />} />
        <Route path="/contact" element={<Placeholder name="Contact" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
