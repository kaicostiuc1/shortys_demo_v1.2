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

export default function AboutPage() {
  const [hoveredNav, setHoveredNav] = useState(null);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0d0804",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            { label: "About", onClick: null, active: true },
            { label: "Contact", onClick: () => { window.location.href = "mailto:info@shortysdiners.com"; } },
            { label: "Order", onClick: () => { window.location.href = "/order"; } },
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
                color: hoveredNav === label ? "#ffffff" : active ? C.red : "rgba(251,249,244,0.85)",
                cursor: onClick ? "pointer" : "default",
                textDecoration: "none",
                textTransform: "uppercase",
                boxShadow: hoveredNav === label ? "0 0 0 1.5px #e11d48" : "none",
                borderRadius: 20,
                padding: "4px 12px",
                transition: "all 0.25s ease",
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
        }}
      >
        {/* Hero */}
        <div
          style={{
            paddingTop: 72,
            paddingBottom: 0,
            textAlign: "center",
          }}
        >
          <img
            src="/shortys-logo.png"
            alt="Shorty's Diner"
            style={{
              maxWidth: 280,
              width: "88%",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
          <div
            style={{
              fontFamily: "'Boogaloo', cursive",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              color: C.cream,
              marginTop: 24,
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            From Behind the Counter
          </div>
          <div
            style={{
              width: 60,
              height: 1,
              background: "rgba(255,255,255,0.08)",
              margin: "20px auto",
            }}
          />
        </div>

        {/* Content cards */}
        <div
          style={{
            maxWidth: 620,
            margin: "0 auto",
            padding: "0 24px 80px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Card 1 — The Origin */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6,
              padding: "28px 32px",
            }}
          >
            <div
              style={{
                fontFamily: "'Boogaloo', cursive",
                fontSize: "1.2rem",
                color: C.red,
                marginBottom: 14,
              }}
            >
              Est. 1980
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "normal",
                fontSize: "1rem",
                color: "rgba(251,249,244,0.75)",
                lineHeight: 1.85,
              }}
            >
              We started Shorty's in 1980 with one griddle, one coffee pot,
              and the belief that if you treat people right and cook honest
              food, they'll keep coming back. Forty-four years and a lot of
              coffee later — the philosophy hasn't changed.
            </div>
          </div>

          {/* Card 2 — The Place */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6,
              padding: "28px 32px",
            }}
          >
            <div
              style={{
                fontFamily: "'Boogaloo', cursive",
                fontSize: "1.2rem",
                color: C.red,
                marginBottom: 14,
              }}
            >
              One of the Last of Its Kind
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "normal",
                fontSize: "1rem",
                color: "rgba(251,249,244,0.75)",
                lineHeight: 1.85,
              }}
            >
              Whether you're a Williamsburg local, a first-time visitor,
              or a regular who's had the same booth since the checkered
              floor was new — pull up a chair. There's always room.
            </div>
          </div>

          {/* Card 3 — Coming Soon */}
          <div
            style={{
              background: "rgba(225,29,72,0.04)",
              border: "1px solid rgba(225,29,72,0.12)",
              borderRadius: 6,
              padding: "28px 32px",
            }}
          >
            <div
              style={{
                fontFamily: "'Boogaloo', cursive",
                fontSize: "1.2rem",
                color: "rgba(251,249,244,0.4)",
                marginBottom: 10,
              }}
            >
              The Full Story
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "0.95rem",
                color: "rgba(251,249,244,0.3)",
                lineHeight: 1.75,
              }}
            >
              We're sitting down with the founder soon.
              Some stories deserve to be told right.
            </div>
          </div>

          {/* Footer line */}
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "rgba(251,249,244,0.2)",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Shorty's Diner · Est. 1980 · Williamsburg, VA
          </div>
        </div>
      </div>

      {/* BWChecker at very bottom */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <BWChecker />
      </div>
    </div>
  );
}
