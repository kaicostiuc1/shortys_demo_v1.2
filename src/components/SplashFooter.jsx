import { Link } from "react-router-dom";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";
import { LOCATIONS } from "../lib/locations.js";

const MORE_LINKS = [
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Order", to: "/order" },
  { label: "Catering", to: "/catering" },
];

const LOCATION_ORDER = ["williamsburg", "yorktown", "richmond", "stlouis"];

const columnHeadingStyle = {
  fontFamily: BODY_FONT,
  fontSize: "10px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "rgba(251,249,244,0.4)",
  marginBottom: "14px",
};

const columnLinkStyle = {
  fontFamily: BODY_FONT,
  fontSize: "0.9rem",
  color: C.cream,
  lineHeight: 1.8,
  textDecoration: "none",
  display: "block",
  transition: "color 0.2s ease",
};

function DarkFooterLink({ to, children }) {
  return (
    <Link
      to={to}
      style={columnLinkStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = C.red;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = C.cream;
      }}
    >
      {children}
    </Link>
  );
}

export default function SplashFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "transparent",
        position: "relative",
        zIndex: 2,
        padding: "60px 24px 40px",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* TOP ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "40px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {/* LEFT BLOCK */}
        <div style={{ flex: 1, minWidth: "220px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke={C.cream}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
              <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
              <path d="m2.1 21.8 6.4-6.3" />
              <path d="m19 5-7 7" />
            </svg>
            <span
              style={{
                fontFamily: HEADING_FONT,
                fontSize: "1.9rem",
                fontWeight: 700,
                color: C.cream,
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
              fontSize: "1rem",
              color: "rgba(251,249,244,0.55)",
              marginTop: "14px",
              marginBottom: 0,
              maxWidth: "280px",
              lineHeight: 1.5,
            }}
          >
            It's not fancy. It's not fat-free. It's just the way it used to be.
          </p>
        </div>

        {/* RIGHT BLOCK */}
        <div
          style={{
            flex: 2,
            display: "flex",
            justifyContent: "flex-end",
            gap: "60px",
            flexWrap: "wrap",
          }}
        >
          {/* LOCATIONS */}
          <div>
            <div style={columnHeadingStyle}>LOCATIONS</div>
            {LOCATION_ORDER.map((id) => {
              const loc = LOCATIONS[id];
              if (!loc) return null;
              const label = loc.name || loc.city;
              return (
                <DarkFooterLink key={id} to={`/${id}`}>
                  {label}
                </DarkFooterLink>
              );
            })}
          </div>

          {/* MORE */}
          <div>
            <div style={columnHeadingStyle}>MORE</div>
            {MORE_LINKS.map((l) => (
              <DarkFooterLink key={l.to} to={l.to}>
                {l.label}
              </DarkFooterLink>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div
        style={{
          borderTop: "1px solid rgba(251,249,244,0.08)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: BODY_FONT,
            fontSize: "0.75rem",
            color: "rgba(251,249,244,0.35)",
            letterSpacing: "0.05em",
          }}
        >
          © {year} SHORTY'S DINER · EST. 1980
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "18px",
          }}
        >
          <span
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "0.8rem",
              color: "rgba(251,249,244,0.4)",
            }}
          >
            Site by
          </span>
          <Link
            to="/"
            style={{
              fontFamily: BODY_FONT,
              fontSize: "0.75rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: C.red,
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = C.redDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = C.red;
            }}
          >
            acme.
          </Link>
        </div>
      </div>
    </footer>
  );
}
