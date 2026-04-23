import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Checker from "../components/Checker.jsx";
import Footer from "../components/Footer.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";
import { breakfastMenu, lunchMenu, weeklySpecials } from "../lib/menuData.js";

const tabBaseStyle = {
  fontFamily: BODY_FONT,
  fontSize: "0.85rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  padding: "12px 24px",
  borderRadius: "2px",
  border: `1.5px solid ${C.textDark}`,
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("breakfast");
  const data = activeTab === "breakfast" ? breakfastMenu : lunchMenu;
  const categories = Object.entries(data);

  return (
    <div style={{ background: C.cream, color: C.textDark, minHeight: "100vh" }}>
      <Navbar theme="light" />

      <PageHeader
        eyebrow="THE MENU"
        title="What's Cookin'"
        subtitle="Breakfast served all day. Lunch, too."
      />

      <Checker />

      {/* TAB SWITCHER */}
      <section
        style={{
          background: C.cream,
          padding: "40px 24px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            gap: "8px",
          }}
        >
          {[
            { id: "breakfast", label: "BREAKFAST" },
            { id: "lunch", label: "LUNCH" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...tabBaseStyle,
                  background: isActive ? C.textDark : "transparent",
                  color: isActive ? C.cream : C.textDark,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* MENU GRID */}
      <section
        style={{
          background: C.cream,
          padding: "20px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {categories.map(([category, items], catIdx) => (
            <div key={category}>
              <h2
                style={{
                  fontFamily: HEADING_FONT,
                  fontSize: "1.8rem",
                  color: C.textDark,
                  marginTop: catIdx === 0 ? "40px" : "60px",
                  marginBottom: "6px",
                }}
              >
                {category}
              </h2>
              <div
                style={{
                  width: "60px",
                  height: "2px",
                  background: C.red,
                  marginBottom: "24px",
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                  gap: "30px",
                }}
              >
                {items.map((item, idx) => (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "20px",
                      alignItems: "baseline",
                      paddingBottom: idx === items.length - 1 ? 0 : "20px",
                      borderBottom:
                        idx === items.length - 1
                          ? "none"
                          : "1px solid rgba(224, 216, 202, 0.6)",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: BODY_FONT,
                          fontSize: "1rem",
                          fontWeight: 700,
                          color: C.textDark,
                        }}
                      >
                        {item.name}
                      </div>
                      {item.desc && (
                        <div
                          style={{
                            fontFamily: HERO_FONT,
                            fontStyle: "italic",
                            fontSize: "0.9rem",
                            color: C.textMid,
                            marginTop: "4px",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.desc}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: BODY_FONT,
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: C.red,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${item.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "0.75rem",
              fontStyle: "italic",
              color: C.textLight,
              marginTop: "60px",
              textAlign: "center",
            }}
          >
            Prices and availability subject to change.
          </div>
        </div>
      </section>

      <Checker />

      {/* WEEKLY SPECIALS */}
      <section
        style={{
          background: C.tan,
          padding: "80px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: BODY_FONT,
              fontSize: "11px",
              textTransform: "uppercase",
              fontWeight: 800,
              letterSpacing: "0.18em",
              color: C.red,
              marginBottom: "10px",
            }}
          >
            DAILY SPECIALS
          </div>
          <h2
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "2.6rem",
              color: C.textDark,
              marginTop: 0,
              marginBottom: "40px",
            }}
          >
            What's on this week
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            {weeklySpecials.map((s) => (
              <div
                key={s.day}
                style={{
                  background: C.cream,
                  padding: "24px 20px",
                  borderRadius: "2px",
                  border: `1px solid ${C.border}`,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    fontFamily: BODY_FONT,
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: C.red,
                    fontWeight: 700,
                  }}
                >
                  {s.day}
                </div>
                <div
                  style={{
                    fontFamily: HEADING_FONT,
                    fontSize: "1.4rem",
                    color: C.textDark,
                    marginTop: "4px",
                    lineHeight: 1.1,
                  }}
                >
                  {s.name}
                </div>
                {s.desc && (
                  <div
                    style={{
                      fontFamily: HERO_FONT,
                      fontStyle: "italic",
                      fontSize: "0.85rem",
                      color: C.textMid,
                      marginTop: "8px",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
