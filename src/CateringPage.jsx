import { UtensilsCrossed, Instagram, Facebook, Twitter, Wifi } from "lucide-react";

const C = {
  cream: "#FBF9F4", red: "#e11d48", redDark: "#be123c", redLight: "#fef2f2",
  redFaint: "#e11d480a", tan: "#f2ede4", tanDark: "#e8e0d2",
  border: "#e0d8ca", textDark: "#2c1810", textMid: "#5c4a3a",
  textLight: "#8b7d6e", brownMuted: "#8b7355", white: "#ffffff",
};

function CateringNav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(251,249,244,0.95)", backdropFilter: "blur(10px)",
      boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
    }} role="navigation" aria-label="Main navigation">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 1.25rem" }}>
        <a href="/" style={{
          fontFamily: "'Boogaloo', cursive", fontSize: "1.9rem", fontWeight: 700, color: C.red,
          textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem",
        }}>
          <UtensilsCrossed size={18} strokeWidth={2.5} /> Shorty's
        </a>
        <div style={{ display: "flex", gap: "1.1rem", alignItems: "center" }}>
          <a href="/catering" style={{
            color: C.red, textDecoration: "none", fontSize: "1rem", fontWeight: 800,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Catering
          </a>
          <a href="/#menu" style={{
            color: C.textMid, textDecoration: "none", fontSize: "1rem", fontWeight: 800,
            fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s",
          }}
            onMouseEnter={(e) => e.target.style.color = C.red}
            onMouseLeave={(e) => e.target.style.color = C.textMid}>
            Menu
          </a>
        </div>
      </div>
    </nav>
  );
}

function CateringFooter() {
  return (
    <footer style={{ background: C.tan }} role="contentinfo">
      <div style={{ padding: "3rem 1.25rem 1.25rem", maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.25rem", marginBottom: "2.25rem" }}>
          <div>
            <h3 style={{ fontFamily: "'Boogaloo',cursive", fontSize: "1.25rem", color: C.red, marginBottom: "0.75rem" }}>Find Us</h3>
            <p style={{ color: C.textMid, fontSize: "0.88rem", lineHeight: 1.5 }}>
              <strong style={{ color: C.textDark }}>Shorty's Diner</strong><br />
              627 Merrimac Trail<br />Williamsburg, VA 23185
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Boogaloo',cursive", fontSize: "1.25rem", color: C.red, marginBottom: "0.75rem" }}>Hours</h3>
            {[{ d: "Mon – Fri", h: "6 AM – 2 PM" }, { d: "Saturday", h: "7 AM – 3 PM" }, { d: "Sunday", h: "7 AM – 2 PM" }].map((r) => (
              <div key={r.d} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", paddingBottom: "0.4rem", marginBottom: "0.4rem", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.textLight }}>{r.d}</span>
                <span style={{ color: C.textDark, fontWeight: 600 }}>{r.h}</span>
              </div>
            ))}
            <div style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.4rem 0.75rem", background: "#fef3c7", border: "1.5px solid #fbbf2440", borderRadius: "7px", color: "#92400e", fontSize: "0.82rem", fontWeight: 600 }}>
              <Wifi size={14} /> Free WiFi — ask at the counter
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Boogaloo',cursive", fontSize: "1.25rem", color: C.red, marginBottom: "0.75rem" }}>Connect</h3>
            <p style={{ color: C.textLight, fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "0.85rem" }}>Daily specials, diner stories & the occasional pancake video.</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[{ i: <Instagram size={18} />, l: "Instagram" }, { i: <Facebook size={18} />, l: "Facebook" }, { i: <Twitter size={18} />, l: "Twitter" }].map((s) => (
                <a key={s.l} href="#" aria-label={`Shorty's on ${s.l}`} style={{
                  width: "40px", height: "40px", borderRadius: "8px", background: C.white,
                  border: `2px solid ${C.border}`, display: "flex", alignItems: "center",
                  justifyContent: "center", color: C.textLight, textDecoration: "none", transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.red; e.currentTarget.style.color = C.red; e.currentTarget.style.background = C.redLight; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textLight; e.currentTarget.style.background = C.white; }}>
                  {s.i}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1rem" }}>
          <p style={{ color: C.textLight, fontSize: "0.75rem" }}>© {new Date().getFullYear()} Shorty's Diner · Williamsburg, VA</p>
        </div>
      </div>
    </footer>
  );
}

const occasions = [
  {
    heading: "Corporate & Office",
    body: "Breakfast spreads, working lunches, and team events. We handle the food so you can focus on the meeting.",
  },
  {
    heading: "Private Events",
    body: "Birthdays, reunions, celebrations. Shorty's brings 44 years of diner character to your event.",
  },
  {
    heading: "Drop-Off Catering",
    body: "Full trays delivered hot and ready. No fuss, no mess — just the food your guests will actually talk about.",
  },
];

export default function CateringPage() {
  return (
    <div style={{ background: C.cream, fontFamily: "'DM Sans', sans-serif" }}>
      <CateringNav />

      {/* ── Section 1: Hero ── */}
      <section style={{
        background: "#1a0a05", minHeight: "60vh",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center",
        padding: "7rem 1.25rem 4rem",
      }}>
        <h1 style={{
          fontFamily: "'Boogaloo', cursive", fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
          color: C.red, marginBottom: "1rem", lineHeight: 1.1,
        }}>
          Shorty's Parties &amp; Catering
        </h1>
        <p style={{
          color: "#d4c8be", fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
          maxWidth: "540px", lineHeight: 1.6, marginBottom: "2rem",
        }}>
          We cater for every occasion — corporate lunches, private events, and drop-off catering across Williamsburg and Richmond.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="tel:7576036674" style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            padding: "0.8rem 1.85rem", background: C.red, color: "#fff",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem",
            borderRadius: "8px", textDecoration: "none",
            boxShadow: "0 3px 14px #e11d4835, 0 2px 8px rgba(0,0,0,0.2)",
            transition: "background 0.2s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = C.redDark}
            onMouseLeave={(e) => e.currentTarget.style.background = C.red}>
            Call Williamsburg
          </a>
          <a href="tel:8045255627" style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            padding: "0.8rem 1.85rem", background: "rgba(255,255,255,0.1)", color: "#fff",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem",
            borderRadius: "8px", textDecoration: "none",
            border: `2px solid ${C.red}`,
            transition: "background 0.2s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
            Call Richmond
          </a>
        </div>
      </section>

      {/* ── Section 2: Occasion Cards ── */}
      <section style={{ padding: "4rem 1.25rem", maxWidth: "960px", margin: "0 auto" }}>
        <div style={{
          display: "flex", gap: "1.5rem", flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {occasions.map((card) => (
            <div key={card.heading} style={{
              flex: "1 1 260px", maxWidth: "320px",
              background: C.white, border: `1px solid ${C.border}`,
              borderRadius: "12px", padding: "1.5rem",
              borderTop: `3px solid ${C.red}`,
            }}>
              <h3 style={{
                fontFamily: "'Boogaloo', cursive", fontSize: "1.3rem",
                color: C.textDark, marginBottom: "0.6rem",
              }}>
                {card.heading}
              </h3>
              <p style={{ color: C.textMid, fontSize: "0.92rem", lineHeight: 1.6 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Contact Block ── */}
      <section style={{
        background: C.tan, padding: "4rem 1.25rem", textAlign: "center",
      }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Boogaloo', cursive", fontSize: "2rem",
            color: C.red, marginBottom: "1.5rem",
          }}>
            Start Planning
          </h2>
          <a href="mailto:catering@shortysdinerva.com" style={{
            display: "inline-block", color: C.red, fontWeight: 700,
            fontSize: "1rem", marginBottom: "1.5rem", textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => e.target.style.color = C.redDark}
            onMouseLeave={(e) => e.target.style.color = C.red}>
            catering@shortysdinerva.com
          </a>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { label: "Williamsburg", number: "757-603-6674", tel: "7576036674" },
              { label: "Richmond", number: "804-525-5627", tel: "8045255627" },
            ].map((loc) => (
              <div key={loc.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: "0.88rem", paddingBottom: "0.4rem", marginBottom: "0.4rem",
                borderBottom: `1px solid ${C.border}`,
              }}>
                <span style={{ color: C.textLight }}>{loc.label}</span>
                <a href={`tel:${loc.tel}`} style={{
                  color: C.textDark, fontWeight: 600, textDecoration: "none",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={(e) => e.target.style.color = C.red}
                  onMouseLeave={(e) => e.target.style.color = C.textDark}>
                  {loc.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Footer ── */}
      <CateringFooter />
    </div>
  );
}
