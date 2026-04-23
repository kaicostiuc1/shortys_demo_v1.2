import Navbar from "../components/Navbar.jsx";
import Checker from "../components/Checker.jsx";
import Footer from "../components/Footer.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";

const OCCASIONS = [
  {
    num: "01",
    title: "Corporate & Office",
    body:
      "Breakfast platters for the Monday meeting. Lunch for the whole floor. We deliver — or you swing by and we'll have it ready.",
  },
  {
    num: "02",
    title: "Private Events",
    body:
      "Birthdays, reunions, after-church gatherings. Open the place up for your group or reserve a section.",
  },
  {
    num: "03",
    title: "Drop-Off Catering",
    body:
      "Pans of pancakes, trays of bacon, thermoses of coffee. Pick it up, plug it in, feed the crew.",
  },
];

function PrimaryCallButton({ href, label }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: C.red,
        color: C.cream,
        fontFamily: BODY_FONT,
        fontSize: "0.8rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        padding: "11px 18px",
        borderRadius: "2px",
        textDecoration: "none",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = C.redDark;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = C.red;
      }}
    >
      {label}
    </a>
  );
}

export default function CateringPage() {
  return (
    <div style={{ background: C.cream, color: C.textDark, minHeight: "100vh" }}>
      <Navbar theme="light" />

      <PageHeader
        eyebrow="CATERING & PARTIES"
        title="Feed the Whole Room"
        subtitle="Office breakfasts, private events, big groups — we've got you."
      />

      {/* HERO CTA ROW */}
      <section
        style={{
          background: C.cream,
          padding: "0 24px 40px",
        }}
      >
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <PrimaryCallButton
            href="tel:7576036674"
            label="CALL WILLIAMSBURG · (757) 603-6674"
          />
          <PrimaryCallButton
            href="tel:8045255627"
            label="CALL RICHMOND · (804) 525-5627"
          />
        </div>
      </section>

      <Checker />

      {/* OCCASIONS */}
      <section
        style={{
          background: C.cream,
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: C.red,
              marginBottom: "10px",
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            HOW WE HELP
          </div>
          <h2
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "2.4rem",
              color: C.textDark,
              textAlign: "center",
              marginTop: 0,
              marginBottom: "50px",
            }}
          >
            Three ways to do it
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {OCCASIONS.map((o) => (
              <div
                key={o.num}
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: "2px",
                  padding: "32px 26px",
                }}
              >
                <div
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: "10px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: C.red,
                    marginBottom: "10px",
                  }}
                >
                  {o.num}
                </div>
                <h3
                  style={{
                    fontFamily: HEADING_FONT,
                    fontSize: "1.6rem",
                    color: C.textDark,
                    lineHeight: 1.1,
                    marginTop: 0,
                    marginBottom: "14px",
                  }}
                >
                  {o.title}
                </h3>
                <p
                  style={{
                    fontFamily: HERO_FONT,
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    color: C.textMid,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Checker />

      {/* QUOTE CONTACT */}
      <section
        style={{
          background: C.tan,
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: C.red,
              marginBottom: "10px",
              fontWeight: 800,
            }}
          >
            GET A QUOTE
          </div>
          <h2
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "2rem",
              color: C.textDark,
              marginTop: 0,
              marginBottom: "16px",
            }}
          >
            Let's figure out the details
          </h2>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "1rem",
              color: C.textMid,
              maxWidth: "540px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 0,
              marginBottom: "28px",
              lineHeight: 1.6,
            }}
          >
            Call the location nearest you, or email us with headcount, date, and rough idea of what you need. We'll handle the rest.
          </p>
          <a
            href="mailto:catering@shortysdiner.com"
            style={{
              display: "inline-block",
              fontFamily: BODY_FONT,
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: C.textDark,
              border: `1.5px solid ${C.textDark}`,
              padding: "12.5px 24px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.textDark;
              e.currentTarget.style.color = C.cream;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = C.textDark;
            }}
          >
            CATERING@SHORTYSDINER.COM →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
