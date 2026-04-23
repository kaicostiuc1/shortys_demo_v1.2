import Navbar from "../components/Navbar.jsx";
import Checker from "../components/Checker.jsx";
import Footer from "../components/Footer.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";
import { LOCATIONS } from "../lib/locations.js";

const ORDER = ["williamsburg", "yorktown", "richmond", "stlouis"];

function PhoneLine({ label, number }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: BODY_FONT,
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: C.textLight,
          marginBottom: "4px",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: HERO_FONT,
          fontStyle: "italic",
          fontSize: "1.2rem",
          color: C.textDark,
        }}
      >
        {number}
      </div>
    </div>
  );
}

function LocationContactCard({ id }) {
  const loc = LOCATIONS[id];
  const cityName = loc.name || loc.city;
  const cityState = loc.cityState || loc.city;
  const phoneClean = (loc.phone || "").replace(/[^0-9]/g, "");

  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: "2px",
        padding: "24px 22px",
        background: C.white,
      }}
    >
      {loc.flagship && (
        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: "10px",
            textTransform: "uppercase",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: C.white,
            background: C.red,
            padding: "3px 10px",
            borderRadius: "999px",
            display: "inline-block",
            marginBottom: "10px",
          }}
        >
          FLAGSHIP
        </div>
      )}
      <div
        style={{
          fontFamily: HEADING_FONT,
          fontSize: "1.6rem",
          color: C.textDark,
          marginBottom: "6px",
          lineHeight: 1.1,
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
      <div
        style={{
          borderTop: `1px solid ${C.border}`,
          marginTop: "14px",
          paddingTop: "14px",
        }}
      >
        <a
          href={`tel:${phoneClean}`}
          style={{
            fontFamily: BODY_FONT,
            fontSize: "1rem",
            fontWeight: 700,
            color: C.red,
            textDecoration: "none",
          }}
        >
          {loc.phone}
        </a>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div style={{ background: C.cream, color: C.textDark, minHeight: "100vh" }}>
      <Navbar theme="light" />

      <PageHeader
        eyebrow="GET IN TOUCH"
        title="Say Hello"
        subtitle="Call us, email us, or stop by. We're around."
      />

      <Checker />

      {/* CONTACT GRID */}
      <section
        style={{
          background: C.cream,
          padding: "60px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* GENERAL CONTACT */}
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: C.red,
                marginBottom: "8px",
                fontWeight: 800,
              }}
            >
              CATERING & EVENTS
            </div>
            <h2
              style={{
                fontFamily: HEADING_FONT,
                fontSize: "2rem",
                color: C.textDark,
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              Large orders & group bookings
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                flexWrap: "wrap",
              }}
            >
              <PhoneLine label="WILLIAMSBURG" number="(757) 603-6674" />
              <PhoneLine label="RICHMOND" number="(804) 525-5627" />
            </div>
            <div style={{ marginTop: "24px" }}>
              <a
                href="mailto:catering@shortysdiner.com"
                style={{
                  fontFamily: BODY_FONT,
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: C.red,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = C.redDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = C.red;
                }}
              >
                CATERING@SHORTYSDINER.COM →
              </a>
            </div>
          </div>

          {/* LOCATION DIRECTORY */}
          <div>
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: C.red,
                marginBottom: "8px",
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              BY LOCATION
            </div>
            <h2
              style={{
                fontFamily: HEADING_FONT,
                fontSize: "2rem",
                color: C.textDark,
                textAlign: "center",
                marginTop: 0,
                marginBottom: "40px",
              }}
            >
              Give us a ring
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "30px",
              }}
            >
              {ORDER.map((id) => (
                <LocationContactCard key={id} id={id} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
