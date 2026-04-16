import { useState, useEffect } from "react";
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

const ORDER_LOCATIONS = [
  { id: "williamsburg", label: "Williamsburg", lat: 37.2696, lng: -76.6771 },
  { id: "yorktown",     label: "Yorktown",     lat: 37.1299, lng: -76.4772 },
  { id: "richmond",    label: "Richmond",     lat: 37.5849, lng: -77.5082 },
  { id: "stlouis",     label: "St. Louis",    lat: 38.6270, lng: -90.1994 },
];

function distanceMiles(lat1, lng1, lat2, lng2) {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const CSS = `
  .order-loc-btn {
    background: #ffffff;
    border: 1px solid #e0d8ca;
    color: #2c1810;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 14px 24px;
    border-radius: 3px;
    cursor: pointer;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    transition: background 0.2s, border-color 0.2s;
    box-sizing: border-box;
  }
  .order-loc-btn:hover {
    background: rgba(225,29,72,0.04);
    border-color: #e11d48;
  }
`;

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

const LOCATIONS = [
  { id: "williamsburg", label: "Williamsburg" },
  { id: "yorktown", label: "Yorktown" },
  { id: "richmond", label: "Richmond" },
  { id: "stlouis", label: "St. Louis" },
];

export default function OrderPage() {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [nearestOrder, setNearestOrder] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let closestId = null, closestDist = Infinity;
        ORDER_LOCATIONS.forEach(loc => {
          const d = distanceMiles(latitude, longitude, loc.lat, loc.lng);
          if (d < closestDist) { closestDist = d; closestId = loc.id; }
        });
        setNearestOrder(closestId);
      },
      () => {}
    );
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#FBF9F4",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{CSS}</style>

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
        <div onClick={() => window.location.href = "/"} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
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
            { label: "Order", onClick: null, active: true },
          ].map(({ label, onClick, active }) => (
            <span
              key={label}
              onClick={onClick || undefined}
              onMouseEnter={() => setHoveredNav(label)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: hoveredNav === label ? "#e11d48" : active ? C.red : "#5c4a3a",
                cursor: onClick ? "pointer" : "default",
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
          paddingBottom: 80,
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
        }}
      >
        {/* Hero */}
        <div
          style={{
            fontFamily: "'Boogaloo', cursive",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "#2c1810",
            lineHeight: 1.1,
          }}
        >
          Order Shorty's
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: C.red,
            marginTop: 8,
          }}
        >
          Pickup · Delivery
        </div>
        <div
          style={{
            width: 60,
            height: 1,
            background: "#e0d8ca",
            margin: "24px auto",
          }}
        />

        {/* Location selector */}
        <div
          style={{
            maxWidth: 480,
            width: "100%",
            margin: "0 auto",
            marginTop: 40,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#8b7d6e",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            SELECT A LOCATION
          </div>
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              className="order-loc-btn"
              onClick={() => {}}
              style={nearestOrder === loc.id ? {
                border: "1px solid #e11d48",
                boxShadow: "0 0 0 1px #e11d48",
              } : undefined}
            >
              <span>
                {nearestOrder === loc.id && (
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 9,
                    color: C.red,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: 4,
                  }}>
                    NEAREST TO YOU
                  </span>
                )}
                {loc.label}
              </span>
              <span style={{ color: C.red }}>→</span>
            </button>
          ))}
        </div>

        {/* Hint text */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "#8b7d6e",
            marginTop: 48,
          }}
        >
          Select a location above to see pickup and delivery options.
        </div>
      </div>

      {/* BWChecker at very bottom */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <BWChecker />
      </div>
    </div>
  );
}
