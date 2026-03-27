import { Navbar } from "./App";

const C = {
  cream: "#FBF9F4", red: "#e11d48", redDark: "#be123c", redLight: "#fef2f2",
  redFaint: "#e11d480a", tan: "#f2ede4", tanDark: "#e8e0d2",
  border: "#e0d8ca", textDark: "#2c1810", textMid: "#5c4a3a",
  textLight: "#8b7d6e", brownMuted: "#8b7355", white: "#ffffff",
};

export default function CateringPage() {
  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>
      <Navbar active={false} />
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "100vh", textAlign: "center",
        padding: "2rem 1.25rem",
      }}>
        <h1 style={{ fontFamily: "'Boogaloo', cursive", fontSize: "2.5rem", color: C.red, marginBottom: "1rem" }}>
          Catering &amp; Events
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: C.textMid }}>
          Details coming soon. Call us at (757) 253-1080.
        </p>
      </div>
    </div>
  );
}
