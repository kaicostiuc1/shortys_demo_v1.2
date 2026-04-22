import { useEffect, useMemo } from "react";
import { C, HEADING_FONT, HERO_FONT, BODY_FONT } from "../lib/brand.js";
import { allPosts } from "../lib/instagramPosts.js";

export default function PhotoStrip() {
  const posts = useMemo(
    () => [...allPosts].sort(() => Math.random() - 0.5).slice(0, 2),
    []
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    if (window.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process();
    }
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section
      style={{
        background: C.white,
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: BODY_FONT,
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: C.red,
          marginBottom: "8px",
          fontWeight: 700,
        }}
      >
        LATEST FROM THE GRAM
      </div>
      <h2
        style={{
          fontFamily: HEADING_FONT,
          fontSize: "2.5rem",
          color: C.textDark,
          marginBottom: "8px",
          marginTop: 0,
          lineHeight: 1,
        }}
      >
        @shortysdiner
      </h2>
      <p
        style={{
          fontFamily: HERO_FONT,
          fontStyle: "italic",
          fontSize: "1rem",
          color: C.textMid,
          marginBottom: "40px",
          marginTop: 0,
        }}
      >
        A peek at the griddle.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {posts.map((id) => (
          <div
            key={id}
            style={{
              border: `2px solid ${C.red}`,
              borderRadius: "14px",
              overflow: "hidden",
              background: C.white,
              boxShadow: "0 8px 24px rgba(225,29,72,0.08)",
              minWidth: 0,
            }}
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={`https://www.instagram.com/p/${id}/`}
              data-instgrm-version="14"
              style={{ margin: 0, width: "100%" }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px" }}>
        <a
          href="https://www.instagram.com/shortysdiner/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: BODY_FONT,
            fontSize: "0.9rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: C.red,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = "none";
          }}
        >
          See more on Instagram →
        </a>
      </div>
    </section>
  );
}
