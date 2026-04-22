import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";
import { weeklySpecials } from "../lib/menuData.js";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function HoursSpecialsBand() {
  const today = new Date().getDay();
  const isWeekend = today === 0 || today === 6;
  const targetDayName = isWeekend ? "Monday" : DAY_NAMES[today];

  const special = Array.isArray(weeklySpecials)
    ? weeklySpecials.find((s) => s && s.day === targetDayName)
    : null;

  const eyebrowText = `${isWeekend ? "NEXT UP" : "TODAY"} · ${targetDayName.toUpperCase()}`;

  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        borderTop: "1px solid rgba(225,29,72,0.25)",
        borderBottom: "1px solid rgba(225,29,72,0.25)",
        padding: "50px 24px",
        margin: "20px 0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {/* HOURS */}
        <div>
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: C.red,
              marginBottom: "8px",
              fontWeight: 700,
            }}
          >
            OPEN EVERY DAY
          </div>
          <div
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              color: C.cream,
              lineHeight: 1,
              margin: 0,
            }}
          >
            6 AM – 2 PM
          </div>
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "0.85rem",
              color: "rgba(251,249,244,0.5)",
              marginTop: "8px",
            }}
          >
            Breakfast served all day.
          </div>
        </div>

        {/* SPECIAL */}
        {special && (
          <div>
            <div
              style={{
                fontFamily: BODY_FONT,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: C.red,
                marginBottom: "8px",
                fontWeight: 700,
              }}
            >
              {eyebrowText}
            </div>
            <div
              style={{
                fontFamily: HEADING_FONT,
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: C.cream,
                lineHeight: 1,
                margin: 0,
              }}
            >
              {special.name}
            </div>
            {special.desc && (
              <div
                style={{
                  fontFamily: HERO_FONT,
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: "rgba(251,249,244,0.7)",
                  marginTop: "8px",
                  maxWidth: "400px",
                  lineHeight: 1.5,
                }}
              >
                {special.desc}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
