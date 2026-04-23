import Navbar from "../components/Navbar.jsx";
import Checker from "../components/Checker.jsx";
import Footer from "../components/Footer.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";

const OCCASIONS = [
  {
    num: "01",
    title: "Team Celebrations",
    body:
      "W&M teams have packed our booths after games for years. Football, basketball, lacrosse, track — if you wear the colors, we'll feed the whole roster.",
  },
  {
    num: "02",
    title: "Milestone Moments",
    body:
      "Birthdays, graduations, retirements, anniversaries. The kind of day you want pancakes for, with everyone around the table.",
  },
  {
    num: "03",
    title: "Group Breakfasts",
    body:
      "Family reunions, church groups, out-of-town visitors. We'll set up a section, keep the coffee flowing, and let you do the rest.",
  },
  {
    num: "04",
    title: "Corporate & Team Offsites",
    body:
      "Kick-off breakfasts, quarterly team meals, client meetings over biscuits and gravy. We've hosted Pharma groups, local business teams, and everything between.",
  },
  {
    num: "05",
    title: "Watch Parties",
    body:
      "Big game, big appetite. Reserve a section for the crew and watch it together the way it's meant to be watched — with food coming out of the kitchen.",
  },
  {
    num: "06",
    title: "Private Gatherings",
    body:
      "Whatever doesn't fit a category. Showers, memorials, club meetings, just-because. If you need the space, we'll figure out the rest.",
  },
];

const SPACE_LIST = [
  "Reserved sections for groups up to 30",
  "Full-restaurant buyouts available",
  "Outdoor patio space seasonally",
  "Plenty of parking, easy to find",
];

const SERVICE_LIST = [
  "Advance planning with Jeff or the team",
  "Custom pre-order menus for large groups",
  "Dedicated server coverage",
  "Flexible timing — we open early if you need us to",
];

function DetailColumn({ eyebrow, heading, items }) {
  return (
    <div>
      <div
        style={{
          fontFamily: BODY_FONT,
          fontSize: "10px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: C.red,
          marginBottom: "8px",
        }}
      >
        {eyebrow}
      </div>
      <h3
        style={{
          fontFamily: HEADING_FONT,
          fontSize: "1.6rem",
          color: C.textDark,
          marginTop: 0,
          marginBottom: "14px",
          lineHeight: 1.1,
        }}
      >
        {heading}
      </h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontFamily: HERO_FONT,
          fontStyle: "italic",
          fontSize: "1rem",
          color: C.textMid,
          lineHeight: 1.9,
        }}
      >
        {items.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

function PhoneBlock({ label, number, href }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: BODY_FONT,
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: C.textLight,
          marginBottom: "2px",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <a
        href={href}
        style={{
          fontFamily: HERO_FONT,
          fontStyle: "italic",
          fontSize: "1.1rem",
          color: C.textDark,
          textDecoration: "none",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = C.red;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = C.textDark;
        }}
      >
        {number}
      </a>
    </div>
  );
}

export default function EventsPage() {
  return (
    <div style={{ background: C.cream, color: C.textDark, minHeight: "100vh" }}>
      <Navbar theme="light" />

      <PageHeader
        eyebrow="EVENTS & GATHERINGS"
        title="Book the Booth. Or the Whole Place."
        subtitle="Team breakfasts, birthdays, reunions, watch parties — Shorty's has been the spot for gatherings since 1980."
      />

      <Checker />

      {/* OCCASION GRID */}
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
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: C.red,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            WHAT WE HOST
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
            All kinds of gatherings
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
                    fontSize: "1.5rem",
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

      {/* WHAT YOU GET */}
      <section
        style={{
          background: C.tan,
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: C.red,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            THE DETAILS
          </div>
          <h2
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "2.2rem",
              color: C.textDark,
              textAlign: "center",
              marginTop: 0,
              marginBottom: "50px",
            }}
          >
            What you get
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "40px",
            }}
          >
            <DetailColumn
              eyebrow="SPACE"
              heading="Room for your crew"
              items={SPACE_LIST}
            />
            <DetailColumn
              eyebrow="EXPERIENCE"
              heading="We handle the rest"
              items={SERVICE_LIST}
            />
          </div>
        </div>
      </section>

      <Checker />

      {/* COMMUNITY */}
      <section
        style={{
          background: C.cream,
          padding: "80px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "780px",
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
              marginBottom: "10px",
            }}
          >
            FORTY-FIVE YEARS IN
          </div>
          <h2
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "2.4rem",
              color: C.textDark,
              marginTop: 0,
              marginBottom: "24px",
            }}
          >
            Your place. Since 1980.
          </h2>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: C.textMid,
              lineHeight: 1.7,
              marginTop: 0,
              marginBottom: "24px",
            }}
          >
            We've watched kids grow up, teams win championships, and families move through every milestone that matters. Shorty's has always been where Williamsburg gathers — and now Yorktown, Richmond, and St. Louis do too.
          </p>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: C.textMid,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Whatever you're celebrating, you're welcome here.
          </p>
        </div>
      </section>

      <Checker />

      {/* CONTACT CTA */}
      <section
        style={{
          background: C.tan,
          padding: "70px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
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
            LET'S PLAN IT
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
            Tell us what you're thinking
          </h2>
          <p
            style={{
              fontFamily: HERO_FONT,
              fontStyle: "italic",
              fontSize: "1rem",
              color: C.textMid,
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 0,
              marginBottom: "28px",
              lineHeight: 1.6,
            }}
          >
            Call the location nearest you, or email with headcount, date, and vibe. We'll take it from there.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <PhoneBlock
              label="WILLIAMSBURG"
              number="(757) 603-6674"
              href="tel:7576036674"
            />
            <PhoneBlock
              label="RICHMOND"
              number="(804) 525-5627"
              href="tel:8045255627"
            />
          </div>

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
