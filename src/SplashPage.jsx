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

const LOCS = [
  {
    id: "williamsburg",
    city: "Williamsburg",
    label: "The Original · Est. 1980",
    address: "627 Merrimac Trail",
    cityState: "Williamsburg, VA 23185",
    phone: "(757) 253-1080",
    href: "/williamsburg",
    external: false,
    lat: 37.2696,
    lng: -76.6771,
  },
  {
    id: "yorktown",
    city: "Yorktown",
    label: "Now Open",
    address: "6500 George Washington Memorial Hwy A",
    cityState: "Yorktown, VA 23692",
    phone: "(757) 867-8777",
    href: "/yorktown",
    external: false,
    lat: 37.1299,
    lng: -76.4772,
  },
  {
    id: "richmond",
    city: "Richmond",
    label: "Now Open",
    address: "5625 W Broad St",
    cityState: "Richmond, VA 23230",
    phone: "(804) 308-2070",
    href: "/richmond",
    external: false,
    lat: 37.5849,
    lng: -77.5082,
  },
  {
    id: "stlouis",
    city: "St. Louis",
    label: "Now Open",
    address: "12004 Lackland Rd",
    cityState: "St. Louis, MO 63146",
    phone: "",
    href: "/stlouis",
    external: false,
    lat: 38.6270,
    lng: -90.1994,
  },
];

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const CSS = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes badgePulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }
  .splash-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
    max-width: 800px;
  }
  @media (max-width: 639px) {
    .splash-grid { grid-template-columns: 1fr; }
  }
  .loc-card {
    transition: transform 0.2s ease;
  }
  .loc-card:hover {
    transform: translateY(-3px);
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

function LocationCard({ loc, isNearest, i }) {
  return (
    <div
      className="loc-card"
      style={{
        position: "relative",
        background: "#17100a",
        border: `1.5px solid ${isNearest ? C.red : "rgba(255,255,255,0.12)"}`,
        borderRadius: 8,
        padding: "24px 20px 20px",
        textAlign: "left",
        animation: `fadeUp 0.6s ease ${0.5 + i * 0.1}s forwards`,
        opacity: 0,
      }}
    >
      {isNearest && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: C.red,
            color: C.white,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 4,
            animation: "badgePulse 2s ease-in-out infinite",
          }}
        >
          Nearest to you
        </div>
      )}

      <div
        style={{
          fontFamily: "'Boogaloo', cursive",
          fontSize: "1.9rem",
          color: C.cream,
          lineHeight: 1.1,
          marginBottom: 4,
        }}
      >
        {loc.city}
      </div>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: C.red,
          marginBottom: 14,
        }}
      >
        {loc.label}
      </div>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.85rem",
          color: "rgba(251,249,244,0.7)",
          lineHeight: 1.5,
          marginBottom: loc.phone ? 4 : 16,
        }}
      >
        {loc.address ? (
          <>
            {loc.address}
            <br />
          </>
        ) : null}
        {loc.cityState}
      </div>

      {loc.phone && (
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            color: "rgba(251,249,244,0.55)",
            marginBottom: 18,
          }}
        >
          {loc.phone}
        </div>
      )}

      {loc.href ? (
        <a
          href={loc.href}
          style={{
            display: "inline-block",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: C.white,
            background: C.red,
            padding: "8px 16px",
            borderRadius: 4,
            textDecoration: "none",
          }}
        >
          Visit Location →
        </a>
      ) : (
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            color: "rgba(251,249,244,0.35)",
            fontStyle: "italic",
          }}
        >
          Order Online Coming Soon
        </div>
      )}
    </div>
  );
}

export default function SplashPage() {
  const [locationState, setLocationState] = useState("idle");
  const [nearestId, setNearestId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

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

      {/* Radial glow behind wordmark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 40% at 50% 20%, rgba(225,29,72,0.07) 0%, transparent 70%)",
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
          <span style={{ fontFamily: "'Boogaloo', cursive", fontSize: "1.4rem", color: "#e11d48", fontWeight: 700 }}>Shorty's</span>
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
                color: hoveredNav === label ? "#ffffff" : "rgba(251,249,244,0.85)",
                cursor: "pointer",
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
          alignItems: "center",
          padding: "72px 20px 60px",
          textAlign: "center",
        }}
      >
        {/* Hero */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px 24px 40px",
          }}
        >
          <img src="/shortys-logo.png" style={{ maxWidth: "460px", width: "88%", height: "auto" }} alt="Shorty's Diner" />
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "rgba(251,249,244,0.55)",
              marginTop: 20,
              marginBottom: 0,
            }}
          >
            "It's not Fancy. It's not Fat Free. It's Just the Way It Used to Be."
          </p>
          <button
            disabled={locationState === "loading"}
            onClick={() => {
              setLocationState("loading");
              navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                  let best = null;
                  let bestDist = Infinity;
                  for (const loc of LOCS) {
                    const d = haversine(latitude, longitude, loc.lat, loc.lng);
                    if (d < bestDist) {
                      bestDist = d;
                      best = loc.id;
                    }
                  }
                  setNearestId(best);
                  setLocationState("found");
                },
                () => {
                  setLocationState("denied");
                }
              );
            }}
            style={{
              fontFamily: "'Boogaloo', cursive",
              fontSize: "1.3rem",
              color: C.white,
              background: C.red,
              padding: "14px 36px",
              border: "none",
              borderRadius: 3,
              cursor: locationState === "loading" ? "default" : "pointer",
              marginTop: 24,
              opacity: locationState === "loading" ? 0.7 : 1,
            }}
          >
            {locationState === "loading" ? "Locating..." : "Find Your Nearest Location"}
          </button>
        </div>

        {/* Location cards — nearest only */}
        {locationState === "found" && !showAll && (
          <div id="locations-section" style={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
            <LocationCard
              loc={LOCS.find((l) => l.id === nearestId)}
              isNearest={true}
              i={0}
            />
            <button
              onClick={() => setShowAll(true)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "rgba(251,249,244,0.45)",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginTop: 20,
                display: "block",
                textAlign: "center",
                width: "100%",
              }}
            >
              View Other Locations ↓
            </button>
          </div>
        )}

        {/* Location cards — all */}
        {((locationState === "found" && showAll) || locationState === "denied") && (
          <div id="locations-section" className="splash-grid">
            {LOCS.map((loc, i) => (
              <LocationCard
                key={loc.id}
                loc={loc}
                isNearest={locationState === "found" && nearestId === loc.id}
                i={i}
              />
            ))}
          </div>
        )}
      </div>

      {/* BWChecker at the very bottom */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <BWChecker />
      </div>
    </div>
  );
}
