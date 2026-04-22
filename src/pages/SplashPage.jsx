import { C, DARK_BG, HEADING_FONT } from "../lib/brand.js";

export default function SplashPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: DARK_BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontFamily: HEADING_FONT,
          color: C.cream,
          fontSize: "clamp(4rem, 10vw, 8rem)",
          margin: 0,
          lineHeight: 1,
        }}
      >
        Shorty's
      </h1>
    </div>
  );
}
