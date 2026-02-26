import { useState, useEffect, useRef } from "react";
import {
  Clock, Users, Phone, User, ChevronDown, MapPin, Wifi,
  Instagram, Facebook, Twitter, Star, Coffee, Flame, Leaf, Egg,
  ArrowDown, Check, Loader2, UtensilsCrossed, Heart, Sunrise, Sun, 
  ExternalLink, CalendarDays, ChevronRight, Building2
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   SHORTY'S DINER v5 — Final Polish
   ─────────────────────────────────
   Changes from v4:
   • Hero: stronger gradient overlay + text-shadow for legibility
   • Menu: Real items from the official May 2024 Breakfast & Lunch PDFs
     in a tabbed, categorized, responsive grid with diner personality
   ═══════════════════════════════════════════════════════════════════════════ */

const IMG = {
  interior: "/hero-diner.jpg",
  neon: "/shortys-neon.jpg",
  elvis: "/shortys-elvis.jpg",
};

// ─── PALETTE ────────────────────────────────────────────────────────────────
const C = {
  cream: "#FBF9F4", red: "#e11d48", redDark: "#be123c", redLight: "#fef2f2",
  redFaint: "#e11d480a", tan: "#f2ede4", tanDark: "#e8e0d2",
  border: "#e0d8ca", textDark: "#2c1810", textMid: "#5c4a3a",
  textLight: "#8b7d6e", brownMuted: "#8b7355", white: "#ffffff",
};

//----LOCATIONS----------------------------------------------------------------
const LOCATIONS = {
  williamsburg: {
    id: "williamsburg",
    name: "Williamsburg",
    label: "The Original · Est. 1980",
    address: "627 Merrimac Trail",
    city: "Williamsburg, VA 23185",
    phone: "(757) 253-1080",
    flagship: true,
    // Flagship uses on-site waitlist (WaitlistSection component)
    toastOrderUrl: "https://order.toasttab.com/online/shortys-diner-627-merrimac-trl",
  },
  yorktown: {
    id: "yorktown",
    name: "Yorktown",
    label: "Now Open",
    address: "6500 George Washington Memorial Hwy A",
    city: "Yorktown, VA 23692",
    phone: "(757) 867-8777",
    flagship: false,
    // TODO: Replace with actual Toast ordering portal URL
    toastOrderUrl: "https://order.toasttab.com/online/shortys-diner-yorktown-6500-george-washington-memorial-highway",
  },
  richmond: {
    id: "richmond",
    name: "Richmond",
    label: "Now Open",
    address: "5625 W Broad St",
    city: "Richmond, VA 23230",
    phone: "(804) 308-2070",
    flagship: false,
    // TODO: Replace with actual Toast ordering portal URL
    toastOrderUrl: "https://shortysdinerbroad.toast.site/order/shortys-diner-rva-5625-west-broad-street",
  },
};


// ─── REAL MENU DATA (from Shorty's Diner May 2024 menus) ────────────────────

const breakfastMenu = {
  "Signature Plates": [
    { name: "Shorty's Classic Sampler", price: "16.95", desc: "2 eggs any style, 2 bacon, 1 sausage patty, Virginia ham & a buttermilk pancake or French toast. With hash browns, home fries or grits.", badge: "Fan Favorite" },
    { name: "Shorty's Special", price: "10.99", desc: "3 eggs any style, choice of bacon, Virginia ham, sausage patty or links. With hash browns, home fries or grits & toast or biscuit." },
    { name: "Steak & Eggs", price: "19.99", desc: "3 eggs any style, 6oz. New York strip cooked to order. With hash browns, home fries or grits & toast or biscuit." },
    { name: "Country Fried Steak", price: "13.50", desc: "3 eggs any style, 8oz. fried beef steak smothered in homemade country gravy. With hash browns, home fries or grits." },
    { name: "The Hangover", price: "13.95", desc: "2 eggs any style on top of a large portion of corned beef hash. Served with a half order of biscuits & gravy. A SURE CURE!", badge: "Cure-All" },
    { name: "Shorty's Garbage Plate", price: "11.95", desc: "A little bit of everything — hash browns, scrambled eggs with melted cheddar & sausage gravy, with your choice of bacon, sausage or ham." },
  ],
  "Eggs Benedict": [
    { name: "Eggs Benedict", price: "14.25", desc: "2 poached eggs & thick cut Canadian bacon on a toasted English muffin. Topped with hollandaise sauce & home fries." },
    { name: "Country Eggs Benedict", price: "14.95", desc: "2 poached eggs & a fresh sausage patty on a buttermilk biscuit. Topped with sausage gravy & home fries." },
  ],
  "Omelets": [
    { name: "Western", price: "15.95", desc: "Diced ham, fresh tomato, green peppers, onions & cheddar." },
    { name: "Meat Lovers", price: "15.95", desc: "Bacon, Virginia ham, sausage & cheddar cheese." },
    { name: "Shorty's Cuban", price: "15.95", desc: "House-made Cuban spiced pork, sliced ham, pickles & sautéed cabbage with Swiss & Cuban sauce." },
    { name: "Vegetable", price: "14.95", desc: "Chopped fresh tomato, green peppers, onions, mushrooms & provolone.", tags: ["vegetarian"] },
    { name: "Russian", price: "14.95", desc: "Stuffed with shredded hash browns, onions, cheddar & topped with sour cream." },
    { name: "Ham & Cheese", price: "12.95", desc: "Diced ham with cheddar cheese." },
    { name: "Cheese", price: "11.25", desc: "Stuffed with cheddar cheese.", tags: ["vegetarian"] },
    { name: "Build Your Own", price: "13.95", desc: "Use your imagination! Includes one meat, each additional topping $1.00." },
  ],
  "Pancakes & French Toast": [
    { name: "Shorty's Special Cakes", price: "9.50", desc: "2 large buttermilk pancakes topped with butter & powdered sugar." },
    { name: "Chocolate Chip", price: "10.95", desc: "2 large buttermilk pancakes filled with chocolate chips & powdered sugar." },
    { name: "Banana", price: "11.25", desc: "2 large buttermilk pancakes with sliced bananas, fresh banana cream & powdered sugar." },
    { name: "Blueberry", price: "10.95", desc: "2 buttermilk pancakes loaded with blueberries, topped with butter & powdered sugar." },
    { name: "Granola", price: "11.25", desc: "2 pancakes topped with Ms. Bonnie's homemade granola, butter & powdered sugar." },
    { name: "French Toast", price: "10.95", desc: "3 slices of thick Texas toast topped with butter & powdered sugar." },
    { name: "The Monte Cristo", price: "12.50", desc: "2 thick pieces of French toast, melted Swiss, Black Forest ham & applewood bacon with house-made strawberry mayo." },
  ],
  "Sandwiches & Quick Bites": [
    { name: "Breakfast Sandwich", price: "7.50", desc: "2 bacon or sausage patty & fried egg with American cheese on a biscuit, English muffin or toast." },
    { name: "Fried Egg & Cheese", price: "6.50", desc: "Fried egg topped with American cheese on your choice of biscuit, English muffin or toast." },
    { name: "Shorty's Burrito", price: "11.99", desc: "3 eggs, cheese, hash browns & your choice of bacon, ham or sausage — all wrapped up!" },
    { name: "Biscuits & Sausage Gravy", price: "9.50", desc: "Our own buttermilk biscuits smothered with homemade country sausage gravy. Half order $7.25." },
    { name: "Country Ham Biscuit", price: "5.95", desc: "Thin-sliced original aged country ham on a fresh buttermilk biscuit. 2 biscuits $9.95." },
    { name: "Corned Beef Hash", price: "13.50", desc: "Large portion of our corned beef hash with 3 eggs any style & toast or biscuit." },
  ],
  "Lite Fare": [
    { name: "2 Eggs, Toast & Jelly", price: "5.75", desc: "Simple and satisfying." },
    { name: "2 Eggs, Home Fries, Toast", price: "7.50", desc: "A solid start to your morning." },
    { name: "2 Eggs, Meat, Toast", price: "8.25", desc: "With your choice of breakfast meat." },
    { name: "Fresh Made Oatmeal", price: "6.95", desc: "Steaming hot oatmeal with cinnamon & brown sugar. Add fruit $1.00." },
  ],
};

const lunchMenu = {
  "Burgers": [
    { name: "Shorty's ¼lb Burger", price: "11.95", desc: "100% all-beef, hand-pressed patty with American cheese on a brioche bun. Lettuce, tomato & pickle.", badge: "Classic" },
    { name: "Shorty's ½lb Burger", price: "13.95", desc: "The bigger brother — same famous hand-pressed beef, American cheese, brioche bun, lettuce, tomato & pickle." },
    { name: "Open Faced ½lb Burger", price: "13.95", desc: "Over Texas toast & fresh-cut fries, smothered in sautéed mushrooms & onions with house brown gravy." },
    { name: "Patty Melt", price: "12.95", desc: "Thick ½lb patty, grilled onions & Swiss cheese on our grilled rye bread." },
  ],
  "Sandwiches": [
    { name: "Philly Cheese Steak", price: "12.95", desc: "Sliced steak with sautéed onions, green peppers & mushrooms. Melted provolone & mayo on a toasted hoagie." },
    { name: "Cuban Sandwich", price: "12.95", desc: "Shorty's Cuban spiced pork & ham with Swiss, pickles & our Cuban red cabbage slaw on a sub roll." },
    { name: "Classic or Turkey Reuben", price: "13.50", desc: "House-made corned beef or turkey piled high with sauerkraut, 1000 island & Swiss on grilled rye." },
    { name: "Triple Decker Club", price: "12.95", desc: "Black Forest ham, oven roasted turkey & American cheese on top of bacon, lettuce, tomato & mayo." },
    { name: "Hot Pastrami & Swiss", price: "12.95", desc: "Our house-made pastrami piled high on grilled rye with Swiss & Gulden's mustard." },
    { name: "Pork Tenderloin", price: "12.95", desc: "Jumbo fried pork tenderloin on a brioche bun with lettuce, tomato & our house bistro sauce." },
    { name: "Fried Fish Sandwich", price: "13.25", desc: "Local James River southern fried catfish on toasted brioche with Ms. Bonnie's tartar sauce." },
    { name: "BBQ Sandwich", price: "12.50", desc: "Hot off the smoker with our family's special barbecue sauce on a roll with Ms. Bonnie's cole slaw." },
    { name: "Shorty's Italian Sub", price: "13.95", desc: "Oven gold turkey, ham & hard salami with melted provolone, pickles, red onions & Mom's vinaigrette.", badge: "Family Classic" },
    { name: "B.L.T.", price: "11.95", desc: "Thick-cut applewood bacon, lettuce, tomato & mayo on Texas toast." },
    { name: "Grilled Cheese", price: "9.25", desc: "Cheddar, American or white American, grilled on Texas toast. Add soup +$3.95." },
    { name: "Chicken Salad Sandwich", price: "12.25", desc: "Ms. Bonnie's delicious homemade chicken salad with lettuce, tomato & mayo on Texas toast." },
    { name: "Fried Bologna", price: "11.95", desc: "Thick sliced German bologna, American cheese, lettuce, tomato & mayo on brioche." },
    { name: "Tuna Melt", price: "12.50", desc: "Ms. Bonnie's tuna salad on grilled Texas toast with American cheese." },
  ],
  "Chicken": [
    { name: "Grilled/Fried Chicken Sandwich", price: "12.95", desc: "Grilled or fried breast with provolone on a bun. Lettuce, tomato & house honey mustard." },
    { name: "Chicken Tenders", price: "12.50", desc: "Fresh hand-battered chicken strips with house-made honey mustard sauce." },
    { name: "Buffalo Chicken Wrap", price: "12.25", desc: "Crispy chicken strips tossed in house buffalo sauce with cheddar, lettuce & tomato." },
    { name: "Turkey Bacon Ranch Wrap", price: "13.25", desc: "Oven gold turkey, applewood bacon, cheddar, lettuce, tomato & our house ranch." },
  ],
  "Salads": [
    { name: "Chef Salad", price: "14.95", desc: "Black Forest ham, oven gold turkey, American & Swiss on fresh greens with boiled egg & crumbled bacon." },
    { name: "Greek Salad", price: "14.95", desc: "Feta cheese, red onions, kalamata olives, pepperoncini & our special Greek dressing.", tags: ["vegetarian"] },
    { name: "Caesar Salad Shorty's Style", price: "11.95", desc: "Iceberg lettuce tossed with tomatoes, onions, croutons & our own Caesar dressing." },
    { name: "Garden Salad", price: "6.95", desc: "Crisp greens, cucumber, onion, tomato, croutons & shredded cheese. Large $9.95.", tags: ["vegetarian"] },
    { name: "Chicken Salad or Tuna Plate", price: "12.25", desc: "On a bed of shredded lettuce with sliced tomato, garnished with apple slices." },
  ],
  "Dogs & Sides": [
    { name: "¼lb Beef Hot Dog", price: "10.95", desc: "All-beef dog on toasted bun with your choice of 2 toppings: chili, onions, cheese, cole slaw, sauerkraut or relish." },
    { name: "Shorty's Fresh Cut Fries", price: "3.75", desc: "Hand-cut and fried to golden perfection." },
    { name: "Ms. Bonnie's Cole Slaw", price: "3.50", desc: "Homemade. Creamy. The perfect side." },
    { name: "Potato Salad", price: "3.50", desc: "House-made and always fresh." },
  ],
};

const weeklySpecials = [
  { day: "Monday", name: "Hot Turkey Sandwich Plate", desc: "Oven-baked turkey on Texas toast with mashed potatoes, turkey gravy, corn & cranberry sauce." },
  { day: "Tuesday", name: "Tony's Tuesday", desc: "A family favorite — check the specials board and see what Tony comes up with today!" },
  { day: "Wednesday", name: "Fried Chicken Livers", desc: "Ms. Bonnie's crispy fried chicken livers with vegetable of the day, mashed potatoes & gravy." },
  { day: "Thursday", name: "Meatloaf", desc: "Homemade meatloaf with mashed potatoes & gravy, green beans & a dinner roll." },
  { day: "Friday", name: "Southern Fried Catfish", desc: "Fresh local catfish with Shorty's fresh-cut fries, coleslaw & corn bread." },
];

// ─── MOCK WAITLIST DATA ─────────────────────────────────────────────────────
// TODO: Replace with live fetch from Toast Waitlist API endpoint
const currentWait = 12;
const partiesAhead = Math.round(currentWait / 3);

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

// ─── CSS ────────────────────────────────────────────────────────────────────

const globalCSS = `
  @keyframes neonWarm {
    0%,18%,20%,22%,24%,53%,55%,100% {
      text-shadow: 0 0 6px #e11d4850, 0 0 14px #e11d4830, 0 0 28px #e11d4818;
      opacity: 1;
    }
    19%,23%,54% { text-shadow: none; opacity: 0.88; }
  }
  @keyframes neonBreath {
    0%,100% { text-shadow: 0 0 5px #e11d4845, 0 0 12px #e11d4820; }
    50%     { text-shadow: 0 0 3px #e11d4825, 0 0 6px #e11d4810; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseSoft {
    0%,100% { opacity: 0.65; }
    50%     { opacity: 1; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .neon-title {
    font-family:'Boogaloo',cursive; color:#e11d48;
    animation: neonWarm 2.8s ease-in-out forwards, neonBreath 4s ease-in-out 2.8s infinite;
  }
  .fade-up { animation: fadeUp 0.7s ease-out both; opacity:0; }
  .fd1 { animation-delay:.25s } .fd2 { animation-delay:.5s } .fd3 { animation-delay:.75s }
  .bar-pulse { animation: pulseSoft 2s ease-in-out infinite; }
  .spin { animation: spin 1s linear infinite; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }
  *:focus-visible { outline: 2.5px solid #e11d48; outline-offset: 2px; }
`;

// ─── CHECKER DIVIDER ────────────────────────────────────────────────────────

function Checker() {
  return (
    <div style={{ display: "flex", width: "100%", height: "14px", overflow: "hidden" }} aria-hidden="true">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} style={{ flex: "1 0 14px", height: "14px", background: i % 2 === 0 ? C.red : C.white }} />
      ))}
    </div>
  );
}

function MiniChecker({ height = 5, count = 70 }) {
  return (
    <div style={{ display: "flex", height: `${height}px` }} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ flex: 1, minWidth: `${height}px`, background: i % 2 === 0 ? C.red : C.white }} />
      ))}
    </div>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setLocOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const lc = scrolled ? C.textMid : "#fff";
  const txtShadow = scrolled ? "none" : "0 1px 4px #00000070";

  const linkStyle = {
    color: lc, textDecoration: "none", fontSize: "0.9rem",
    fontWeight: 600, transition: "color 0.2s", textShadow: txtShadow,
    background: "none", border: "none", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", padding: 0,
  };

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

      {/* Logo */}
      <a href="#hero" style={{
        fontFamily: "'Boogaloo', cursive", fontSize: "1.6rem", color: C.red,
        textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem",
      }}>
        <UtensilsCrossed size={18} strokeWidth={2.5} /> Shorty's
      </a>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "1.1rem", alignItems: "center" }}>
        {/* Waitlist */}
        <a href="#waitlist" style={linkStyle}
          onMouseEnter={(e) => e.target.style.color = C.red}
          onMouseLeave={(e) => e.target.style.color = lc}>
          Waitlist
        </a>

        {/* Menu */}
        <a href="#menu" style={linkStyle}
          onMouseEnter={(e) => e.target.style.color = C.red}
          onMouseLeave={(e) => e.target.style.color = lc}>
          Menu
        </a>

        {/* ── Locations Dropdown ── */}
        <div ref={dropRef} style={{ position: "relative" }}>
          <button
            onClick={() => setLocOpen(!locOpen)}
            aria-expanded={locOpen}
            aria-haspopup="true"
            style={{
              ...linkStyle,
              display: "flex", alignItems: "center", gap: "0.2rem",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = C.red}
            onMouseLeave={(e) => { if (!locOpen) e.currentTarget.style.color = lc; }}
          >
            Locations
            <ChevronDown size={14} style={{
              transform: locOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }} />
          </button>

          {/* Dropdown Panel */}
          {locOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              background: C.white, border: `2px solid ${C.border}`,
              borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              minWidth: "260px", overflow: "hidden",
              animation: "fadeUp 0.2s ease-out",
            }}>
              {/* Checkerboard accent bar */}
              <div style={{ display: "flex", height: "4px" }} aria-hidden="true">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, minWidth: "4px", background: i % 2 === 0 ? C.red : C.white }} />
                ))}
              </div>

              {/* Location Items */}
              {Object.values(LOCATIONS).map((loc) => (
                <a
                  key={loc.id}
                  href={loc.flagship ? "#footer" : (loc.toastOrderUrl || "#")}
                  target={loc.flagship ? undefined : "_blank"}
                  rel={loc.flagship ? undefined : "noopener noreferrer"}
                  onClick={() => {
                    setLocOpen(false);
                    if (loc.flagship) {
                      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "0.8rem 1rem", textDecoration: "none",
                    borderBottom: `1px solid ${C.border}`,
                    transition: "background 0.15s", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = C.redLight}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <div>
                    <div style={{
                      fontWeight: 700, fontSize: "0.9rem", color: C.textDark,
                      display: "flex", alignItems: "center", gap: "0.35rem",
                    }}>
                      <MapPin size={13} color={C.red} />
                      {loc.name}
                      {loc.flagship && (
                        <span style={{
                          fontSize: "0.58rem", fontWeight: 800, background: C.red,
                          color: "#fff", padding: "0.08rem 0.35rem", borderRadius: "99px",
                          letterSpacing: "0.03em", textTransform: "uppercase",
                        }}>Flagship</span>
                      )}
                      {!loc.flagship && (
                        <span style={{
                          fontSize: "0.58rem", fontWeight: 700, background: "#dcfce7",
                          color: "#166534", padding: "0.08rem 0.35rem", borderRadius: "99px",
                        }}>{loc.label}</span>
                      )}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: C.textLight, marginTop: "0.15rem" }}>
                      {loc.address}, {loc.city}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: C.brownMuted, marginTop: "0.1rem" }}>
                      {loc.phone}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, marginLeft: "0.75rem" }}>
                    {loc.flagship ? (
                      <ChevronRight size={14} color={C.textLight} />
                    ) : (
                      <ExternalLink size={13} color={C.red} />
                    )}
                  </div>
                </a>
              ))}

              {/* Catering CTA */}
              <a
                href="#catering"
                onClick={() => {
                  setLocOpen(false);
                  document.getElementById("catering")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "0.8rem 1rem", textDecoration: "none",
                  transition: "background 0.15s", cursor: "pointer",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = C.redLight}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <div style={{
                  fontWeight: 700, fontSize: "0.9rem", color: C.textDark,
                  display: "flex", alignItems: "center", gap: "0.35rem",
                }}>
                  <CalendarDays size={13} color={C.red} />
                  Catering & Events
                </div>
                <ChevronRight size={14} color={C.textLight} />
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── HERO (FIXED LEGIBILITY) ────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      alignItems: "center", textAlign: "center", overflow: "hidden",
      padding: "2rem 1.25rem",
    }} aria-label="Welcome to Shorty's Diner">

      <img src={IMG.interior}
        alt="Inside Shorty's Diner — checkered floors, red booths, locals enjoying breakfast"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", zIndex: 0 }} />

      {/* FIXED: Stronger overlay for text legibility — dark bottom half */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: `linear-gradient(180deg,
          rgba(30, 15, 8, 0.35) 0%,
          rgba(30, 15, 8, 0.50) 30%,
          rgba(30, 15, 8, 0.60) 50%,
          rgba(251,249,244, 0.70) 75%,
          ${C.cream} 100%
        )`,
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "680px" }}>
        <div className="fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: "0.45rem",
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
          padding: "0.35rem 0.9rem", borderRadius: "99px",
          border: `1.5px solid ${C.red}35`, color: C.red,
          fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", marginBottom: "1.5rem",
        }}>
          <Coffee size={13} /> Williamsburg, VA · `${new Date().getFullYear() - 1980} Years on the Griddle`
        </div>

        <h1 className="neon-title fade-up fd1" style={{
          fontSize: "clamp(3.2rem, 11vw, 6.5rem)", lineHeight: 0.92, marginBottom: "1rem",
          /* Extra shadow for legibility over photo */
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
        }}>
          Shorty's Diner
        </h1>

        {/* FIXED: White text with heavy shadow for readability */}
        <p className="fade-up fd2" style={{
          fontSize: "clamp(1.05rem, 2.3vw, 1.3rem)",
          color: "#ffffff",
          fontWeight: 500, marginBottom: "2.25rem", lineHeight: 1.55,
          maxWidth: "500px", margin: "0 auto 2.25rem",
          textShadow: "0 1px 3px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.4)",
        }}>
          
          <br />It’s not fancy... It’s not fat-free... It’s just the way it used to be.
        </p>

        <div className="fade-up fd3" style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#waitlist" style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            padding: "0.8rem 1.85rem", background: C.red, color: "#fff",
            fontWeight: 700, fontSize: "1rem", borderRadius: "8px",
            textDecoration: "none", border: "none",
            boxShadow: "0 3px 14px #e11d4835, 0 2px 8px rgba(0,0,0,0.2)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.target.style.background = C.redDark; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.target.style.background = C.red; e.target.style.transform = "translateY(0)"; }}>
            Join the Waitlist
          </a>
          {/* 🔥 NEW: Flagship Order Online Button */}
  <a href={LOCATIONS.williamsburg.toastOrderUrl} target="_blank" rel="noopener noreferrer" 
     style={{ 
       display: "inline-flex", alignItems: "center", gap: "0.45rem",
       padding: "0.8rem 1.85rem", background: "rgba(255,255,255,0.9)",
       color: C.red, fontWeight: 700, fontSize: "1rem", borderRadius: "8px",
       textDecoration: "none", border: `2px solid ${C.red}`,
       boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
       transition: "all 0.2s ease"
     }}
     onMouseEnter={(e) => { e.target.style.background = C.redLight; }}
     onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.9)"; }}>
    Order for Pickup <ExternalLink size={16} />
  </a>
          <a href="#menu" style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            padding: "0.8rem 1.85rem", background: "rgba(255,255,255,0.9)",
            color: C.red, fontWeight: 700, fontSize: "1rem", borderRadius: "8px",
            textDecoration: "none", border: `2px solid ${C.red}`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.target.style.background = C.redLight; }}
          onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.9)"; }}>
            What's Cookin' <ArrowDown size={16} />
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
    // const { firstName, phoneNumber, partySize } = form;
    // const res = await fetch('https://api.toasttab.com/waitlist/v1/entries', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOAST_API_KEY}` },
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
    color: C.textDark, fontSize: "1rem", fontFamily: "'DM Sans',sans-serif",
    outline: "none", transition: "border-color 0.2s",
  });
  const lbl = { display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", color: C.textMid, marginBottom: "0.35rem", fontWeight: 600 };

  return (
    <section id="waitlist" style={{ padding: "3.5rem 1.25rem", maxWidth: "560px", margin: "0 auto" }} aria-label="Join the Waitlist">
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <h2 style={{ fontFamily: "'Boogaloo',cursive", fontSize: "clamp(1.7rem,5vw,2.4rem)", color: C.red, marginBottom: "0.35rem" }}>Skip the Door, Not the Food</h2>
        <p style={{ color: C.textLight, fontSize: "0.95rem", lineHeight: 1.5 }}>Get on our list from your phone. We'll text you when your table's hot.</p>
      </div>

      {/* Status card */}
      <div style={{ background: C.white, borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 12px rgba(0,0,0,0.06)", marginBottom: "1.25rem" }} role="status" aria-live="polite">
        <MiniChecker />
        <div style={{ padding: "1.15rem 1.35rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: C.redLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Clock size={19} color={C.red} /></div>
              <div>
                <div style={{ fontSize: "0.7rem", color: C.textLight, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Current Wait</div>
                <div style={{ fontSize: "1.45rem", fontWeight: 800, color: C.textDark }}>{currentWait} Min</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: C.brownMuted, fontSize: "0.82rem", fontWeight: 600 }}><Users size={14} /> ~{partiesAhead} ahead</div>
          </div>
          <div style={{ height: "5px", background: C.tan, borderRadius: "3px", overflow: "hidden", marginTop: "0.85rem" }} role="progressbar" aria-valuenow={currentWait} aria-valuemin={0} aria-valuemax={60}>
            <div className="bar-pulse" style={{ width: `${Math.min((currentWait / 60) * 100, 100)}%`, height: "100%", background: `linear-gradient(90deg,${C.red},#f59e0b)`, borderRadius: "3px" }} />
          </div>
        </div>
      </div>

      {status === "success" ? (
        <div style={{ background: C.white, border: "2px solid #bbf7d0", borderRadius: "12px", padding: "2.25rem 1.35rem", textAlign: "center", animation: "fadeUp 0.5s ease-out", boxShadow: "0 1px 12px rgba(0,0,0,0.06)" }} role="alert">
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.85rem" }}><Check size={24} color="#16a34a" /></div>
          <h3 style={{ fontFamily: "'Boogaloo',cursive", fontSize: "1.6rem", color: "#16a34a", marginBottom: "0.4rem" }}>You're on the list!</h3>
          <p style={{ color: C.textMid, fontSize: "0.95rem", lineHeight: 1.5 }}>We'll text you at <strong style={{ color: C.textDark }}>{form.phoneNumber}</strong> when your table is ready.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate style={{ background: C.white, border: `2px solid ${C.border}`, borderRadius: "12px", padding: "1.6rem 1.35rem", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 1px 12px rgba(0,0,0,0.06)" }}>
          <div>
            <label htmlFor="fn" style={lbl}><User size={13} /> First Name</label>
            <input id="fn" type="text" placeholder="What should we call you?" value={form.firstName} onChange={onChange("firstName")} disabled={status === "submitting"} aria-required="true" style={inp(errors.firstName)}
              onFocus={(e) => { if (!errors.firstName) e.target.style.borderColor = C.red; }} onBlur={(e) => { if (!errors.firstName) e.target.style.borderColor = C.border; }} />
            {errors.firstName && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.2rem", display: "block" }}>{errors.firstName}</span>}
          </div>
          <div>
            <label htmlFor="ph" style={lbl}><Phone size={13} /> Phone Number</label>
            <input id="ph" type="tel" placeholder="(757) 555-1234" value={form.phoneNumber} onChange={onChange("phoneNumber")} disabled={status === "submitting"} aria-required="true" style={inp(errors.phoneNumber)}
              onFocus={(e) => { if (!errors.phoneNumber) e.target.style.borderColor = C.red; }} onBlur={(e) => { if (!errors.phoneNumber) e.target.style.borderColor = C.border; }} />
            {errors.phoneNumber && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.2rem", display: "block" }}>{errors.phoneNumber}</span>}
          </div>
          <div>
            <label htmlFor="ps" style={lbl}><Users size={13} /> Party Size</label>
            <div style={{ position: "relative" }}>
              <select id="ps" value={form.partySize} onChange={onChange("partySize")} disabled={status === "submitting"} style={{ ...inp(false), appearance: "none", cursor: "pointer", paddingRight: "2.5rem" }}>
                {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
              </select>
              <ChevronDown size={17} color={C.textLight} style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </div>
          <button type="submit" disabled={status === "submitting"} style={{
            width: "100%", padding: "0.9rem", marginTop: "0.15rem",
            background: status === "submitting" ? C.redDark : C.red, color: "#fff",
            fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: "1.02rem",
            border: "none", borderRadius: "8px",
            cursor: status === "submitting" ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
            transition: "all 0.2s ease", boxShadow: "0 2px 12px #e11d4820",
          }}
          onMouseEnter={(e) => { if (status !== "submitting") e.target.style.background = C.redDark; }}
          onMouseLeave={(e) => { if (status !== "submitting") e.target.style.background = C.red; }}>
            {status === "submitting" ? <><Loader2 size={18} className="spin" /> Saving your spot...</> : "Add My Name — It's Free"}
          </button>
        </form>
      )}
    </section>
  );
}

// ─── MENU SECTION (Real Data — Tabbed + Categorized) ────────────────────────

function MenuSection() {
  const [tab, setTab] = useState("breakfast");
  const menu = tab === "breakfast" ? breakfastMenu : lunchMenu;
  const categories = Object.keys(menu);

  const tagColors = {
    vegetarian: { bg: "#dcfce7", color: "#166534", icon: <Leaf size={10} /> },
  };

  return (
    <section id="menu" style={{ padding: "3.5rem 1.25rem", maxWidth: "1000px", margin: "0 auto" }} aria-label="Menu">
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontFamily: "'Boogaloo',cursive", fontSize: "clamp(1.7rem,5vw,2.4rem)", color: C.red, marginBottom: "0.25rem" }}>
          Shorty's Menu
        </h2>
        <p style={{ color: C.textLight, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
          Breakfast served all day, 6am–2pm · Prices from May 2024
        </p>

        {/* Tab Toggle */}
        <div style={{
          display: "inline-flex", background: C.tan, borderRadius: "10px", padding: "4px",
          border: `2px solid ${C.border}`,
        }} role="tablist" aria-label="Menu type">
          {[
            { id: "breakfast", label: "Breakfast", icon: <Sunrise size={15} /> },
            { id: "lunch", label: "Lunch", icon: <Sun size={15} /> },
          ].map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: "flex", alignItems: "center", gap: "0.35rem",
                padding: "0.55rem 1.4rem", borderRadius: "7px", border: "none",
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s ease",
                background: tab === t.id ? C.red : "transparent",
                color: tab === t.id ? "#fff" : C.textMid,
                boxShadow: tab === t.id ? "0 2px 8px #e11d4825" : "none",
              }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat} style={{ marginBottom: "2.25rem" }}>
          {/* Category Header — diner character */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "0.85rem", paddingBottom: "0.5rem",
            borderBottom: `3px solid ${C.red}`,
          }}>
            <h3 style={{
              fontFamily: "'Boogaloo',cursive", fontSize: "1.45rem", color: C.red,
              whiteSpace: "nowrap",
            }}>
              {cat}
            </h3>
            <div style={{ flex: 1, height: "3px", background: `repeating-linear-gradient(90deg, ${C.red} 0px, ${C.red} 6px, transparent 6px, transparent 12px)` }} aria-hidden="true" />
            <span style={{ fontSize: "0.75rem", color: C.textLight, fontWeight: 600, whiteSpace: "nowrap" }}>
              {menu[cat].length} items
            </span>
          </div>

          {/* Items Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "0.8rem",
          }}>
            {menu[cat].map((item, i) => (
              <MenuCard key={i} item={item} tagColors={tagColors} />
            ))}
          </div>
        </div>
      ))}

      {/* Weekly Specials */}
      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem", paddingBottom: "0.5rem", borderBottom: `3px solid ${C.red}` }}>
          <h3 style={{ fontFamily: "'Boogaloo',cursive", fontSize: "1.45rem", color: C.red, whiteSpace: "nowrap" }}>
            🗓️ Weekly Specials
          </h3>
          <div style={{ flex: 1, height: "3px", background: `repeating-linear-gradient(90deg, ${C.red} 0px, ${C.red} 6px, transparent 6px, transparent 12px)` }} aria-hidden="true" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 180px), 1fr))", gap: "0.7rem" }}>
          {weeklySpecials.map((s) => (
            <div key={s.day} style={{
              background: C.white, border: `2px solid ${C.border}`, borderRadius: "10px",
              padding: "1rem", transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = C.red + "45"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = C.border}>
              <div style={{
                display: "inline-block", padding: "0.12rem 0.5rem", borderRadius: "99px",
                background: C.redLight, color: C.red, fontSize: "0.7rem",
                fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}>{s.day}</div>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", color: C.textDark, marginBottom: "0.2rem" }}>{s.name}</div>
              <p style={{ color: C.textLight, fontSize: "0.8rem", lineHeight: 1.4 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuCard({ item, tagColors }) {
  const [open, setOpen] = useState(false);
  return (
    <div tabIndex={0} role="article"
      onClick={() => setOpen(!open)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(!open); } }}
      aria-expanded={open}
      style={{
        background: C.white, border: `2px solid ${open ? C.red + "40" : C.border}`,
        borderRadius: "10px", padding: "1rem 1.1rem", cursor: "pointer",
        transition: "all 0.2s ease", position: "relative", overflow: "hidden",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.red + "40"; e.currentTarget.style.boxShadow = "0 3px 14px rgba(0,0,0,0.04)"; }}
      onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}>

      {item.badge && (
        <div style={{
          position: "absolute", top: "0.7rem", right: "0.7rem",
          padding: "0.1rem 0.45rem", background: "#fef3c7", border: "1.5px solid #fbbf2450",
          borderRadius: "99px", fontSize: "0.65rem", fontWeight: 800, color: "#92400e",
        }}>⭐ {item.badge}</div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem", paddingRight: item.badge ? "5.5rem" : 0 }}>
        <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: C.textDark, lineHeight: 1.2 }}>{item.name}</h4>
        <span style={{ fontWeight: 800, fontSize: "0.95rem", color: C.red, whiteSpace: "nowrap", marginLeft: "0.5rem" }}>${item.price}</span>
      </div>

      <p style={{
        color: open ? C.textMid : C.textLight,
        fontSize: "0.83rem", lineHeight: 1.4,
        display: open ? "block" : "-webkit-box",
        WebkitLineClamp: open ? "unset" : 2,
        WebkitBoxOrient: "vertical",
        overflow: open ? "visible" : "hidden",
        transition: "color 0.2s",
      }}>{item.desc}</p>

      {item.tags && item.tags.length > 0 && (
        <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.35rem" }}>
          {item.tags.map((t) => {
            const s = tagColors[t] || {};
            return <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "0.15rem", padding: "0.1rem 0.4rem", borderRadius: "99px", fontSize: "0.65rem", fontWeight: 600, background: s.bg, color: s.color }}>{s.icon}{t}</span>;
          })}
        </div>
      )}
    </div>
  );
}

// ─── PHOTO STRIP ────────────────────────────────────────────────────────────

function PhotoStrip() {
  const photos = [
    { src: IMG.interior, caption: "The checkered floor. The red booths. Home.", tilt: -2.2 },
    { src: IMG.neon, caption: "Rock & Roll lives above the griddle.", tilt: 1.6 },
    { src: IMG.elvis, caption: "The King greets everyone at the door.", tilt: -1.4 },
  ];
  return (
    <section id="gallery" style={{ padding: "3.5rem 1.25rem", background: C.tan }} aria-label="Gallery">
      <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
        <h2 style={{ fontFamily: "'Boogaloo',cursive", fontSize: "clamp(1.7rem,5vw,2.4rem)", color: C.red, marginBottom: "0.35rem" }}>Scenes from the Counter</h2>
        <p style={{ color: C.textLight, fontSize: "0.95rem" }}>Can't fake 44 years of character.</p>
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
          onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${p.tilt}deg) scale(1)`; e.currentTarget.style.boxShadow = "0 3px 18px rgba(0,0,0,0.09)"; }}>
            <img src={p.src} alt={p.caption} style={{ width: "100%", aspectRatio: i === 2 ? "3/4" : "4/3", objectFit: "cover", borderRadius: "2px", display: "block" }} />
            <p style={{ fontFamily: "'Boogaloo',cursive", fontSize: "0.95rem", color: C.textMid, textAlign: "center", marginTop: "0.6rem", lineHeight: 1.2 }}>{p.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section style={{ padding: "3.5rem 1.25rem", maxWidth: "660px", margin: "0 auto" }} aria-label="About">
      <div style={{
        background: C.white, border: `2px solid ${C.border}`, borderRadius: "14px",
        padding: "2.25rem 1.75rem", boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: C.red }} aria-hidden="true" />
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.85rem" }}>
          <Heart size={18} color={C.red} fill={C.red} />
          <h3 style={{ fontFamily: "'Boogaloo',cursive", fontSize: "1.4rem", color: C.red }}>From Behind the Counter</h3>
        </div>
        <div style={{ color: C.textMid, fontSize: "0.95rem", lineHeight: 1.7 }}>
          <p style={{ marginBottom: "0.85rem" }}>We started Shorty's in 1980 with one griddle, one coffee pot, and the belief that if you treat people right and cook honest food, they'll keep coming back. Forty-four years and a lot of coffee later — the philosophy hasn't changed.</p>
          <p style={{ marginBottom: "0.85rem" }}>We finally retired the paper notebook. (Don't worry — Shorty still writes the daily specials by hand. Some things are sacred.) Now your phone does the waiting so you don't have to stand by Elvis.</p>
          <p>Whether you're a William & Mary freshman or a retiree who's had the same booth since the checkered floor was new — pull up a chair. There's always room.</p>
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
          <div>
            <h3 style={{ fontFamily: "'Boogaloo',cursive", fontSize: "1.25rem", color: C.red, marginBottom: "0.75rem" }}>Find Us</h3>
            <div style={{ width: "100%", aspectRatio: "16/10", borderRadius: "8px", background: C.white, border: `2px solid ${C.border}`, position: "relative", overflow: "hidden", marginBottom: "0.75rem" }} role="img" aria-label="Map">
              <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${C.border}80 1px, transparent 1px), linear-gradient(90deg, ${C.border}80 1px, transparent 1px)`, backgroundSize: "18px 18px" }} />
              <div style={{ position: "absolute", top: "44%", left: "51%", transform: "translate(-50%,-50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <MapPin size={28} color={C.red} fill={C.red} />
                <div style={{ marginTop: "0.15rem", background: C.red, color: "#fff", fontSize: "0.6rem", fontWeight: 800, padding: "0.1rem 0.4rem", borderRadius: "3px" }}>SHORTY'S</div>
              </div>
            </div>
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
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.4rem" }}>
          <p style={{ color: C.textLight, fontSize: "0.75rem" }}>© {new Date().getFullYear()} Shorty's Diner · Williamsburg, VA · Menu prices from May 2024</p>
          <div style={{ fontFamily: "'Boogaloo',cursive", color: C.red, fontSize: "1rem" }}>Shorty's</div>
        </div>
      </div>
    </footer>
  );
}
