import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";

export default function LocationMap({ location }) {
  const displayCity = location.name || location.city;
  const displayCityState = location.cityState || location.city;

  const q = encodeURIComponent(`${location.address}, ${displayCityState}`);
  const src = `https://www.google.com/maps?q=${q}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  const telHref = `tel:${(location.phone || "").replace(/[^0-9]/g, "")}`;

  return (
    <section
      style={{
        background: C.cream,
        padding: "60px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* EYEBROW */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: C.red,
              marginBottom: "6px",
            }}
          >
            FIND US
          </div>
          <h2
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              color: C.textDark,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {displayCity}
          </h2>
          <div
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "1rem",
              color: C.textMid,
              marginTop: "8px",
            }}
          >
            {location.address} · {displayCityState}
          </div>
        </div>

        {/* MAP IFRAME */}
        <div
          style={{
            marginTop: "24px",
            width: "100%",
            aspectRatio: "16 / 9",
            border: `1px solid ${C.border}`,
            borderRadius: "2px",
            overflow: "hidden",
            background: C.tan,
          }}
        >
          <iframe
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of Shorty's ${displayCity}`}
            allowFullScreen
          />
        </div>

        {/* BUTTON ROW */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: C.red,
              color: C.white,
              fontFamily: BODY_FONT,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "13px 24px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.redDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.red;
            }}
          >
            GET DIRECTIONS →
          </a>

          <a
            href={telHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              color: C.textDark,
              border: `1.5px solid ${C.textDark}`,
              fontFamily: BODY_FONT,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "11.5px 22px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.textDark;
              e.currentTarget.style.color = C.cream;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = C.textDark;
            }}
          >
            CALL {location.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
