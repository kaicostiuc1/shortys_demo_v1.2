import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import BWChecker from "../components/BWChecker.jsx";
import LocationCard from "../components/LocationCard.jsx";
import ReviewsStrip from "../components/ReviewsStrip.jsx";
import HoursSpecialsBand from "../components/HoursSpecialsBand.jsx";
import { C, DARK_BG, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";
import { LOCATIONS } from "../lib/locations.js";

const LOCATION_COORDS = {
  williamsburg: [37.2696, -76.6771],
  yorktown: [37.1960, -76.5100],
  richmond: [37.6080, -77.5200],
  stlouis: [38.6998, -90.4180],
};

function haversineMiles(lat1, lon1, lat2, lon2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const GRAIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>`;
const GRAIN_URI = `url("data:image/svg+xml;utf8,${encodeURIComponent(GRAIN_SVG)}")`;

export default function SplashPage() {
  const [nearestId, setNearestId] = useState(null);
  const [nearestDistance, setNearestDistance] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let bestId = null;
        let bestDist = Infinity;
        for (const [id, [lat, lon]] of Object.entries(LOCATION_COORDS)) {
          const d = haversineMiles(latitude, longitude, lat, lon);
          if (d < bestDist) {
            bestDist = d;
            bestId = id;
          }
        }
        if (bestId) {
          setNearestId(bestId);
          setNearestDistance(Math.round(bestDist));
        }
      },
      () => {}
    );
  }, []);

  const order = ["williamsburg", "yorktown", "richmond", "stlouis"];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: DARK_BG,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Layer A — grain */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: GRAIN_URI,
          opacity: 0.08,
          mixBlendMode: "overlay",
        }}
      />
      {/* Layer B — red ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 80% 20%, rgba(225,29,72,0.18) 0%, transparent 45%)",
        }}
      />

      <Navbar theme="dark" />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "140px",
          paddingBottom: "80px",
          paddingLeft: "24px",
          paddingRight: "24px",
          maxWidth: "720px",
          margin: "0 auto",
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontFamily: BODY_FONT,
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: C.red,
            border: "1px solid rgba(225,29,72,0.4)",
            borderRadius: "999px",
            padding: "4px 12px",
          }}
        >
          EST. 1980 · 4 LOCATIONS
        </div>
        <h1
          style={{
            fontFamily: HEADING_FONT,
            fontSize: "clamp(4rem, 9vw, 7rem)",
            color: C.cream,
            lineHeight: 0.95,
            marginTop: "18px",
            marginBottom: 0,
          }}
        >
          Shorty's
        </h1>
        <p
          style={{
            fontFamily: HERO_FONT,
            fontStyle: "italic",
            fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)",
            color: "rgba(251,249,244,0.75)",
            marginTop: "12px",
            marginBottom: 0,
            lineHeight: 1.4,
          }}
        >
          It's not fancy. It's not fat-free. It's just the way it used to be.
        </p>
        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(251,249,244,0.5)",
            marginTop: "24px",
          }}
        >
          CHOOSE A LOCATION BELOW ↓
        </div>
      </section>

      {/* LOCATION GRID */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1100px",
          margin: "0 auto",
          paddingLeft: "10vw",
          paddingRight: "10vw",
          paddingBottom: "120px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {order.map((id) => {
            const loc = LOCATIONS[id];
            if (!loc) return null;
            const isNearest = nearestId === id;
            return (
              <LocationCard
                key={id}
                location={loc}
                isNearest={isNearest}
                distance={isNearest ? nearestDistance : null}
              />
            );
          })}
        </div>
      </section>

      <ReviewsStrip />
      <HoursSpecialsBand />

      {/* About teaser — inline, dark-native */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "100px 24px 120px",
          maxWidth: 780,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: 11,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: C.red,
            marginBottom: 20,
          }}
        >
          SINCE 1980
        </div>
        <p
          style={{
            fontFamily: HERO_FONT,
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "rgba(251,249,244,0.9)",
            lineHeight: 1.35,
            margin: 0,
          }}
        >
          "A diner where a nineteen-year-old sits two booths from a retired couple, and the waitress knows both their orders."
        </p>
        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(251,249,244,0.5)",
            marginTop: 24,
          }}
        >
          FOUR LOCATIONS · ONE DINER
        </div>
        <Link
          to="/about"
          style={{
            display: "inline-block",
            marginTop: 36,
            fontFamily: BODY_FONT,
            fontSize: "0.85rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: C.cream,
            border: "1.5px solid rgba(251,249,244,0.4)",
            borderRadius: 2,
            padding: "13px 24px",
            textDecoration: "none",
            transition: "background 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.cream;
            e.currentTarget.style.color = C.textDark;
            e.currentTarget.style.borderColor = C.cream;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = C.cream;
            e.currentTarget.style.borderColor = "rgba(251,249,244,0.4)";
          }}
        >
          OUR STORY →
        </Link>
      </section>

      <div style={{ marginTop: "auto", position: "relative", zIndex: 2 }}>
        <BWChecker />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: DARK_BG,
          padding: "30px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
          borderTop: "1px solid rgba(251,249,244,0.05)",
        }}
      >
        <span
          style={{
            fontFamily: BODY_FONT,
            fontSize: "0.75rem",
            color: "rgba(251,249,244,0.4)",
          }}
        >
          © {new Date().getFullYear()} Shorty's Diner · Since 1980
        </span>
        <a
          href="https://instagram.com/shortysdiner"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: BODY_FONT,
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: C.red,
            textDecoration: "none",
          }}
        >
          @shortysdiner →
        </a>
      </div>
    </div>
  );
}
