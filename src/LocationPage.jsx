import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";

const C = {
  cream: "#FBF9F4",
  red: "#e11d48",
  redDark: "#be123c",
  redLight: "#fef2f2",
  redFaint: "#e11d480a",
  tan: "#f2ede4",
  tanDark: "#e8e0d2",
  border: "#e0d8ca",
  textDark: "#2c1810",
  textMid: "#5c4a3a",
  textLight: "#8b7d6e",
  brownMuted: "#8b7355",
  white: "#ffffff",
};

function BWChecker() {
  return (
    <div
      style={{
        width: "100%",
        height: 16,
        backgroundColor: "#fff",
        backgroundImage:
          "linear-gradient(45deg, #000 25%, transparent 25%), " +
          "linear-gradient(-45deg, #000 25%, transparent 25%), " +
          "linear-gradient(45deg, transparent 75%, #000 75%), " +
          "linear-gradient(-45deg, transparent 75%, #000 75%)",
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
        flexShrink: 0,
      }}
    />
  );
}

export default function LocationPage({ location }) {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#FBF9F4",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          width: "100%",
          background: "rgba(251,249,244,0.95)",
          backdropFilter: "blur(8px)",
          padding: "20px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >
        <div
          onClick={() => window.location.href = "/"}
          style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
        >
          <UtensilsCrossed size={20} color="#e11d48" />
          <span
            style={{
              fontFamily: "'Boogaloo', cursive",
              fontSize: "1.4rem",
              color: "#e11d48",
              fontWeight: 700,
            }}
          >
            Shorty's
          </span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {[
            { label: "Menu", onClick: () => { window.location.href = "/menu"; } },
            { label: "About", onClick: () => { window.location.href = "/about"; } },
            { label: "Contact", onClick: () => { window.location.href = "mailto:info@shortysdiners.com"; } },
            { label: "Order", onClick: () => { window.location.href = "/order"; } },
          ].map(({ label, onClick }) => (
            <span
              key={label}
              onClick={onClick}
              onMouseEnter={() => setHoveredNav(label)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: hoveredNav === label ? "#e11d48" : "#5c4a3a",
                cursor: "pointer",
                textDecoration: "none",
                textTransform: "uppercase",
                background: hoveredNav === label ? "rgba(225,29,72,0.06)" : "transparent",
                border: "none",
                boxShadow: "none",
                borderRadius: 20,
                padding: "4px 12px",
                transition: "all 0.2s ease",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
        }}
      >
        {/* Hero */}
        <span
          onClick={() => { window.location.href = "/"; }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#8b7d6e",
            cursor: "pointer",
            marginBottom: 16,
            display: "block",
          }}
        >
          ← All Locations
        </span>

        <div
          style={{
            fontFamily: "'Boogaloo', cursive",
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            color: "#2c1810",
            lineHeight: 1,
            textShadow: "0 0 40px rgba(225,29,72,0.2)",
          }}
        >
          {location.city}
        </div>

        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            textTransform: "uppercase",
            color: C.red,
            letterSpacing: "0.12em",
            marginTop: 8,
          }}
        >
          {location.label}
        </div>

        <div
          style={{
            width: 60,
            height: 1,
            background: "#e0d8ca",
            margin: "20px auto",
          }}
        />

        {/* Info card */}
        <div
          style={{
            maxWidth: 440,
            width: "100%",
            margin: "0 auto",
            background: "#ffffff",
            border: "1px solid #e0d8ca",
            borderRadius: 6,
            padding: "28px 32px",
            textAlign: "left",
          }}
        >
          {/* Hours */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                color: C.red,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              HOURS
            </div>
            <div
              style={{
                fontFamily: "'Boogaloo', cursive",
                fontSize: "1.3rem",
                color: "#2c1810",
                marginTop: 4,
              }}
            >
              6 AM – 2 PM
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#8b7d6e",
              }}
            >
              Open every day
            </div>
          </div>

          <div
            style={{
              height: 1,
              background: "#e0d8ca",
              marginBottom: 20,
            }}
          />

          {/* Address */}
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                color: C.red,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              ADDRESS
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "#5c4a3a",
                marginTop: 4,
                lineHeight: 1.6,
              }}
            >
              {location.address}
              <br />
              {location.cityState}
            </div>
          </div>

          {/* Phone */}
          {location.phone && (
            <div style={{ marginTop: 16 }}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  color: C.red,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                PHONE
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  color: "#5c4a3a",
                  marginTop: 4,
                }}
              >
                {location.phone}
              </div>
            </div>
          )}
        </div>

        {/* Order button */}
        {location.toastUrl && (
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <button
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              onClick={() => window.open(location.toastUrl, "_blank", "noopener")}
              style={{
                fontFamily: "'Boogaloo', cursive",
                fontSize: "1.2rem",
                color: C.white,
                background: btnHovered ? C.redDark : C.red,
                padding: "14px 44px",
                borderRadius: 3,
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Order Online
            </button>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "#8b7d6e",
                marginTop: 10,
              }}
            >
              Pickup via Toast
            </div>
          </div>
        )}

        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "#8b7d6e",
            marginTop: 64,
            marginBottom: 80,
            maxWidth: 440,
          }}
        >
          "It's not Fancy. It's not Fat Free. It's Just the Way It Used to Be."
        </div>
      </div>

      {/* BWChecker at very bottom */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <BWChecker />
      </div>
    </div>
  );
}
