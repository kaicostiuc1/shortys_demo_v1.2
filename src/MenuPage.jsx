import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";

const C = {
  cream: "#FBF9F4",
  red: "#e11d48",
  redDark: "#be123c",
  redLight: "#fef2f2",
  redFaint: "#e11d480a",
  tan: "#f2ede4",
  tanDark: "#e8e0d2",
  border: "#e0d8ca",
  textDark: "#2c1810",
  textMid: "#5c4a3a",
  textLight: "#8b7d6e",
  brownMuted: "#8b7355",
  white: "#ffffff",
};

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

function BWChecker() {
  return (
    <div
      style={{
        width: "100%",
        height: 16,
        backgroundColor: "#fff",
        backgroundImage:
          "linear-gradient(45deg, #000 25%, transparent 25%), " +
          "linear-gradient(-45deg, #000 25%, transparent 25%), " +
          "linear-gradient(45deg, transparent 75%, #000 75%), " +
          "linear-gradient(-45deg, transparent 75%, #000 75%)",
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
        flexShrink: 0,
      }}
    />
  );
}

function MenuItem({ item }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e0d8ca",
        borderRadius: 4,
        padding: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#2c1810" }}>
          {item.name}
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: C.red, flexShrink: 0 }}>
          ${item.price}
        </span>
      </div>
      {item.desc && (
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#8b7d6e",
            marginTop: 6,
            lineHeight: 1.5,
          }}
        >
          {item.desc}
        </div>
      )}
      {item.tags && item.tags.includes("vegetarian") && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginTop: 6,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(100,200,100,0.7)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              color: "rgba(100,200,100,0.7)",
            }}
          >
            vegetarian
          </span>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("breakfast");
  const [hoveredNav, setHoveredNav] = useState(null);

  const currentMenu = activeTab === "breakfast" ? breakfastMenu : lunchMenu;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#FBF9F4",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          width: "100%",
          background: "rgba(251,249,244,0.95)",
          backdropFilter: "blur(8px)",
          padding: "20px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >
        <div onClick={() => window.location.href = "/"} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <UtensilsCrossed size={20} color="#e11d48" />
          <span style={{ fontFamily: "'Boogaloo', cursive", fontSize: "1.4rem", color: "#e11d48", fontWeight: 700 }}>
            Shorty's
          </span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {[
            { label: "Menu", onClick: null, active: true },
            { label: "About", onClick: () => { window.location.href = "/about"; } },
            { label: "Contact", onClick: () => { window.location.href = "mailto:info@shortysdiners.com"; } },
            { label: "Order", onClick: () => { window.location.href = "/order"; } },
          ].map(({ label, onClick, active }) => (
            <span
              key={label}
              onClick={onClick || undefined}
              onMouseEnter={() => setHoveredNav(label)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: hoveredNav === label ? "#e11d48" : active ? C.red : "#5c4a3a",
                cursor: onClick ? "pointer" : "default",
                textDecoration: "none",
                textTransform: "uppercase",
                background: hoveredNav === label ? "rgba(225,29,72,0.06)" : "transparent",
                border: "none",
                boxShadow: "none",
                borderRadius: 20,
                padding: "4px 12px",
                transition: "all 0.2s ease",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 80,
        }}
      >
        {/* Hero */}
        <div
          style={{
            textAlign: "center",
            paddingTop: 60,
            paddingBottom: 40,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <div
            style={{
              fontFamily: "'Boogaloo', cursive",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              color: "#2c1810",
              lineHeight: 1.1,
            }}
          >
            The Menu
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: C.red,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginTop: 8,
            }}
          >
            Breakfast · Lunch · Daily Specials
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "0.85rem",
              color: "#8b7d6e",
              marginTop: 10,
            }}
          >
            Served daily 6 AM – 2 PM · All locations
          </div>
          <div
            style={{
              width: 60,
              height: 1,
              background: "#e0d8ca",
              margin: "20px auto",
            }}
          />
        </div>

        {/* Tab row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          {["breakfast", "lunch"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "'Boogaloo', cursive",
                fontSize: "1rem",
                padding: "10px 28px",
                borderRadius: 3,
                cursor: "pointer",
                border: activeTab === tab ? "none" : "1px solid #e0d8ca",
                background: activeTab === tab ? C.red : "transparent",
                color: activeTab === tab ? C.white : "#5c4a3a",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu content */}
        <div
          style={{
            maxWidth: 900,
            width: "100%",
            margin: "0 auto",
            padding: "0 24px",
            boxSizing: "border-box",
          }}
        >
          {Object.entries(currentMenu).map(([category, items]) => (
            <div key={category}>
              <div
                style={{
                  fontFamily: "'Boogaloo', cursive",
                  fontSize: "1.3rem",
                  color: C.red,
                  marginBottom: 16,
                  marginTop: 36,
                  borderBottom: "1px solid rgba(225,29,72,0.2)",
                  paddingBottom: 8,
                }}
              >
                {category}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 12,
                }}
              >
                {items.map((item) => (
                  <MenuItem key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly specials */}
        <div
          style={{
            maxWidth: 900,
            width: "100%",
            margin: "0 auto",
            padding: "0 24px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontFamily: "'Boogaloo', cursive",
              fontSize: "1.3rem",
              color: "#2c1810",
              marginTop: 48,
              marginBottom: 20,
            }}
          >
            Weekly Specials
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#8b7d6e",
              marginBottom: 24,
            }}
          >
            Ask your server — Mon through Fri
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {weeklySpecials.map((special) => (
              <div
                key={special.day}
                style={{
                  background: "rgba(225,29,72,0.06)",
                  border: "1px solid rgba(225,29,72,0.2)",
                  borderRadius: 4,
                  padding: "14px 18px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: C.red,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {special.day}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#2c1810",
                    marginTop: 4,
                  }}
                >
                  {special.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BWChecker at very bottom */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <BWChecker />
      </div>
    </div>
  );
}
