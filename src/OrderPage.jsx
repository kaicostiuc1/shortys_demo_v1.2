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

const CSS = `
  .order-loc-btn {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(251,249,244,0.8);
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
    background: rgba(255,255,255,0.08);
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
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#0d0804",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{CSS}</style>

      {/* Grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/feTurbulence%3E%3C/svg%3E\")",
          opacity: 0.045,
          mixBlendMode: "overlay",
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          width: "100%",
          background: "transparent",
          padding: "20px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
            { label: "Menu", onClick: () => { window.location.href = "/williamsburg#menu"; } },
            { label: "About", onClick: () => { window.location.href = "/about"; } },
            { label: "Contact", onClick: () => { window.location.href = "mailto:info@shortysdiners.com"; } },
            { label: "Order", onClick: null, active: true },
          ].map(({ label, onClick, active }) => (
            <span
              key={label}
              onClick={onClick || undefined}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: active ? C.red : "rgba(251,249,244,0.85)",
                cursor: onClick ? "pointer" : "default",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </nav>
      <BWChecker />

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
            color: C.cream,
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
            background: "rgba(255,255,255,0.08)",
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
              color: "rgba(251,249,244,0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            SELECT A LOCATION
          </div>
          {LOCATIONS.map((loc) => (
            <button key={loc.id} className="order-loc-btn" onClick={() => {}}>
              <span>{loc.label}</span>
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
            color: "rgba(251,249,244,0.2)",
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
