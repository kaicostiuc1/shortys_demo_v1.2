import Navbar from "../components/Navbar.jsx";
import Checker from "../components/Checker.jsx";
import Footer from "../components/Footer.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";

const PILLARS = [
  {
    num: "01",
    title: "Authenticity",
    body:
      "The worn counter and the handwritten specials — those aren't marketing. They're just the way it's always been.",
  },
  {
    num: "02",
    title: "Honest pricing",
    body: "A full breakfast under twelve dollars. Not cheap. Honest.",
  },
  {
    num: "03",
    title: "Community",
    body:
      "One of the last places in town where a nineteen-year-old sits two booths down from a retired couple, and the waitress knows both their orders.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: C.cream, color: C.textDark, minHeight: "100vh" }}>
      <Navbar theme="light" />

      <PageHeader
        eyebrow="SINCE 1980"
        title="Our Story"
        subtitle="Four locations. One diner."
      />

      <Checker />

      {/* STORY */}
      <section
        style={{
          background: C.cream,
          padding: "60px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: C.textMid,
              lineHeight: 1.7,
              marginTop: 0,
              marginBottom: "24px",
            }}
          >
            Shorty's opened its doors in Williamsburg in 1980. Same worn counter. Same Elvis photos on the wall. Same chef specials handwritten on the board every morning. Forty-five years later, we're still pouring coffee for regulars who've been coming in for decades — and for their kids and grandkids, too.
          </p>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: C.textMid,
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            What started as a single-location diner has grown into four. Yorktown, Richmond, and most recently St. Louis. Each location has its own neighborhood, its own regulars, and its own stories. But the coffee is the same. The recipes are the same. And if you sit at the counter long enough, someone will ask if you're new in town.
          </p>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontSize: "1.4rem",
              fontWeight: 400,
              color: C.textMid,
              lineHeight: 1.5,
              textAlign: "center",
              marginTop: "40px",
              marginBottom: 0,
            }}
          >
            It's not fancy. It's not fat-free. It's just the way it used to be.
          </p>
        </div>
      </section>

      <Checker />

      {/* PILLARS */}
      <section
        style={{
          background: C.tan,
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
            WHAT WE'RE ABOUT
          </div>
          <h2
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "2.6rem",
              color: C.textDark,
              textAlign: "center",
              marginTop: 0,
              marginBottom: "50px",
            }}
          >
            Three things we get right
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "40px",
            }}
          >
            {PILLARS.map((p) => (
              <div key={p.num}>
                <div
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: C.red,
                    fontWeight: 800,
                  }}
                >
                  {p.num}
                </div>
                <h3
                  style={{
                    fontFamily: HEADING_FONT,
                    fontSize: "1.6rem",
                    color: C.textDark,
                    marginTop: "8px",
                    marginBottom: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: HERO_FONT,
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    color: C.textMid,
                    marginTop: "10px",
                    marginBottom: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Checker />

      {/* FOLLOW US */}
      <section
        style={{
          background: C.cream,
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
            FOLLOW ALONG
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
            On the gram
          </h2>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "1rem",
              color: C.textMid,
              marginTop: 0,
              marginBottom: "28px",
            }}
          >
            Pancakes, people, and whatever's on the griddle.
          </p>
          <a
            href="https://instagram.com/shortysdiner"
            target="_blank"
            rel="noopener noreferrer"
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
            @SHORTYSDINER →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
