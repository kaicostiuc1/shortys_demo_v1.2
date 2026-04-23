import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Checker from "../components/Checker.jsx";
import Footer from "../components/Footer.jsx";
import LocationMap from "../components/LocationMap.jsx";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";

const eyebrowStyle = {
  fontFamily: BODY_FONT,
  fontSize: "11px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: C.red,
  marginBottom: "12px",
};

export default function LocationPage({ location }) {
  const displayCity = location.name || location.city;
  const displayCityState = location.cityState || location.city;
  const toastUrl = location.toastUrl || location.toastOrderUrl || "";
  const telHref = `tel:${(location.phone || "").replace(/[^0-9]/g, "")}`;

  return (
    <div style={{ background: C.cream, color: C.textDark, minHeight: "100vh" }}>
      <Navbar theme="light" />

      {/* HERO */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "60px",
          paddingLeft: "24px",
          paddingRight: "24px",
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {location.flagship && (
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.white,
              background: C.red,
              padding: "4px 14px",
              borderRadius: "999px",
              display: "inline-block",
              marginBottom: "16px",
            }}
          >
            THE ORIGINAL · EST. 1980
          </div>
        )}

        <h1
          style={{
            fontFamily: HEADING_FONT,
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            color: C.textDark,
            lineHeight: 0.95,
            margin: 0,
          }}
        >
          {displayCity}
        </h1>

        {location.neighborhood && (
          <div
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: C.textMid,
              marginTop: "10px",
            }}
          >
            {location.neighborhood}
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: C.textMid,
            }}
          >
            {location.address}
          </div>
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "0.9rem",
              color: C.textLight,
              marginTop: "2px",
            }}
          >
            {displayCityState}
          </div>
        </div>

        {/* CTA ROW */}
        <div
          style={{
            marginTop: "36px",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
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
                gap: "8px",
                background: C.red,
                color: C.white,
                fontFamily: BODY_FONT,
                fontSize: "0.85rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                padding: "14px 26px",
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
              ORDER FOR PICKUP →
            </a>
          ) : (
            <span
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
                padding: "14px 26px",
                borderRadius: "2px",
                opacity: 0.4,
                cursor: "not-allowed",
              }}
            >
              ORDERING SOON
            </span>
          )}

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
              padding: "12.5px 24px",
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
      </section>

      <Checker />

      {/* INFO GRID */}
      <section
        style={{
          background: C.cream,
          padding: "60px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "40px",
            textAlign: "left",
          }}
        >
          {/* CELL 1 — HOURS */}
          <div>
            <div style={eyebrowStyle}>HOURS</div>
            <div
              style={{
                fontFamily: HEADING_FONT,
                fontSize: "1.8rem",
                color: C.textDark,
                lineHeight: 1.2,
                marginBottom: "6px",
              }}
            >
              Every day
            </div>
            <div
              style={{
                fontFamily: HERO_FONT,
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: C.textMid,
              }}
            >
              6 AM – 2 PM
            </div>
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: "0.85rem",
                color: C.textLight,
                marginTop: "8px",
              }}
            >
              Breakfast served all day.
            </div>
          </div>

          {/* CELL 2 — CONTACT */}
          <div>
            <div style={eyebrowStyle}>CONTACT</div>
            <div
              style={{
                fontFamily: HEADING_FONT,
                fontSize: "1.8rem",
                color: C.textDark,
                lineHeight: 1.2,
                marginBottom: "6px",
              }}
            >
              Call us
            </div>
            <div
              style={{
                fontFamily: HERO_FONT,
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: C.textMid,
              }}
            >
              {location.phone}
            </div>
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: "0.85rem",
                color: C.textLight,
                marginTop: "8px",
              }}
            >
              Call ahead for large groups.
            </div>
          </div>
        </div>
      </section>

      <Checker />

      <LocationMap location={location} />

      <Checker />

      {/* ABOUT TEASER */}
      <section
        style={{
          background: C.tan,
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: C.red,
              marginBottom: "12px",
              fontWeight: 700,
            }}
          >
            SINCE 1980
          </div>
          <h2
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "2.6rem",
              color: C.textDark,
              lineHeight: 1.1,
              marginBottom: "16px",
              marginTop: 0,
            }}
          >
            Four locations. One diner.
          </h2>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: C.textMid,
              lineHeight: 1.6,
              marginBottom: "28px",
              marginTop: 0,
            }}
          >
            Same griddle, same worn counter, same coffee that's been poured a thousand times before yours. Shorty's has been feeding families, students, and travelers for 45 years.
          </p>
          <Link
            to="/about"
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
              padding: "12.5px 24px",
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
            OUR STORY →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
