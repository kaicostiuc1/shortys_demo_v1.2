import { useMemo } from "react";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";
import { REVIEWS } from "../data/reviews.js";

const STAR_PATH = "M12 2l2.4 7.4H22l-6.2 4.5L18.2 22 12 17.3 5.8 22l2.4-8.1L2 9.4h7.6z";

function Stars() {
  return (
    <div style={{ display: "flex", gap: "3px" }} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={C.red}>
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsStrip() {
  const picks = useMemo(
    () => [...REVIEWS].sort(() => Math.random() - 0.5).slice(0, 3),
    []
  );

  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        padding: "100px 24px 80px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <div
          style={{
            fontFamily: BODY_FONT,
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: C.red,
            marginBottom: "10px",
          }}
        >
          WHAT PEOPLE SAY
        </div>
        <h2
          style={{
            fontFamily: HERO_FONT,
            fontStyle: "italic",
            fontSize: "2.4rem",
            color: C.cream,
            lineHeight: 1.15,
            margin: 0,
            maxWidth: "680px",
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: 400,
          }}
        >
          Forty-five years of breakfasts later, folks still say it best.
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "28px",
        }}
      >
        {picks.map((review, i) => (
          <div
            key={`${review.name}-${i}`}
            style={{
              background: "transparent",
              border: "1px solid rgba(251,249,244,0.1)",
              borderRadius: "2px",
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <Stars />
            <p
              style={{
                fontFamily: HERO_FONT,
                fontStyle: "italic",
                fontSize: "1rem",
                color: "rgba(251,249,244,0.85)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {`"${review.text}"`}
            </p>
            <p
              style={{
                fontFamily: HEADING_FONT,
                fontSize: "1.1rem",
                color: C.cream,
                lineHeight: 1,
                margin: 0,
              }}
            >
              {review.name}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          fontFamily: BODY_FONT,
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "rgba(251,249,244,0.35)",
        }}
      >
        VERIFIED REVIEWS · VIA GOOGLE
      </div>
    </section>
  );
}
