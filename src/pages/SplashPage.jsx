import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar.jsx";
import BWChecker from "../components/BWChecker.jsx";
import LocationCard from "../components/LocationCard.jsx";
import ReviewsStrip from "../components/ReviewsStrip.jsx";
import HoursSpecialsBand from "../components/HoursSpecialsBand.jsx";
import SplashFooter from "../components/SplashFooter.jsx";
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
  const [locationsRevealed, setLocationsRevealed] = useState(false);
  const hoursRef = useRef(null);
  const locationGridRef = useRef(null);

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
          paddingTop: "90px",
          paddingBottom: "36px",
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
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Shorty's
        </h1>
        <img
          src="/shortys-logo.png"
          alt="Shorty's"
          style={{
            display: "block",
            marginTop: 14,
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "min(400px, 58vw)",
            width: "100%",
            height: "auto",
            userSelect: "none",
          }}
          draggable={false}
        />
        <p
          style={{
            fontFamily: HERO_FONT,
            fontStyle: "italic",
            fontSize: "clamp(1.05rem, 1.9vw, 1.3rem)",
            color: "rgba(251,249,244,0.75)",
            marginTop: "28px",
            marginBottom: 0,
            lineHeight: 1.4,
          }}
        >
          It's not fancy. It's not fat-free. It's just the way it used to be.
        </p>
        {!locationsRevealed && (
          <button
            onClick={() => {
              setLocationsRevealed(true);
              setTimeout(() => {
                locationGridRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 80);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 24,
              background: "transparent",
              color: C.cream,
              border: "1.5px solid rgba(251,249,244,0.35)",
              borderRadius: 2,
              padding: "13px 26px",
              fontFamily: BODY_FONT,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              cursor: "pointer",
              transition:
                "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.cream;
              e.currentTarget.style.color = C.textDark;
              e.currentTarget.style.borderColor = C.cream;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = C.cream;
              e.currentTarget.style.borderColor = "rgba(251,249,244,0.35)";
            }}
          >
            SHOW LOCATIONS
            <span style={{ fontSize: "0.9em", lineHeight: 1 }}>↓</span>
          </button>
        )}
      </section>

      {/* LOCATION GRID — revealed on click */}
      <div
        ref={locationGridRef}
        style={{
          maxHeight: locationsRevealed ? "2000px" : "0",
          opacity: locationsRevealed ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s ease, opacity 0.35s ease 0.1s",
          position: "relative",
          zIndex: 2,
          scrollMarginTop: 360,
        }}
      >
        <section
          style={{
            position: "relative",
            maxWidth: "1100px",
            margin: "0 auto",
            paddingLeft: "10vw",
            paddingRight: "10vw",
            paddingTop: 20,
            paddingBottom: 80,
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

          <button
            onClick={() => {
              if (hoursRef.current) {
                hoursRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
            aria-label="Scroll to hours and today's special"
            style={{
              position: "absolute",
              // aligns button left edge with navbar logo left edge
              // (viewport x = 32, compensating for section paddingLeft)
              left: "calc(32px - 10vw)",
              bottom: 32,
              background: C.red,
              color: C.cream,
              border: "none",
              width: 44,
              height: 44,
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(225,29,72,0.4)",
              transition:
                "background 0.2s ease, transform 0.2s ease, opacity 0.4s ease 0.3s",
              padding: 0,
              lineHeight: 1,
              opacity: locationsRevealed ? 1 : 0,
              pointerEvents: locationsRevealed ? "auto" : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.redDark;
              e.currentTarget.style.transform = "translateY(2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.red;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </button>
        </section>
      </div>

      <div ref={hoursRef}>
        <HoursSpecialsBand />
      </div>
      <ReviewsStrip />

      <BWChecker />

      <SplashFooter />
    </div>
  );
}
