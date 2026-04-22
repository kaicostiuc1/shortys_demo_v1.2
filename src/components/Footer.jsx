import { Link } from "react-router-dom";
import BWChecker from "./BWChecker.jsx";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";
import { LOCATIONS } from "../lib/locations.js";

const EXPLORE_LINKS = [
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Order", to: "/order" },
  { label: "Catering", to: "/catering" },
  { label: "Contact", to: "/contact" },
];

const eyebrowStyle = {
  fontFamily: BODY_FONT,
  fontSize: "11px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: C.textDark,
  marginBottom: "14px",
};

const linkStyle = {
  fontFamily: BODY_FONT,
  fontSize: "0.9rem",
  color: C.textMid,
  textDecoration: "none",
  display: "block",
  marginBottom: "6px",
  transition: "color 0.2s ease",
};

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      style={linkStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = C.red;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = C.textMid;
      }}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: C.cream }}>
      <BWChecker />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 32px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "40px 60px",
          color: C.textDark,
        }}
      >
        {/* COL 1 — BRAND */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.textDark}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
              <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
              <path d="m2.1 21.8 6.4-6.3" />
              <path d="m19 5-7 7" />
            </svg>
            <span
              style={{
                fontFamily: HEADING_FONT,
                fontSize: "1.7rem",
                fontWeight: 700,
                color: C.textDark,
                lineHeight: 1,
              }}
            >
              Shorty's
            </span>
          </div>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "0.9rem",
              color: C.textMid,
              marginTop: "10px",
              maxWidth: "240px",
              lineHeight: 1.5,
            }}
          >
            Classic American diner. Breakfast and lunch, served the way it used to be since 1980.
          </p>
        </div>

        {/* COL 2 — LOCATIONS */}
        <div>
          <div style={eyebrowStyle}>LOCATIONS</div>
          {Object.entries(LOCATIONS).map(([id, loc]) => {
            const name = loc.name || loc.city;
            const label = `${name}${loc.flagship ? " · Flagship" : ""}`;
            return (
              <FooterLink key={id} to={`/${id}`}>
                {label}
              </FooterLink>
            );
          })}
        </div>

        {/* COL 3 — EXPLORE */}
        <div>
          <div style={eyebrowStyle}>EXPLORE</div>
          {EXPLORE_LINKS.map((l) => (
            <FooterLink key={l.to} to={l.to}>
              {l.label}
            </FooterLink>
          ))}
        </div>

        {/* COL 4 — HOURS */}
        <div>
          <div style={eyebrowStyle}>HOURS</div>
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "0.9rem",
              color: C.textMid,
              fontWeight: 600,
            }}
          >
            Every day
          </div>
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "0.9rem",
              color: C.textMid,
              marginTop: "4px",
            }}
          >
            6 AM – 2 PM
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${C.border}`,
          marginTop: "20px",
          paddingTop: "20px",
          padding: "20px 32px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontFamily: BODY_FONT,
            fontSize: "0.75rem",
            color: C.textLight,
          }}
        >
          © {year} Shorty's Diner · Williamsburg, VA
        </span>
        <span
          style={{
            fontFamily: BODY_FONT,
            fontSize: "0.75rem",
            color: C.textLight,
          }}
        >
          Site by acme.
        </span>
      </div>
    </footer>
  );
}
