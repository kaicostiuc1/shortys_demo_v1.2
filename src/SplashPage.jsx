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
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
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
  @keyframes tickerScroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
`;

function Checker() {
  return (
    <div style={{ display: "flex", width: "100%", height: "14px", overflow: "hidden" }} aria-hidden="true">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} style={{ flex: "1 0 14px", height: "14px", background: i % 2 === 0 ? C.red : C.white }} />
      ))}
    </div>
  );
}

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
        textAlign: "center",
        animation: `fadeUp 0.6s ease ${0.5 + i * 0.1}s forwards`,
        opacity: 0,
      }}
    >
      {isNearest && (
        <div
          style={{
            position: "absolute",
            top: -11,
            left: "50%",
            transform: "translateX(-50%)",
            background: C.red,
            color: C.white,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 4,
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

const allPosts = [
  { id: "C4s3zmiuGYj", caption: "French toast done right. Come see us." },
  { id: "C3iNfyFsT20", caption: "Hot Turkey Monday is back. Come hungry." },
  { id: "DDUbweBNCFh", caption: "We know where our food comes from. Always have." },
  { id: "DEAMY_btJKG", caption: "The crew that makes it happen every morning." },
  { id: "C1SVbKwvs0u", caption: "Mr. & Mrs. Short. Est. 1980. The originals." },
  { id: "DCGVSARNr9G", caption: "Community table. Always has been." },
];

const tickerDays = [
  "Hot Turkey Monday",
  "Tony's Tuesday Special",
  "Fried Chicken Livers Wednesday",
  "Meatloaf Thursday",
  "Southern Fried Catfish Friday",
];

export default function SplashPage() {
  const [locationState, setLocationState] = useState("idle");
  const [nearestId, setNearestId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);

  const allReviews = [
    { name: "Fitz D", stars: 5, text: "The food came out in less than a cup of coffee." },
    { name: "Bnes Dad", stars: 5, text: "French toast I didn't get a pic of because I ate it too fast." },
    { name: "HawkeyeHawkins1", stars: 5, text: "Old school pancakes with a little bit of a crispy edge, just how pancakes should be. Perfect." },
    { name: "Winter S.", stars: 5, text: "My kids said if they could leave more than 5 stars they would." },
    { name: "Michael J.", stars: 5, text: "I wished I had been going here every morning during my vacation." },
    { name: "Christopher S.", stars: 5, text: "Exactly the kind of spot you hope to find on a trip." },
    { name: "JF Roth", stars: 5, text: "11 years ago we started coming here and are delighted each time." },
    { name: "Daniel S.", stars: 5, text: "The atmosphere here is just amazing. Best place for breakfast in Williamsburg." },
    { name: "Trevs_onit", stars: 5, text: "Bring your appetite. Shorty's Diner is amazing. Simply put." },
    { name: "Casey R.", stars: 5, text: "Shorty himself even came out to talk to us!" },
  ];
  const [selectedReviews, setSelectedReviews] = useState([]);

  useEffect(() => {
    const shuffled = [...allPosts].sort(() => Math.random() - 0.5);
    setSelectedPosts(shuffled.slice(0, 2));
  }, []);

  useEffect(() => {
    if (selectedPosts.length === 0) return;
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const script = document.createElement("script");
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (window.instgrm) window.instgrm.Embeds.process();
    };
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [selectedPosts]);

  useEffect(() => {
    const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
    setSelectedReviews(shuffled.slice(0, 3));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          opacity: 0.055,
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
            "radial-gradient(ellipse 85% 50% at 50% 18%, rgba(225,29,72,0.13) 0%, transparent 70%)",
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
                background: hoveredNav === label ? "rgba(225,29,72,0.12)" : "transparent",
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

      {/* Gradient transition band */}
      <div style={{ position: "relative", zIndex: 2, height: 80, background: "linear-gradient(to bottom, #0d0804 0%, #1a0a06 40%, #FBF9F4 100%)" }} />

      {/* Numbers band */}
      <div style={{ position: "relative", zIndex: 2, background: C.cream, padding: "48px 24px 40px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { value: "1980", label: "Est." },
            { value: "4", label: "Locations" },
            { value: "6am", label: "Every day" },
            { value: "One", label: "Way of doing it" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ fontFamily: "'Boogaloo', cursive", fontSize: 38, color: C.red, lineHeight: 1 }}>{item.value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textLight, marginTop: 6 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Specials ticker */}
      <div style={{ position: "relative", zIndex: 2, background: C.red, padding: "13px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", width: "max-content", whiteSpace: "nowrap", animation: "tickerScroll 28s linear infinite" }}>
          {[...tickerDays, ...tickerDays].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "white", padding: "0 32px" }}>{item}</span>
              <span style={{ display: "inline-block", width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.5)", flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>

      {/* Quote + Reviews */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: C.cream,
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr",
          minHeight: "calc(100vh - 88px - 42px)",
          width: "100%",
        }}
      >
        {/* Left column — quote */}
        <div
          style={{
            padding: "56px 48px 56px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 80,
              color: C.red,
              opacity: 0.35,
              lineHeight: 0.6,
              display: "block",
              marginBottom: 20,
            }}
          >
            "
          </span>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: 22,
              color: C.textDark,
              lineHeight: 1.55,
              margin: "0 0 28px",
            }}
          >
            It's not fancy. It's not fat-free. It's just the way it used to be.
          </p>
          <div style={{ width: 40, height: 2, background: C.red }} />
        </div>

        {/* Center divider */}
        <div style={{ margin: "32px 0", background: C.border }} />

        {/* Right column — reviews */}
        <div
          style={{
            padding: "40px 48px 40px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.red,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            From Google Reviews
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          <div>
            {selectedReviews.map((review, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 0",
                  borderBottom: i < selectedReviews.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontFamily: "'Boogaloo', cursive", fontSize: 18, color: C.textDark }}>
                    {review.name}
                  </span>
                  <span>
                    {Array.from({ length: review.stars }).map((_, si) => (
                      <span
                        key={si}
                        style={{
                          display: "inline-block",
                          width: 11,
                          height: 11,
                          background: C.red,
                          clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                          marginRight: 2,
                        }}
                      />
                    ))}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: C.textMid,
                    lineHeight: 1.55,
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  {review.text}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: C.textLight,
              }}
            >
              Verified Google Reviews · Williamsburg, VA
            </span>
          </div>
        </div>
      </div>

      {/* Instagram section */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Checker />
      </div>
      <div style={{ position: "relative", zIndex: 2, background: C.cream, padding: "56px 24px 60px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 40 }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="36" height="36" rx="12" stroke="#2c1810" strokeWidth="2.5" fill="none" />
            <circle cx="24" cy="24" r="9" stroke="#2c1810" strokeWidth="2.5" fill="none" />
            <circle cx="35.5" cy="12.5" r="2" fill="#2c1810" />
          </svg>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: C.textDark }}>@shortysdiner</span>
            <button
              onClick={() => window.open("https://www.instagram.com/shortysdiner/", "_blank")}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.red, border: `1.5px solid ${C.red}`, padding: "5px 14px", borderRadius: 2, background: "transparent", cursor: "pointer" }}
            >
              Follow
            </button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 640, margin: "0 auto 32px" }}>
          {selectedPosts.map((post) => (
            <div key={post.id} style={{ background: "white", borderRadius: 3, boxShadow: `0 0 0 3px #e11d48, 0 0 0 7px ${C.cream}`, overflow: "hidden" }}>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={`https://www.instagram.com/p/${post.id}/`}
                data-instgrm-version="14"
                style={{ minWidth: 326, width: "100%" }}
              />
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => window.open("https://www.instagram.com/shortysdiner/", "_blank")}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textDark, border: `1.5px solid ${C.border}`, padding: "11px 28px", borderRadius: 2, background: "transparent", cursor: "pointer" }}
          >
            See more on Instagram →
          </button>
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <BWChecker />
      </div>
    </div>
  );
}
