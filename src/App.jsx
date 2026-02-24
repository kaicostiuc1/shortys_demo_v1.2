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
  Star,
  Coffee,
  Flame,
  Leaf,
  Egg,
  ArrowDown,
  Check,
  Loader2,
  UtensilsCrossed,
  Heart,
  Music,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   SHORTY'S DINER v4 — "The Real Shorty's"
   ────────────────────────────────────────
   Built around actual photos of the diner:
   - Black & white checkered floors
   - Red vinyl booths and curtain valances
   - The Elvis statue by the entrance
   - Rock & Roll neon guitar sign over the kitchen

   Aesthetic: Classic American diner — warm cream, Crimson Red, checkerboard
   pattern. Feels like the place smells like coffee and bacon, not a SaaS app.

   Vite + React + Lucide Icons
   CSS keyframe animations only — no Framer Motion (per spec)
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── IMAGE PATHS (served from /public by Vite) ─────────────────────────────
const IMG = {
  interior: "/shortys-interior.jpg",  // Main dining room — checkered floors, red booths, the crowd
  neon: "/shortys-neon.jpg",          // Rock & Roll neon guitar sign by the kitchen
  elvis: "/shortys-elvis.jpg",        // The Elvis statue — an icon
};

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
// TODO: Replace currentWait with live fetch from Toast Waitlist API endpoint
const currentWait = 12;
const partiesAhead = Math.round(currentWait / 3);

const menuItems = [
  { id: 1, name: "W&M Power Breakfast", price: 14.99, short: "Two eggs, bacon, sausage, home fries & toast", full: "The one that's fueled forty-four years of finals weeks. Two eggs any style, crispy bacon, house-made sausage links, golden home fries, and your choice of sourdough or wheat toast. Comes with bottomless coffee.", tags: ["hearty"], localFave: true },
  { id: 2, name: "Shorty's Short Stack", price: 9.99, short: "Three fluffy buttermilk pancakes", full: "Three buttermilk pancakes from the same recipe we've used since 1980. Golden, fluffy, and served with real butter and warm maple syrup. Add blueberries or chocolate chips for $1.", tags: ["vegetarian"], localFave: false },
  { id: 3, name: "The Colonial Scramble", price: 12.99, short: "Three-egg scramble with peppers, onions & cheddar", full: "A three-egg scramble loaded with roasted bell peppers, sweet onions, sharp cheddar, and served on a warm tortilla or with toast. Pairs perfectly with our house hot sauce.", tags: ["gluten-free option"], localFave: false },
  { id: 4, name: "Biscuits & Gravy", price: 10.99, short: "Scratch-made biscuits smothered in sausage gravy", full: "Two of Shorty's famous scratch-made biscuits split open and drowning in thick, peppery sausage gravy. This is the dish people drive from Richmond for.", tags: ["hearty"], localFave: false },
  { id: 5, name: "Veggie Garden Omelette", price: 11.99, short: "Spinach, tomato, mushroom & Swiss omelette", full: "A three-egg omelette folded around fresh spinach, vine-ripe tomatoes, sliced mushrooms, and melted Swiss. Served with fruit cup and your choice of toast.", tags: ["vegetarian"], localFave: false },
  { id: 6, name: "The Early Bird", price: 7.99, short: "Two eggs, toast & coffee — before 8AM", full: "Simple, affordable, and exactly what you need at 6:30 in the morning. Two eggs any style, toast, and a cup of our bottomless drip coffee. Available until 8 AM only.", tags: ["budget-friendly"], localFave: false },
  { id: 7, name: "Avocado Toast (Yes, Really)", price: 11.49, short: "Smashed avo on sourdough with everything seasoning", full: "We resisted for years, but here we are. Fresh smashed avocado on thick-cut sourdough, topped with everything seasoning, pickled red onion, and a drizzle of chili oil. Add an egg for $1.50.", tags: ["vegetarian", "vegan option"], localFave: false },
  { id: 8, name: "Classic BLT", price: 10.49, short: "Thick-cut bacon, lettuce, tomato, mayo on sourdough", full: "Thick-cut applewood smoked bacon, crisp lettuce, ripe tomato, and house-made mayo on toasted sourdough. Served with a pickle spear and your choice of fries or fruit.", tags: [], localFave: false },
];

// ─── PALETTE ────────────────────────────────────────────────────────────────
const C = {
  cream: "#FBF9F4",
  red: "#e11d48",
  redDark: "#be123c",
  redLight: "#fef2f2",
  redFaint: "#e11d480a",
  checkerDark: "#1a1a1a",
  checkerLight: "#f5f0e8",
  brown: "#2c1810",
  brownMuted: "#8b7355",
  tan: "#f2ede4",
  tanDark: "#e8e0d2",
  border: "#e0d8ca",
  textDark: "#2c1810",
  textMid: "#5c4a3a",
  textLight: "#8b7d6e",
  white: "#ffffff",
};

// ─── APP ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <style>{globalCSS}</style>
      <div style={{ background: C.cream, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: C.textDark }}>
        <Navbar />
        <Hero />
        <Checker />
        <WaitlistSection />
        <Checker />
        <MenuSection />
        <Checker />
        <PhotoStrip />
        <Checker />
        <AboutSection />
        <Footer />
      </div>
    </>
  );
}

// ─── GLOBAL CSS ─────────────────────────────────────────────────────────────

const globalCSS = `
  @keyframes neonWarm {
    0%, 18%, 20%, 22%, 24%, 53%, 55%, 100% {
      text-shadow: 0 0 6px #e11d4850, 0 0 14px #e11d4830, 0 0 28px #e11d4818;
      opacity: 1;
    }
    19%, 23%, 54% { text-shadow: none; opacity: 0.88; }
  }
  @keyframes neonBreath {
    0%, 100% { text-shadow: 0 0 5px #e11d4845, 0 0 12px #e11d4820; }
    50%      { text-shadow: 0 0 3px #e11d4825, 0 0 6px #e11d4810; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseSoft {
    0%, 100% { opacity: 0.65; }
    50%      { opacity: 1; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes tiltIn {
    from { opacity: 0; transform: rotate(0deg) scale(0.9); }
    to   { opacity: 1; }
  }

  .neon-title {
    font-family: 'Boogaloo', cursive;
    color: #e11d48;
    animation: neonWarm 2.8s ease-in-out forwards, neonBreath 4s ease-in-out 2.8s infinite;
  }
  .fade-up { animation: fadeUp 0.7s ease-out both; opacity: 0; }
  .fd1 { animation-delay: .25s; }
  .fd2 { animation-delay: .5s; }
  .fd3 { animation-delay: .75s; }
  .bar-pulse { animation: pulseSoft 2s ease-in-out infinite; }
  .spin { animation: spin 1s linear infinite; }

  html { scroll-behavior: smooth; }

  *:focus-visible {
    outline: 2.5px solid #e11d48;
    outline-offset: 2px;
  }

  /* Prevent horizontal overflow on mobile */
  body { overflow-x: hidden; }
`;

// ─── CHECKERBOARD DIVIDER ───────────────────────────────────────────────────
// Inspired by the actual checkered floor in the diner

function Checker() {
  return (
    <div style={{ display: "flex", width: "100%", height: "14px", overflow: "hidden" }} aria-hidden="true">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} style={{ flex: "1 0 14px", height: "14px", background: i % 2 === 0 ? C.red : C.white }} />
      ))}
    </div>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkColor = scrolled ? C.textMid : "#fff";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "0.65rem 1.25rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(251,249,244,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: scrolled ? `3px solid ${C.red}` : "3px solid transparent",
      transition: "all 0.3s ease",
    }} role="navigation" aria-label="Main navigation">
      <a href="#hero" style={{
        fontFamily: "'Boogaloo', cursive", fontSize: "1.6rem", color: C.red,
        textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem",
      }}>
        <UtensilsCrossed size={18} strokeWidth={2.5} /> Shorty's
      </a>
      <div style={{ display: "flex", gap: "1.25rem" }}>
        {[
          { label: "Waitlist", href: "#waitlist" },
          { label: "Menu", href: "#menu" },
          { label: "Visit", href: "#footer" },
        ].map((l) => (
          <a key={l.href} href={l.href} style={{
            color: linkColor, textDecoration: "none", fontSize: "0.9rem",
            fontWeight: 600, transition: "color 0.2s",
            textShadow: scrolled ? "none" : "0 1px 4px #00000070",
          }}
          onMouseEnter={(e) => e.target.style.color = C.red}
          onMouseLeave={(e) => e.target.style.color = linkColor}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
// Uses the real interior shot — checkered floors, red booths, the whole crowd

function Hero() {
  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", textAlign: "center", overflow: "hidden",
      padding: "2rem 1.25rem",
    }} aria-label="Welcome to Shorty's Diner">

      {/* Real Shorty's interior photo */}
      <img src={IMG.interior} alt="Inside Shorty's Diner — checkered floors, red booths, locals enjoying breakfast"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", zIndex: 0 }} />

      {/* Warm amber tint — matches the diner's warm lighting */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(44, 24, 16, 0.35)", mixBlendMode: "multiply", zIndex: 1 }} />

      {/* Bottom fade to cream */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(180deg,
          transparent 0%,
          rgba(251,249,244,0.08) 35%,
          rgba(251,249,244,0.4) 60%,
          rgba(251,249,244,0.85) 80%,
          ${C.cream} 100%
        )`,
      }} />

      <div style={{ position: "relative", zIndex: 3, maxWidth: "680px" }}>
        {/* Badge */}
        <div className="fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: "0.45rem",
          background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)",
          padding: "0.35rem 0.9rem", borderRadius: "99px",
          border: `1.5px solid ${C.red}35`, color: C.red,
          fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", marginBottom: "1.5rem",
        }}>
          <Coffee size={13} /> Williamsburg, VA · Since 1980
        </div>

        {/* Title */}
        <h1 className="neon-title fade-up fd1" style={{
          fontSize: "clamp(3.2rem, 11vw, 6.5rem)", lineHeight: 0.92, marginBottom: "1rem",
        }}>
          Shorty's Diner
        </h1>

        {/* Tagline */}
        <p className="fade-up fd2" style={{
          fontSize: "clamp(1rem, 2.2vw, 1.25rem)", color: C.textMid,
          fontWeight: 400, marginBottom: "2.25rem", lineHeight: 1.55,
          maxWidth: "500px", margin: "0 auto 2.25rem",
        }}>
          Checkered floors. Red vinyl booths. The same griddle since Reagan.
          Your table's almost ready.
        </p>

        {/* CTAs */}
        <div className="fade-up fd3" style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#waitlist" style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            padding: "0.8rem 1.85rem", background: C.red, color: "#fff",
            fontWeight: 700, fontSize: "1rem", borderRadius: "8px",
            textDecoration: "none", border: "none",
            boxShadow: "0 3px 14px #e11d4830",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.target.style.background = C.redDark; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.target.style.background = C.red; e.target.style.transform = "translateY(0)"; }}>
            Join the Waitlist
          </a>
          <a href="#menu" style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            padding: "0.8rem 1.85rem", background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(6px)", color: C.red, fontWeight: 700,
            fontSize: "1rem", borderRadius: "8px", textDecoration: "none",
            border: `2px solid ${C.red}`, transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.target.style.background = C.redLight; }}
          onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.85)"; }}>
            See the Menu <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── WAITLIST ───────────────────────────────────────────────────────────────

function WaitlistSection() {
  const [form, setForm] = useState({ firstName: "", phoneNumber: "", partySize: "2" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "We need a name for the list!";
    if (!/^\+?[\d\s\-().]{7,15}$/.test(form.phoneNumber.replace(/\s/g, "")))
      e.phoneNumber = "Please enter a valid phone number";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1500));

    // ─── TOAST API INTEGRATION POINT ─────────────────────────────────────────
    // Replace this simulated delay with a real fetch() call:
    //
    // const { firstName, phoneNumber, partySize } = form;
    // const res = await fetch('https://api.toasttab.com/waitlist/v1/entries', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${TOAST_API_KEY}`,
    //   },
    //   body: JSON.stringify({ firstName, phoneNumber, partySize: Number(partySize) }),
    // });
    // if (!res.ok) throw new Error('Waitlist entry failed');
    // ──────────────────────────────────────────────────────────────────────────

    setStatus("success");
  };

  const onChange = (f) => (e) => {
    setForm((p) => ({ ...p, [f]: e.target.value }));
    if (errors[f]) setErrors((p) => ({ ...p, [f]: undefined }));
  };

  const inp = (err) => ({
    width: "100%", padding: "0.85rem 1rem", background: C.white,
    border: `2px solid ${err ? "#ef4444" : C.border}`, borderRadius: "8px",
    color: C.textDark, fontSize: "1rem", fontFamily: "'DM Sans', sans-serif",
    outline: "none", transition: "border-color 0.2s",
  });

  return (
    <section id="waitlist" style={{ padding: "3.5rem 1.25rem", maxWidth: "560px", margin: "0 auto" }} aria-label="Join the Waitlist">
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <h2 style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(1.7rem, 5vw, 2.4rem)", color: C.red, marginBottom: "0.35rem" }}>
          Skip the Door, Not the Food
        </h2>
        <p style={{ color: C.textLight, fontSize: "0.95rem", lineHeight: 1.5 }}>
          Get on our list from your phone. We'll text you when your table's hot.
        </p>
      </div>

      {/* ── Wait Status Card ── */}
      <div style={{ background: C.white, borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 12px rgba(0,0,0,0.06)", marginBottom: "1.25rem" }}
        role="status" aria-live="polite" aria-label={`Current wait: about ${currentWait} minutes`}>
        {/* Checker accent */}
        <div style={{ display: "flex", height: "5px" }} aria-hidden="true">
          {Array.from({ length: 70 }).map((_, i) => (
            <div key={i} style={{ flex: 1, minWidth: "5px", background: i % 2 === 0 ? C.red : C.white }} />
          ))}
        </div>
        <div style={{ padding: "1.15rem 1.35rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: C.redLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Clock size={19} color={C.red} />
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", color: C.textLight, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Current Wait</div>
                <div style={{ fontSize: "1.45rem", fontWeight: 800, color: C.textDark }}>{currentWait} Min</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: C.brownMuted, fontSize: "0.82rem", fontWeight: 600 }}>
              <Users size={14} /> ~{partiesAhead} ahead
            </div>
          </div>
          <div style={{ height: "5px", background: C.tan, borderRadius: "3px", overflow: "hidden", marginTop: "0.85rem" }}
            role="progressbar" aria-valuenow={currentWait} aria-valuemin={0} aria-valuemax={60}>
            <div className="bar-pulse" style={{
              width: `${Math.min((currentWait / 60) * 100, 100)}%`, height: "100%",
              background: `linear-gradient(90deg, ${C.red}, #f59e0b)`, borderRadius: "3px",
            }} />
          </div>
        </div>
      </div>

      {/* ── Form / Success ── */}
      {status === "success" ? (
        <div style={{ background: C.white, border: "2px solid #bbf7d0", borderRadius: "12px", padding: "2.25rem 1.35rem", textAlign: "center", animation: "fadeUp 0.5s ease-out", boxShadow: "0 1px 12px rgba(0,0,0,0.06)" }} role="alert">
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.85rem" }}>
            <Check size={24} color="#16a34a" />
          </div>
          <h3 style={{ fontFamily: "'Boogaloo', cursive", fontSize: "1.6rem", color: "#16a34a", marginBottom: "0.4rem" }}>You're on the list!</h3>
          <p style={{ color: C.textMid, fontSize: "0.95rem", lineHeight: 1.5 }}>
            We'll text you at <strong style={{ color: C.textDark }}>{form.phoneNumber}</strong> when your table is ready.
            Grab a coffee — you've earned it.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate style={{
          background: C.white, border: `2px solid ${C.border}`, borderRadius: "12px",
          padding: "1.6rem 1.35rem", display: "flex", flexDirection: "column", gap: "1rem",
          boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
        }}>
          <Field label="First Name" icon={<User size={13} />} id="firstName" type="text"
            placeholder="What should we call you?" value={form.firstName}
            onChange={onChange("firstName")} disabled={status === "submitting"}
            error={errors.firstName} inputStyle={inp} />

          <Field label="Phone Number" icon={<Phone size={13} />} id="phoneNumber" type="tel"
            placeholder="(757) 555-1234" value={form.phoneNumber}
            onChange={onChange("phoneNumber")} disabled={status === "submitting"}
            error={errors.phoneNumber} inputStyle={inp} />

          <div>
            <label htmlFor="partySize" style={labelStyle}>
              <Users size={13} /> Party Size
            </label>
            <div style={{ position: "relative" }}>
              <select id="partySize" value={form.partySize} onChange={onChange("partySize")}
                disabled={status === "submitting"}
                style={{ ...inp(false), appearance: "none", cursor: "pointer", paddingRight: "2.5rem" }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                ))}
              </select>
              <ChevronDown size={17} color={C.textLight} style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </div>

          <button type="submit" disabled={status === "submitting"} style={{
            width: "100%", padding: "0.9rem", marginTop: "0.15rem",
            background: status === "submitting" ? C.redDark : C.red, color: "#fff",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.02rem",
            border: "none", borderRadius: "8px",
            cursor: status === "submitting" ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
            transition: "all 0.2s ease", boxShadow: "0 2px 12px #e11d4820",
          }}
          onMouseEnter={(e) => { if (status !== "submitting") e.target.style.background = C.redDark; }}
          onMouseLeave={(e) => { if (status !== "submitting") e.target.style.background = C.red; }}>
            {status === "submitting"
              ? <><Loader2 size={18} className="spin" /> Saving your spot...</>
              : "Add My Name — It's Free"}
          </button>
        </form>
      )}
    </section>
  );
}

const labelStyle = { display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", color: C.textMid, marginBottom: "0.35rem", fontWeight: 600 };

function Field({ label, icon, id, type, placeholder, value, onChange, disabled, error, inputStyle }) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{icon} {label}</label>
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
        disabled={disabled} aria-required="true" aria-invalid={!!error}
        style={inputStyle(error)}
        onFocus={(e) => { if (!error) e.target.style.borderColor = C.red; }}
        onBlur={(e) => { if (!error) e.target.style.borderColor = C.border; }} />
      {error && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.2rem", display: "block" }}>{error}</span>}
    </div>
  );
}

// ─── MENU ───────────────────────────────────────────────────────────────────

function MenuSection() {
  return (
    <section id="menu" style={{ padding: "3.5rem 1.25rem", maxWidth: "960px", margin: "0 auto" }} aria-label="Menu">
      <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
        <h2 style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(1.7rem, 5vw, 2.4rem)", color: C.red, marginBottom: "0.35rem" }}>
          Shorty's Staples
        </h2>
        <p style={{ color: C.textLight, fontSize: "0.95rem" }}>The hits. Perfected over 44 years. No PDFs, no squinting.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "0.9rem" }}>
        {menuItems.map((item) => <MenuItem key={item.id} item={item} />)}
      </div>
    </section>
  );
}

function MenuItem({ item }) {
  const [open, setOpen] = useState(false);
  const tags = {
    hearty: { bg: "#fef3c7", color: "#92400e", icon: <Flame size={10} /> },
    vegetarian: { bg: "#dcfce7", color: "#166534", icon: <Leaf size={10} /> },
    "vegan option": { bg: "#dcfce7", color: "#166534", icon: <Leaf size={10} /> },
    "gluten-free option": { bg: "#ede9fe", color: "#5b21b6", icon: <Egg size={10} /> },
    "budget-friendly": { bg: "#e0f2fe", color: "#075985", icon: <Star size={10} /> },
  };

  return (
    <div role="article" tabIndex={0}
      onClick={() => setOpen(!open)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(!open); } }}
      aria-expanded={open}
      style={{
        background: C.white, border: `2px solid ${open ? C.red + "40" : C.border}`,
        borderRadius: "10px", padding: "1.15rem", cursor: "pointer",
        transition: "all 0.2s ease", position: "relative", overflow: "hidden",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.red + "45"; e.currentTarget.style.boxShadow = "0 3px 16px rgba(0,0,0,0.05)"; }}
      onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}>
      {item.localFave && (
        <div style={{
          position: "absolute", top: "0.75rem", right: "0.75rem",
          padding: "0.15rem 0.5rem", background: "#fef3c7", border: "1.5px solid #fbbf2450",
          borderRadius: "99px", fontSize: "0.68rem", fontWeight: 700, color: "#92400e",
        }}>⭐ Local's Pick</div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.3rem", paddingRight: item.localFave ? "6rem" : 0 }}>
        <h3 style={{ fontWeight: 700, fontSize: "1rem", color: C.textDark }}>{item.name}</h3>
        <span style={{ fontWeight: 800, fontSize: "1rem", color: C.red, whiteSpace: "nowrap", marginLeft: "0.5rem" }}>${item.price.toFixed(2)}</span>
      </div>
      <p style={{ color: C.textLight, fontSize: "0.88rem", lineHeight: 1.4, marginBottom: "0.5rem" }}>{item.short}</p>
      {item.tags.length > 0 && (
        <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: open ? "0.5rem" : 0 }}>
          {item.tags.map((t) => { const s = tags[t] || {}; return (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem", padding: "0.12rem 0.45rem", borderRadius: "99px", fontSize: "0.68rem", fontWeight: 600, background: s.bg, color: s.color }}>{s.icon}{t}</span>
          ); })}
        </div>
      )}
      {open && (
        <div style={{ animation: "fadeUp 0.3s ease-out", borderTop: `1px solid ${C.border}`, paddingTop: "0.5rem", marginTop: "0.2rem" }}>
          <p style={{ color: C.textMid, fontSize: "0.88rem", lineHeight: 1.55 }}>{item.full}</p>
        </div>
      )}
    </div>
  );
}

// ─── PHOTO STRIP — Real Shorty's ────────────────────────────────────────────
// Polaroid-style cards using actual diner photos

function PhotoStrip() {
  const photos = [
    { src: IMG.interior, caption: "The checkered floor. The red booths. Home.", tilt: -2.2 },
    { src: IMG.neon, caption: "Rock & Roll lives above the griddle.", tilt: 1.6 },
    { src: IMG.elvis, caption: "The King greets everyone at the door.", tilt: -1.4 },
  ];

  return (
    <section id="gallery" style={{ padding: "3.5rem 1.25rem", background: C.tan }} aria-label="Scenes from Shorty's">
      <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
        <h2 style={{ fontFamily: "'Boogaloo', cursive", fontSize: "clamp(1.7rem, 5vw, 2.4rem)", color: C.red, marginBottom: "0.35rem" }}>
          Scenes from the Counter
        </h2>
        <p style={{ color: C.textLight, fontSize: "0.95rem" }}>
          Can't fake 44 years of character. This is the real deal.
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.75rem", maxWidth: "920px", margin: "0 auto" }}>
        {photos.map((p, i) => (
          <div key={i} style={{
            background: C.white, padding: "0.6rem 0.6rem 2.25rem", borderRadius: "3px",
            boxShadow: "0 3px 18px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.05)",
            transform: `rotate(${p.tilt}deg)`, transition: "transform 0.3s ease, box-shadow 0.3s ease",
            maxWidth: "270px", width: "100%",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(0deg) scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.13)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${p.tilt}deg) scale(1)`; e.currentTarget.style.boxShadow = "0 3px 18px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.05)"; }}>
            <img src={p.src} alt={p.caption} style={{ width: "100%", aspectRatio: i === 2 ? "3/4" : "4/3", objectFit: "cover", borderRadius: "2px", display: "block" }} />
            <p style={{ fontFamily: "'Boogaloo', cursive", fontSize: "0.95rem", color: C.textMid, textAlign: "center", marginTop: "0.6rem", lineHeight: 1.2, padding: "0 0.25rem" }}>
              {p.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section style={{ padding: "3.5rem 1.25rem", maxWidth: "660px", margin: "0 auto" }} aria-label="About Shorty's">
      <div style={{
        background: C.white, border: `2px solid ${C.border}`, borderRadius: "14px",
        padding: "2.25rem 1.75rem", boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: C.red }} aria-hidden="true" />
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.85rem" }}>
          <Heart size={18} color={C.red} fill={C.red} />
          <h3 style={{ fontFamily: "'Boogaloo', cursive", fontSize: "1.4rem", color: C.red }}>From Behind the Counter</h3>
        </div>
        <div style={{ color: C.textMid, fontSize: "0.95rem", lineHeight: 1.7 }}>
          <p style={{ marginBottom: "0.85rem" }}>We started Shorty's in 1980 with one griddle, one coffee pot, and the belief that if you treat people right and cook honest food, they'll keep coming back. Forty-four years later, the philosophy hasn't changed — even if the griddle has (twice).</p>
          <p style={{ marginBottom: "0.85rem" }}>We finally retired the paper notebook we used to manage the waitlist. Don't worry — Shorty still writes the daily specials by hand. Some things are sacred. Now your phone does the waiting so you don't have to stand by Elvis.</p>
          <p>Whether you're a William & Mary freshman or a retiree who's had the same booth since before the checkered floor was checkered — pull up a chair. There's always room.</p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="footer" style={{ background: C.tan }} role="contentinfo">
      <Checker />
      <div style={{ padding: "3rem 1.25rem 1.25rem", maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.25rem", marginBottom: "2.25rem" }}>

          {/* Location */}
          <div>
            <h3 style={{ fontFamily: "'Boogaloo', cursive", fontSize: "1.25rem", color: C.red, marginBottom: "0.75rem" }}>Find Us</h3>
            {/* TODO: Replace with Google Maps embed */}
            <div style={{ width: "100%", aspectRatio: "16/10", borderRadius: "8px", background: C.white, border: `2px solid ${C.border}`, position: "relative", overflow: "hidden", marginBottom: "0.75rem" }}
              role="img" aria-label="Map showing Shorty's Diner in Williamsburg, VA">
              <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border}80 1px, transparent 1px), linear-gradient(90deg, ${C.border}80 1px, transparent 1px)`, backgroundSize: "18px 18px" }} />
              <div style={{ position: "absolute", top: "44%", left: "51%", transform: "translate(-50%,-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <MapPin size={28} color={C.red} fill={C.red} />
                <div style={{ marginTop: "0.15rem", background: C.red, color: "#fff", fontSize: "0.6rem", fontWeight: 800, padding: "0.1rem 0.4rem", borderRadius: "3px" }}>SHORTY'S</div>
              </div>
            </div>
            <p style={{ color: C.textMid, fontSize: "0.88rem", lineHeight: 1.5 }}>
              <strong style={{ color: C.textDark }}>Shorty's Diner</strong><br />
              {/* TODO: Replace with actual address */}
              1137 Jamestown Rd<br />Williamsburg, VA 23185
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 style={{ fontFamily: "'Boogaloo', cursive", fontSize: "1.25rem", color: C.red, marginBottom: "0.75rem" }}>Hours</h3>
            {/* TODO: Replace with real hours */}
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

          {/* Social */}
          <div>
            <h3 style={{ fontFamily: "'Boogaloo', cursive", fontSize: "1.25rem", color: C.red, marginBottom: "0.75rem" }}>Connect</h3>
            <p style={{ color: C.textLight, fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "0.85rem" }}>
              Daily specials, diner stories, and the occasional pancake video.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {/* TODO: Replace with real social URLs */}
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

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.4rem" }}>
          <p style={{ color: C.textLight, fontSize: "0.75rem" }}>© {new Date().getFullYear()} Shorty's Diner · Williamsburg, VA</p>
          <div style={{ fontFamily: "'Boogaloo', cursive", color: C.red, fontSize: "1rem" }}>Shorty's</div>
        </div>
      </div>
    </footer>
  );
}
