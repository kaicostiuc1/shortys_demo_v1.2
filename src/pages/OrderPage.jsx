import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Checker from "../components/Checker.jsx";
import Footer from "../components/Footer.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";
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

const ORDER = ["williamsburg", "yorktown", "richmond", "stlouis"];

function OrderCard({ id, isNearest, distance }) {
  const loc = LOCATIONS[id];
  const cityName = loc.name || loc.city;
  const cityState = loc.cityState || loc.city;
  const toastUrl = loc.toastUrl || loc.toastOrderUrl || "";
  const doordashUrl = loc.doordashUrl || "";

  let eyebrow = "";
  let eyebrowColor = C.textLight;
  if (isNearest) {
    eyebrow = `NEAREST TO YOU · ${distance} MI`;
    eyebrowColor = C.red;
  } else if (loc.flagship) {
    eyebrow = "THE ORIGINAL";
  } else if (loc.neighborhood) {
    eyebrow = loc.neighborhood.toUpperCase();
  }

  const idleBorder = isNearest ? C.red : C.border;

  return (
    <div
      style={{
        position: "relative",
        background: C.white,
        border: `1px solid ${idleBorder}`,
        borderRadius: "2px",
        padding: "24px 22px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transition: "border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.red;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = idleBorder;
      }}
    >
      {isNearest && (
        <div
          style={{
            position: "absolute",
            top: "-1px",
            right: "-1px",
            width: "6px",
            height: "6px",
            background: C.red,
          }}
        />
      )}

      <div>
        {eyebrow && (
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "10px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: eyebrowColor,
              marginBottom: "4px",
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            fontFamily: HEADING_FONT,
            fontSize: "1.8rem",
            color: C.textDark,
            lineHeight: 1,
          }}
        >
          {cityName}
        </div>
        <div
          style={{
            fontFamily: HERO_FONT,
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: C.textMid,
            marginTop: "8px",
          }}
        >
          {loc.address}
        </div>
        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: "0.85rem",
            color: C.textLight,
            marginTop: "2px",
          }}
        >
          {cityState}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 14,
        }}
      >
        {toastUrl ? (
          <a
            href={toastUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              boxSizing: "border-box",
              background: C.red,
              color: C.cream,
              fontFamily: BODY_FONT,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "13px 26px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.redDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.red;
            }}
          >
            ORDER PICKUP →
          </a>
        ) : (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              boxSizing: "border-box",
              background: "transparent",
              color: C.textLight,
              border: `1.5px solid ${C.textLight}`,
              fontFamily: BODY_FONT,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "13px 26px",
              borderRadius: "2px",
              opacity: 0.4,
              cursor: "not-allowed",
            }}
          >
            PICKUP COMING SOON
          </span>
        )}

        {doordashUrl ? (
          <a
            href={doordashUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              boxSizing: "border-box",
              background: C.textDark,
              color: C.cream,
              border: `1.5px solid ${C.textDark}`,
              fontFamily: BODY_FONT,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "13px 26px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            ORDER DELIVERY →
          </a>
        ) : (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              boxSizing: "border-box",
              background: "transparent",
              color: C.textLight,
              border: `1.5px solid ${C.textLight}`,
              fontFamily: BODY_FONT,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "13px 26px",
              borderRadius: "2px",
              opacity: 0.4,
              cursor: "not-allowed",
            }}
          >
            DELIVERY COMING SOON
          </span>
        )}
      </div>
    </div>
  );
}

export default function OrderPage() {
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

  return (
    <div style={{ background: C.cream, color: C.textDark, minHeight: "100vh" }}>
      <Navbar theme="light" />

      <PageHeader
        eyebrow="ORDER ONLINE"
        title="Pickup & Delivery"
        subtitle="Pick your location and we'll send you to the right menu."
      />

      <Checker />

      {/* LOCATION PICKER */}
      <section
        style={{
          background: C.cream,
          padding: "60px 24px 100px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {ORDER.map((id) => (
              <OrderCard
                key={id}
                id={id}
                isNearest={nearestId === id}
                distance={nearestId === id ? nearestDistance : null}
              />
            ))}
          </div>
        </div>
      </section>

      <Checker />

      {/* DELIVERY NOTE */}
      <section
        style={{
          background: C.tan,
          padding: "60px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: C.red,
              marginBottom: "10px",
              fontWeight: 800,
            }}
          >
            DELIVERY
          </div>
          <h2
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "2rem",
              color: C.textDark,
              marginTop: 0,
              marginBottom: "16px",
            }}
          >
            Pickup or Delivery
          </h2>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "1rem",
              color: C.textMid,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Order direct from the restaurant for pickup, or tap DoorDash for delivery across all four locations. Same menu, same kitchen.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
