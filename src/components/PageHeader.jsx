import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section
      style={{
        background: C.cream,
        color: C.textDark,
        paddingTop: "120px",
        paddingBottom: "50px",
        paddingLeft: "24px",
        paddingRight: "24px",
        maxWidth: "1100px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: BODY_FONT,
          fontSize: "11px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: C.red,
          marginBottom: "14px",
        }}
      >
        {eyebrow}
      </div>
      <h1
        style={{
          fontFamily: HEADING_FONT,
          fontSize: "clamp(3.2rem, 7vw, 5.4rem)",
          color: C.textDark,
          lineHeight: 0.95,
          margin: 0,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: HERO_FONT,
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
            color: C.textMid,
            marginTop: "16px",
            marginBottom: 0,
            maxWidth: "620px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      )}
    </section>
  );
}
