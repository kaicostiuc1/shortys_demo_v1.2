import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { C, DARK_BG, HEADING_FONT, BODY_FONT } from "../lib/brand.js";

const LINKS = [
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Order", to: "/order" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar({ theme = "dark" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY >= 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isTransparent = theme === "dark" && !scrolled;
  const solid = theme === "dark" ? DARK_BG : C.cream;
  const bg = isTransparent ? "transparent" : solid;
  const fg = theme === "dark" ? C.cream : C.textDark;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        zIndex: 100,
        background: bg,
        transition: "background-color 0.25s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: fg,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ marginRight: "10px" }}
          >
            <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
            <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
            <path d="m2.1 21.8 6.4-6.3" />
            <path d="m19 5-7 7" />
          </svg>
          <span
            style={{
              fontFamily: HEADING_FONT,
              fontSize: "1.9rem",
              fontWeight: 700,
              color: fg,
              lineHeight: 1,
              letterSpacing: "-0.01em",
            }}
          >
            Shorty's
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: BODY_FONT,
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: fg,
                padding: "8px 14px",
                borderRadius: "999px",
                textDecoration: "none",
                transition: "background-color 0.2s ease",
                display: "inline-block",
                lineHeight: 1,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = C.redFaint;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
