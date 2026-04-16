import { useState, useEffect } from "react";

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
    cta: "Visit Location →",
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
    href: "https://order.toasttab.com/online/shortys-diner-yorktown-6500-george-washington-memorial-highway",
    external: true,
    cta: "Order Online →",
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
    href: "https://shortysdinerbroad.toast.site/order/shortys-diner-rva-5625-west-broad-street",
    external: true,
    cta: "Order Online →",
    lat: 37.5849,
    lng: -77.5082,
  },
  {
    id: "stlouis",
    city: "St. Louis",
    label: "Coming Soon",
    address: null,
    cityState: "St. Louis, MO",
    phone: null,
    href: null,
    external: false,
    cta: null,
    lat: 38.627,
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
  @keyframes kenBurns {
    from { transform: scale(1.0); }
    to   { transform: scale(1.08); }
  }
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

export default function SplashPage() {
  const [nearestId, setNearestId] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
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
        backgroundColor: "#0a0705",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{CSS}</style>

      {/* Ken Burns background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/van-hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "kenBurns 20s linear forwards",
          transformOrigin: "center center",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.52)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "72px 20px 60px",
          textAlign: "center",
        }}
      >
        {/* Wordmark */}
        <h1
          style={{
            fontFamily: "'Boogaloo', cursive",
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            color: C.cream,
            margin: 0,
            lineHeight: 1,
            letterSpacing: "0.02em",
            textShadow: `0 0 40px ${C.red}bb, 0 0 80px ${C.red}55`,
            animation: "fadeIn 1s ease forwards",
            opacity: 0,
          }}
        >
          Shorty's Diner
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
            color: "rgba(251,249,244,0.82)",
            marginTop: 18,
            marginBottom: 52,
            maxWidth: 560,
            lineHeight: 1.6,
            animation: "fadeIn 1s ease 0.3s forwards",
            opacity: 0,
          }}
        >
          "It's not Fancy. It's not Fat Free. It's Just the Way It Used to Be."
        </p>

        {/* Location cards */}
        <div className="splash-grid">
          {LOCS.map((loc, i) => {
            const isNearest = nearestId === loc.id;
            return (
              <div
                key={loc.id}
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
                {/* Nearest badge */}
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

                {/* City name */}
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

                {/* Label */}
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

                {/* Address */}
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

                {/* Phone */}
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

                {/* CTA or coming soon */}
                {loc.cta ? (
                  <a
                    href={loc.href}
                    target={loc.external ? "_blank" : undefined}
                    rel={loc.external ? "noopener noreferrer" : undefined}
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
                    {loc.cta}
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
          })}
        </div>
      </div>

      {/* BWChecker at the very bottom */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <BWChecker />
      </div>
    </div>
  );
}
