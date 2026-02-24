import { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Phone,
  User,
  ChevronDown,
  MapPin,
  Wifi,
  Instagram,
  Facebook,
  Twitter,
  Play,
  Star,
  Coffee,
  Flame,
  Leaf,
  Egg,
  ArrowDown,
  Check,
  Loader2,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   SHORTY'S DINER — Single-Page React App
   Vite + React + Tailwind CSS + Lucide Icons
   CSS keyframe animations only — no Framer Motion (per spec)

   TODO markers throughout indicate where live API calls, real photos,
   and production data will replace mock values.
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── MOCK DATA ──────────────────────────────────────────────────────────────

// TODO: Replace currentWait with live fetch from Toast Waitlist API endpoint
const currentWait = 12;
const partiesAhead = Math.round(currentWait / 3);

const menuItems = [
  {
    id: 1,
    name: "W&M Power Breakfast",
    price: 14.99,
    short: "Two eggs, bacon, sausage, home fries & toast",
    full: "The one that's fueled forty-four years of finals weeks. Two eggs any style, crispy bacon, house-made sausage links, golden home fries, and your choice of sourdough or wheat toast. Comes with bottomless coffee.",
    tags: ["hearty"],
    localFave: true,
  },
  {
    id: 2,
    name: "Shorty's Short Stack",
    price: 9.99,
    short: "Three fluffy buttermilk pancakes",
    full: "Three buttermilk pancakes from the same recipe we've used since 1980. Golden, fluffy, and served with real butter and warm maple syrup. Add blueberries or chocolate chips for $1.",
    tags: ["vegetarian"],
    localFave: false,
  },
  {
    id: 3,
    name: "The Colonial Scramble",
    price: 12.99,
    short: "Three-egg scramble with peppers, onions & cheddar",
    full: "A three-egg scramble loaded with roasted bell peppers, sweet onions, sharp cheddar, and served on a warm tortilla or with toast. Pairs perfectly with our house hot sauce.",
    tags: ["gluten-free option"],
    localFave: false,
  },
  {
    id: 4,
    name: "Biscuits & Gravy",
    price: 10.99,
    short: "Scratch-made biscuits smothered in sausage gravy",
    full: "Two of Shorty's famous scratch-made biscuits split open and drowning in thick, peppery sausage gravy. This is the dish people drive from Richmond for. Not kidding.",
    tags: ["hearty"],
    localFave: false,
  },
  {
    id: 5,
    name: "Veggie Garden Omelette",
    price: 11.99,
    short: "Spinach, tomato, mushroom & Swiss omelette",
    full: "A three-egg omelette folded around fresh spinach, vine-ripe tomatoes, sliced mushrooms, and melted Swiss. Served with fruit cup and your choice of toast.",
    tags: ["vegetarian"],
    localFave: false,
  },
  {
    id: 6,
    name: "The Early Bird",
    price: 7.99,
    short: "Two eggs, toast & coffee — before 8AM",
    full: "Simple, affordable, and exactly what you need at 6:30 in the morning. Two eggs any style, toast, and a cup of our bottomless drip coffee. Available until 8 AM only.",
    tags: ["budget-friendly"],
    localFave: false,
  },
  {
    id: 7,
    name: "Avocado Toast (Yes, Really)",
    price: 11.49,
    short: "Smashed avocado on sourdough with everything seasoning",
    full: "We resisted for years, but here we are. Fresh smashed avocado on thick-cut sourdough, topped with everything seasoning, pickled red onion, and a drizzle of chili oil. Add an egg for $1.50.",
    tags: ["vegetarian", "vegan option"],
    localFave: false,
  },
  {
    id: 8,
    name: "Classic BLT",
    price: 10.49,
    short: "Thick-cut bacon, lettuce, tomato, mayo on sourdough",
    full: "Thick-cut applewood smoked bacon, crisp lettuce, ripe tomato, and house-made mayo on toasted sourdough. Served with a pickle spear and your choice of fries or fruit.",
    tags: [],
    localFave: false,
  },
];

const dinerStories = [
  {
    id: 1,
    title: "6AM Opening Rush",
    gradient: "linear-gradient(135deg, #e11d4860, #f59e0b40, #0f172a)",
    desc: "Watch Shorty flip 200 pancakes before sunrise",
  },
  {
    id: 2,
    title: "The Regulars Table",
    gradient: "linear-gradient(135deg, #f59e0b50, #e11d4830, #0f172a)",
    desc: "Same booth, same order, 20 years running",
  },
  {
    id: 3,
    title: "W&M Game Day",
    gradient: "linear-gradient(135deg, #06b6d440, #e11d4830, #0f172a)",
    desc: "When the whole town fits in 40 seats",
  },
];

// ─── MAIN APP ───────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: "#0f172a", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <WaitlistSection />
      <MenuSection />
      <DinerStories />
      <Footer />
    </div>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0.75rem 1.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "#0f172aee" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #1e293b" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <a
        href="#hero"
        style={{
          fontFamily: "'Boogaloo', cursive",
          fontSize: "1.5rem",
          color: "#e11d48",
          textDecoration: "none",
          textShadow: "0 0 8px #e11d4860",
        }}
        aria-label="Shorty's Diner — Back to top"
      >
        Shorty's
      </a>
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {[
          { label: "Menu", href: "#menu" },
          { label: "Stories", href: "#stories" },
          { label: "Visit", href: "#footer" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: "#94a3b8",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#f1f5f9")}
            onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
        padding: "2rem 1.5rem",
      }}
      aria-label="Welcome to Shorty's Diner"
    >
      {/* ── Atmospheric Background Placeholder ── */}
      {/* // TODO: Replace with real Shorty's photo — atmospheric exterior or interior at golden hour */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 20%, #e11d4815 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, #f59e0b10 0%, transparent 50%),
            linear-gradient(180deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)
          `,
          zIndex: 0,
        }}
        role="img"
        aria-label="Atmospheric photo of Shorty's Diner at golden hour — placeholder"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(#ffffff04 1px, transparent 1px),
              linear-gradient(90deg, #ffffff04 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #0f172a80 0%, #0f172ab0 50%, #0f172af0 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "800px" }}>
        <div
          className="fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "#f59e0b",
            fontSize: "0.95rem",
            fontWeight: 500,
            marginBottom: "1.5rem",
            letterSpacing: "0.08em",
          }}
        >
          <Coffee size={16} style={{ opacity: 0.8 }} />
          SINCE 1980
        </div>

        <h1
          className="neon-sign fade-up fade-up-d1"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            lineHeight: 1,
            marginBottom: "1.25rem",
          }}
        >
          Shorty's Diner
        </h1>

        <p
          className="fade-up fade-up-d2"
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            background: "linear-gradient(90deg, #f1f5f9, #94a3b8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 400,
            marginBottom: "2.5rem",
            lineHeight: 1.5,
          }}
        >
          Modern Tech. Classic Breakfast. Since 1980.
        </p>

        <div
          className="fade-up fade-up-d3"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#menu"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              background: "#e11d48",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "1.05rem",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "all 0.2s ease",
              boxShadow: "0 0 20px #e11d4840",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#be123c";
              e.target.style.boxShadow = "0 0 30px #e11d4860";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#e11d48";
              e.target.style.boxShadow = "0 0 20px #e11d4840";
            }}
          >
            See the Menu
            <ArrowDown size={18} />
          </a>
          <a
            href="#waitlist"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              background: "transparent",
              color: "#f1f5f9",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "1.05rem",
              borderRadius: "8px",
              textDecoration: "none",
              border: "1px solid #334155",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#e11d48";
              e.target.style.color = "#e11d48";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#334155";
              e.target.style.color = "#f1f5f9";
            }}
          >
            Join the Waitlist
          </a>
        </div>
      </div>

      <div
        className="fade-up fade-up-d4"
        style={{
          position: "absolute",
          bottom: "2rem",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          color: "#475569",
          fontSize: "0.8rem",
        }}
      >
        <span>Scroll</span>
        <ChevronDown size={18} style={{ animation: "fadeUpIn 1.5s ease-in-out infinite alternate" }} />
      </div>
    </section>
  );
}

// ─── WAITLIST SECTION ───────────────────────────────────────────────────────

function WaitlistSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    phoneNumber: "",
    partySize: "2",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.firstName.trim()) e.firstName = "We need a name for the list!";
    if (!/^\+?[\d\s\-().]{7,15}$/.test(formData.phoneNumber.replace(/\s/g, "")))
      e.phoneNumber = "Please enter a valid phone number";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");

    // Simulate network delay for demo
    await new Promise((r) => setTimeout(r, 1500));

    // ─── TOAST API INTEGRATION POINT ─────────────────────────────────────────
    // Replace this block with a real fetch() or axios() call:
    //
    // const { firstName, phoneNumber, partySize } = formData;
    // const response = await fetch('https://api.toasttab.com/waitlist/v1/entries', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${TOAST_API_KEY}`,
    //   },
    //   body: JSON.stringify({ firstName, phoneNumber, partySize: Number(partySize) }),
    // });
    // if (!response.ok) throw new Error('Waitlist entry failed');
    // ──────────────────────────────────────────────────────────────────────────

    setStatus("success");
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section
      id="waitlist"
      style={{
        padding: "5rem 1.5rem",
        maxWidth: "640px",
        margin: "0 auto",
      }}
      aria-label="Join the Waitlist"
    >
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "'Boogaloo', cursive",
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            color: "#e11d48",
            textShadow: "0 0 12px #e11d4830",
            marginBottom: "0.5rem",
          }}
        >
          Skip the Door, Not the Food
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.6 }}>
          Get on our list from your phone. We'll text you when your table's hot.
        </p>
      </div>

      {/* Live Wait Status Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          border: "1px solid #334155",
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "2rem",
        }}
        role="status"
        aria-live="polite"
        aria-label={`Current wait time is approximately ${currentWait} minutes`}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "#e11d4815",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Clock size={22} color="#e11d48" />
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500, letterSpacing: "0.04em" }}>
                CURRENT WAIT
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#f1f5f9" }}>
                {currentWait} Min
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "#f59e0b",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            <Users size={16} />
            ~{partiesAhead} parties ahead
          </div>
        </div>

        <div
          style={{
            height: "6px",
            background: "#1e293b",
            borderRadius: "3px",
            overflow: "hidden",
          }}
          role="progressbar"
          aria-valuenow={currentWait}
          aria-valuemin={0}
          aria-valuemax={60}
          aria-label="Wait time indicator"
        >
          <div
            className="wait-bar-fill"
            style={{
              width: `${Math.min((currentWait / 60) * 100, 100)}%`,
              height: "100%",
              background: "linear-gradient(90deg, #e11d48, #f59e0b)",
              borderRadius: "3px",
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>

      {/* Form / Success State */}
      {status === "success" ? (
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            border: "1px solid #22c55e40",
            borderRadius: "16px",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            animation: "fadeUpIn 0.5s ease-out",
          }}
          role="alert"
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#22c55e20",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}
          >
            <Check size={28} color="#22c55e" />
          </div>
          <h3
            style={{
              fontFamily: "'Boogaloo', cursive",
              fontSize: "1.8rem",
              color: "#22c55e",
              marginBottom: "0.75rem",
            }}
          >
            You're on the list!
          </h3>
          <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.6 }}>
            We'll text you at{" "}
            <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{formData.phoneNumber}</span>{" "}
            when your table is ready. Grab a coffee while you wait — you've earned it.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            border: "1px solid #334155",
            borderRadius: "16px",
            padding: "2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.9rem",
                color: "#94a3b8",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              <User size={15} /> First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="What should we call you?"
              value={formData.firstName}
              onChange={handleChange("firstName")}
              disabled={status === "submitting"}
              aria-required="true"
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "err-firstName" : undefined}
              style={{
                width: "100%",
                padding: "0.875rem 1rem",
                background: "#0f172a",
                border: `1px solid ${errors.firstName ? "#ef4444" : "#334155"}`,
                borderRadius: "10px",
                color: "#f1f5f9",
                fontSize: "1rem",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                if (!errors.firstName) e.target.style.borderColor = "#e11d48";
              }}
              onBlur={(e) => {
                if (!errors.firstName) e.target.style.borderColor = "#334155";
              }}
            />
            {errors.firstName && (
              <span id="err-firstName" style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.3rem", display: "block" }}>
                {errors.firstName}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.9rem",
                color: "#94a3b8",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              <Phone size={15} /> Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="(757) 555-1234"
              value={formData.phoneNumber}
              onChange={handleChange("phoneNumber")}
              disabled={status === "submitting"}
              aria-required="true"
              aria-invalid={!!errors.phoneNumber}
              aria-describedby={errors.phoneNumber ? "err-phoneNumber" : undefined}
              style={{
                width: "100%",
                padding: "0.875rem 1rem",
                background: "#0f172a",
                border: `1px solid ${errors.phoneNumber ? "#ef4444" : "#334155"}`,
                borderRadius: "10px",
                color: "#f1f5f9",
                fontSize: "1rem",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                if (!errors.phoneNumber) e.target.style.borderColor = "#e11d48";
              }}
              onBlur={(e) => {
                if (!errors.phoneNumber) e.target.style.borderColor = "#334155";
              }}
            />
            {errors.phoneNumber && (
              <span id="err-phoneNumber" style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.3rem", display: "block" }}>
                {errors.phoneNumber}
              </span>
            )}
          </div>

          {/* Party Size */}
          <div>
            <label
              htmlFor="partySize"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.9rem",
                color: "#94a3b8",
                marginBottom: "0.5rem",
                fontWeight: 500,
              }}
            >
              <Users size={15} /> Party Size
            </label>
            <div style={{ position: "relative" }}>
              <select
                id="partySize"
                value={formData.partySize}
                onChange={handleChange("partySize")}
                disabled={status === "submitting"}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  paddingRight: "2.5rem",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#f1f5f9",
                  fontSize: "1rem",
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                color="#64748b"
                style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            aria-label={status === "submitting" ? "Adding your name to the waitlist..." : "Add my name to the waitlist"}
            style={{
              width: "100%",
              padding: "1rem",
              marginTop: "0.5rem",
              background: status === "submitting" ? "#9f1239" : "#e11d48",
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              border: "none",
              borderRadius: "10px",
              cursor: status === "submitting" ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              transition: "all 0.2s ease",
              boxShadow: "0 0 24px #e11d4830",
            }}
            onMouseEnter={(e) => {
              if (status !== "submitting") {
                e.target.style.background = "#be123c";
                e.target.style.boxShadow = "0 0 32px #e11d4850";
              }
            }}
            onMouseLeave={(e) => {
              if (status !== "submitting") {
                e.target.style.background = "#e11d48";
                e.target.style.boxShadow = "0 0 24px #e11d4830";
              }
            }}
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={20} className="spinner" />
                Saving your spot...
              </>
            ) : (
              "Add My Name — It's Free"
            )}
          </button>
        </form>
      )}
    </section>
  );
}

// ─── MENU SECTION ───────────────────────────────────────────────────────────

function MenuSection() {
  return (
    <section
      id="menu"
      style={{
        padding: "5rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
      aria-label="Menu"
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "'Boogaloo', cursive",
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            color: "#e11d48",
            textShadow: "0 0 12px #e11d4830",
            marginBottom: "0.5rem",
          }}
        >
          Shorty's Staples
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>
          The hits. Perfected over 44 years. No PDFs. No squinting.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "1.25rem",
        }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function MenuItem({ item }) {
  const [expanded, setExpanded] = useState(false);

  const tagColors = {
    hearty: { bg: "#f59e0b20", text: "#f59e0b", icon: <Flame size={12} /> },
    vegetarian: { bg: "#22c55e20", text: "#22c55e", icon: <Leaf size={12} /> },
    "vegan option": { bg: "#22c55e20", text: "#22c55e", icon: <Leaf size={12} /> },
    "gluten-free option": { bg: "#a78bfa20", text: "#a78bfa", icon: <Egg size={12} /> },
    "budget-friendly": { bg: "#06b6d420", text: "#06b6d4", icon: <Star size={12} /> },
  };

  return (
    <div
      role="article"
      tabIndex={0}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded(!expanded);
        }
      }}
      aria-expanded={expanded}
      aria-label={`${item.name}, $${item.price.toFixed(2)}. ${expanded ? "Tap to collapse" : "Tap to see full description"}`}
      style={{
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
        border: `1px solid ${expanded ? "#e11d4840" : "#334155"}`,
        borderRadius: "16px",
        padding: "1.5rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#e11d4860";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 32px #0008";
      }}
      onMouseLeave={(e) => {
        if (!expanded) e.currentTarget.style.borderColor = "#334155";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {item.localFave && (
        <div
          className="locals-badge"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            padding: "0.25rem 0.65rem",
            background: "#06b6d420",
            border: "1px solid #06b6d440",
            borderRadius: "99px",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#06b6d4",
            letterSpacing: "0.02em",
          }}
        >
          ⭐ Local's Favorite
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "0.5rem",
          paddingRight: item.localFave ? "7rem" : 0,
        }}
      >
        <h3
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#f1f5f9",
          }}
        >
          {item.name}
        </h3>
        <span
          style={{
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#e11d48",
            whiteSpace: "nowrap",
            marginLeft: "0.75rem",
          }}
        >
          ${item.price.toFixed(2)}
        </span>
      </div>

      <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>
        {item.short}
      </p>

      {item.tags.length > 0 && (
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: expanded ? "0.75rem" : 0 }}>
          {item.tags.map((tag) => {
            const s = tagColors[tag] || { bg: "#33415520", text: "#94a3b8" };
            return (
              <span
                key={tag}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "99px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  background: s.bg,
                  color: s.text,
                }}
              >
                {s.icon}
                {tag}
              </span>
            );
          })}
        </div>
      )}

      {expanded && (
        <div style={{ animation: "fadeUpIn 0.3s ease-out", borderTop: "1px solid #334155", paddingTop: "0.75rem", marginTop: "0.25rem" }}>
          <p style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: 1.65 }}>{item.full}</p>
        </div>
      )}
    </div>
  );
}

// ─── DINER STORIES ──────────────────────────────────────────────────────────

function DinerStories() {
  return (
    <section
      id="stories"
      style={{
        padding: "5rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
      aria-label="Diner Stories"
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "'Boogaloo', cursive",
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            color: "#e11d48",
            textShadow: "0 0 12px #e11d4830",
            marginBottom: "0.5rem",
          }}
        >
          Diner Stories
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem" }}>
          A peek behind the counter — coming soon to our socials.
        </p>
      </div>

      {/* // TODO: Replace with real TikTok/Reels embeds or hosted video thumbnails */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        {dinerStories.map((story) => (
          <div
            key={story.id}
            style={{
              aspectRatio: "9/16",
              borderRadius: "16px",
              background: story.gradient,
              border: "1px solid #334155",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "1.5rem",
              position: "relative",
              cursor: "pointer",
              overflow: "hidden",
              transition: "transform 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.borderColor = "#e11d4860";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "#334155";
            }}
            role="button"
            aria-label={`Play video: ${story.title}`}
            tabIndex={0}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#0f172ab0",
                border: "2px solid #ffffff40",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Play size={24} color="#fff" fill="#fff" style={{ marginLeft: "3px" }} />
            </div>
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <div
                style={{
                  fontFamily: "'Boogaloo', cursive",
                  fontSize: "1.2rem",
                  color: "#f1f5f9",
                  marginBottom: "0.25rem",
                }}
              >
                {story.title}
              </div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>{story.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* About Us blurb */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          border: "1px solid #334155",
          borderRadius: "16px",
          padding: "2.5rem 2rem",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h3
          style={{
            fontFamily: "'Boogaloo', cursive",
            fontSize: "1.6rem",
            color: "#f59e0b",
            marginBottom: "1rem",
          }}
        >
          A Few Words From Behind the Counter
        </h3>
        <div style={{ color: "#cbd5e1", fontSize: "1.05rem", lineHeight: 1.75 }}>
          <p style={{ marginBottom: "1rem" }}>
            We started Shorty's in 1980 with one griddle, one coffee pot, and the belief that if you treat people right and cook honest food, they'll keep coming back. Forty-four years later, we've gone through a lot of griddles and a whole lot of coffee — but the philosophy hasn't changed.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            We did finally retire the paper notebook we used to manage the waitlist. (Don't worry — Shorty still writes the daily specials by hand. Some things are sacred.) Now your phone does the waiting so you don't have to stand by the door.
          </p>
          <p>
            Whether you're a William & Mary freshman discovering us for the first time or a retiree who's been sitting at the same counter since Reagan was president — pull up a chair. There's always room.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      id="footer"
      style={{
        borderTop: "1px solid #1e293b",
        padding: "4rem 1.5rem 2rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
      role="contentinfo"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "3rem",
          marginBottom: "3rem",
        }}
      >
        {/* Location */}
        <div>
          <h3
            style={{
              fontFamily: "'Boogaloo', cursive",
              fontSize: "1.4rem",
              color: "#e11d48",
              marginBottom: "1rem",
            }}
          >
            Find Us
          </h3>
          {/* // TODO: Replace with Google Maps embed or Mapbox component */}
          <div
            style={{
              width: "100%",
              aspectRatio: "16/10",
              borderRadius: "12px",
              background: "#1e293b",
              border: "1px solid #334155",
              position: "relative",
              overflow: "hidden",
              marginBottom: "1rem",
            }}
            role="img"
            aria-label="Map showing Shorty's Diner location in Williamsburg, VA"
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                  linear-gradient(#ffffff08 1px, transparent 1px),
                  linear-gradient(90deg, #ffffff08 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "45%",
                left: "52%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <MapPin size={32} color="#e11d48" fill="#e11d48" style={{ filter: "drop-shadow(0 0 8px #e11d4860)" }} />
              <div
                style={{
                  marginTop: "0.25rem",
                  background: "#e11d48",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "0.15rem 0.5rem",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                SHORTY'S
              </div>
            </div>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6 }}>
            <strong style={{ color: "#f1f5f9" }}>Shorty's Diner</strong>
            <br />
            {/* // TODO: Replace with real address */}
            123 Duke of Gloucester St
            <br />
            Williamsburg, VA 23185
          </p>
        </div>

        {/* Hours */}
        <div>
          <h3
            style={{
              fontFamily: "'Boogaloo', cursive",
              fontSize: "1.4rem",
              color: "#e11d48",
              marginBottom: "1rem",
            }}
          >
            Hours
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {/* // TODO: Replace with real hours from Google Business Profile or Toast */}
            {[
              { day: "Monday – Friday", hours: "6:00 AM – 2:00 PM" },
              { day: "Saturday", hours: "7:00 AM – 3:00 PM" },
              { day: "Sunday", hours: "7:00 AM – 2:00 PM" },
            ].map((row) => (
              <div
                key={row.day}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.95rem",
                  paddingBottom: "0.6rem",
                  borderBottom: "1px solid #1e293b",
                }}
              >
                <span style={{ color: "#94a3b8" }}>{row.day}</span>
                <span style={{ color: "#f1f5f9", fontWeight: 500 }}>{row.hours}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "1.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1rem",
              background: "#f59e0b15",
              border: "1px solid #f59e0b30",
              borderRadius: "10px",
              color: "#f59e0b",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            <Wifi size={16} />
            Free WiFi — Password on the chalkboard
          </div>
        </div>

        {/* Social */}
        <div>
          <h3
            style={{
              fontFamily: "'Boogaloo', cursive",
              fontSize: "1.4rem",
              color: "#e11d48",
              marginBottom: "1rem",
            }}
          >
            Connect
          </h3>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
            Follow us for daily specials, behind-the-counter stories, and the occasional pancake video.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {/* // TODO: Replace href values with real social links */}
            {[
              { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
              { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
              { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={`Follow Shorty's on ${social.label}`}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "#1e293b",
                  border: "1px solid #334155",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#e11d48";
                  e.currentTarget.style.color = "#e11d48";
                  e.currentTarget.style.background = "#e11d4815";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#334155";
                  e.currentTarget.style.color = "#94a3b8";
                  e.currentTarget.style.background = "#1e293b";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #1e293b",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <p style={{ color: "#475569", fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} Shorty's Diner. All rights reserved. Located in the Heart of Williamsburg, VA.
        </p>
        <div
          style={{
            fontFamily: "'Boogaloo', cursive",
            color: "#e11d48",
            fontSize: "1.1rem",
            textShadow: "0 0 6px #e11d4830",
          }}
        >
          Shorty's
        </div>
      </div>
    </footer>
  );
}
