import { Link } from "react-router-dom";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";

const BORDER_IDLE = "rgba(251,249,244,0.1)";
const TEXT_MUTED = "rgba(251,249,244,0.5)";
const TEXT_SOFT = "rgba(251,249,244,0.7)";
const TEXT_PHONE = "rgba(251,249,244,0.6)";
const DIVIDER = "rgba(251,249,244,0.15)";

export default function LocationCard({ location, isNearest = false, distance = null }) {
  const route = `/${location.id}`;

  let overline = "";
  let overlineColor = TEXT_MUTED;
  if (isNearest) {
    overline = `NEAREST TO YOU · ${distance} MI`;
    overlineColor = C.red;
  } else if (location.flagship) {
    overline = "THE ORIGINAL";
  } else if (location.neighborhood) {
    overline = location.neighborhood.toUpperCase();
  }

  const cityName = location.name || location.city;
  const cityState = location.cityState || location.city;
  const address = location.address;
  const phone = location.phone;

  const borderColor = isNearest ? C.red : BORDER_IDLE;

  return (
    <Link
      to={route}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "transparent",
          border: `1px solid ${borderColor}`,
          borderRadius: "2px",
          padding: "26px 24px",
          textAlign: "left",
          transition: "border-color 0.25s ease, transform 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = C.red;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = borderColor;
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

        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: overlineColor,
            fontWeight: 700,
          }}
        >
          {overline || " "}
        </div>

        <div
          style={{
            fontFamily: HEADING_FONT,
            fontSize: "2.2rem",
            color: C.cream,
            lineHeight: 1,
            marginTop: "6px",
          }}
        >
          {cityName}
        </div>

        <div
          style={{
            fontFamily: HERO_FONT,
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: TEXT_SOFT,
            marginTop: "10px",
          }}
        >
          {address}
        </div>

        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: "0.85rem",
            color: TEXT_MUTED,
            marginTop: "2px",
          }}
        >
          {cityState}
        </div>

        <div
          style={{
            height: "1px",
            background: DIVIDER,
            marginTop: "18px",
            marginBottom: "14px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: BODY_FONT,
              fontSize: "0.8rem",
              color: TEXT_PHONE,
              letterSpacing: "0.05em",
            }}
          >
            {phone}
          </span>
          <span
            style={{
              fontFamily: BODY_FONT,
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: C.red,
            }}
          >
            VISIT →
          </span>
        </div>
      </div>
    </Link>
  );
}
