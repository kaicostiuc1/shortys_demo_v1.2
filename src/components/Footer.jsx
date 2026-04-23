import { Link } from "react-router-dom";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";
import { LOCATIONS } from "../lib/locations.js";
import BWChecker from "./BWChecker.jsx";

const EXPLORE_LINKS = [
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Order", to: "/order" },
  { label: "Events", to: "/events" },
  { label: "Catering", to: "/catering" },
  { label: "Contact", to: "/contact" },
];

const columnHeadingStyle = {
  fontFamily: BODY_FONT,
  fontSize: "11px",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: C.textDark,
  marginBottom: "16px",
};

const columnLinkStyle = {
  fontFamily: BODY_FONT,
  fontSize: "0.9rem",
  color: C.textMid,
  textDecoration: "none",
  display: "block",
  lineHeight: 2,
  transition: "color 0.2s ease",
};

const externalLinkStyle = {
  fontFamily: BODY_FONT,
  fontSize: "0.75rem",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  color: C.red,
  textDecoration: "none",
  transition: "color 0.2s ease",
};

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      style={columnLinkStyle}
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
    <footer>
      <BWChecker />

      {/* MAIN SECTION */}
      <div
        style={{
          background: C.cream,
          color: C.textDark,
          padding: "70px 24px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "50px 60px",
          }}
        >
          {/* COL 1 — BRAND */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.textDark}
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
                fontSize: "0.95rem",
                color: C.textMid,
                marginTop: "14px",
                marginBottom: 0,
                maxWidth: "260px",
                lineHeight: 1.5,
              }}
            >
              Classic American diner. Breakfast and lunch, served the way it used to be since 1980.
            </p>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <a
                href="https://instagram.com/shortysdiner"
                target="_blank"
                rel="noopener noreferrer"
                style={externalLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = C.redDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = C.red;
                }}
              >
                Instagram
              </a>
              {/* TODO: GBP URL */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                style={externalLinkStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = C.redDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = C.red;
                }}
              >
                Google
              </a>
            </div>
          </div>

          {/* COL 2 — LOCATIONS */}
          <div>
            <div style={columnHeadingStyle}>LOCATIONS</div>
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
            <div style={columnHeadingStyle}>EXPLORE</div>
            {EXPLORE_LINKS.map((l) => (
              <FooterLink key={l.to} to={l.to}>
                {l.label}
              </FooterLink>
            ))}
          </div>

          {/* COL 4 — HOURS & LOCATIONS */}
          <div>
            <div style={columnHeadingStyle}>HOURS</div>
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: "0.9rem",
                color: C.textDark,
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              Every day
            </div>
            <div
              style={{
                fontFamily: HERO_FONT,
                fontStyle: "italic",
                fontSize: "1rem",
                color: C.textMid,
                marginTop: "2px",
              }}
            >
              6 AM – 2 PM
            </div>
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: "0.8rem",
                color: C.textLight,
                marginTop: "6px",
              }}
            >
              Breakfast served all day.
            </div>

            <div style={{ ...columnHeadingStyle, marginTop: "24px" }}>
              LOCATIONS
            </div>
            {["williamsburg", "yorktown", "richmond", "stlouis"].map((id) => {
              const loc = LOCATIONS[id];
              if (!loc) return null;
              const cityLabel = loc.name || loc.city;
              return (
                <div
                  key={id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    lineHeight: 1.8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: BODY_FONT,
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: C.textDark,
                    }}
                  >
                    {cityLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: BODY_FONT,
                      fontSize: "0.85rem",
                      color: C.textMid,
                    }}
                  >
                    {loc.phone}
                  </span>
                </div>
              );
            })}
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: "0.75rem",
                fontStyle: "italic",
                color: C.textLight,
                lineHeight: 1.5,
                marginTop: "16px",
              }}
            >
              Catering: Williamsburg (757) 603-6674 · Richmond (804) 525-5627
            </div>
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: "0.75rem",
                fontStyle: "italic",
                color: C.textLight,
                lineHeight: 1.5,
              }}
            >
              Email: catering@shortysdiner.com
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        style={{
          background: C.cream,
          borderTop: `1px solid ${C.border}`,
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
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
              color: C.textLight,
              letterSpacing: "0.05em",
            }}
          >
            © {year} SHORTY'S DINER · ALL RIGHTS RESERVED
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: HERO_FONT,
                fontStyle: "italic",
                fontSize: "0.8rem",
                color: C.textLight,
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
      </div>
    </footer>
  );
}
