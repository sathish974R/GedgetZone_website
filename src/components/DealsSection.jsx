import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PRODUCTS, CATEGORIES } from "../data.js";
import { Stars, OrangeLabel } from "./Shared.jsx";

/* ── Single Product Card ── */
function ProductCard({ p, index }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity:0, y:40 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, scale:0.93 }}
      transition={{ duration:0.45, delay: index * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: "var(--card)",
        border: hovered ? `1px solid ${p.accentColor}33` : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        overflow:"hidden",
        display:"flex", flexDirection:"column",
        transition:"border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? `0 24px 70px rgba(0,0,0,0.5), 0 0 0 1px ${p.accentColor}22` : "0 4px 24px rgba(0,0,0,0.3)",
        cursor:"default",
        position:"relative",
      }}
    >
      {/* ── Animated top accent ── */}
      <motion.div
        style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${p.accentColor}, transparent)`, originX:0 }}
        initial={{ scaleX:0 }} animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration:0.35 }}
      />

      {/* ── Product visual area ── */}
      <div style={{
        background: p.imageBg || p.gradient,
        padding: "24px 24px 20px",
        position:"relative", overflow:"hidden",
        minHeight: 220,
        display:"flex", flexDirection:"column", justifyContent:"space-between"
      }}>
        {/* Glowing orb behind emoji */}
        <motion.div
          style={{
            position:"absolute", top:"50%", left:"50%",
            transform:"translate(-50%,-50%)",
            width:160, height:160, borderRadius:"50%",
            background:`radial-gradient(circle, ${p.accentColor}22 0%, transparent 70%)`,
          }}
          animate={{ scale: hovered ? 1.4 : 1, opacity: hovered ? 1 : 0.5 }}
          transition={{ duration:0.5 }}
        />

        {/* Top row: badge + savings */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", position:"relative", zIndex:2 }}>
          <span style={{
            background: `${p.badgeColor}22`,
            border: `1px solid ${p.badgeColor}44`,
            color: p.badgeColor,
            fontSize:"0.65rem", fontWeight:800, letterSpacing:"0.12em",
            textTransform:"uppercase", padding:"4px 10px", borderRadius:6
          }}>{p.badge}</span>

          <div style={{
            background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.1)",
            color:"#86efac", fontSize:"0.72rem", fontWeight:700,
            padding:"4px 10px", borderRadius:6, letterSpacing:"0.05em"
          }}>
            ↓ SAVE {p.savings}
          </div>
        </div>

        {/* Image / Emoji visual */}
        <motion.div
          style={{ position:"relative", zIndex:2, margin:"12px 0" }}
          animate={{ y: hovered ? -6 : 0, scale: hovered ? 1.02 : 1 }}
          transition={{ duration:0.4, ease:"easeOut" }}
        >
          {p.image ? (
            <div style={{ display:"flex", justifyContent:"center" }}>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  maxWidth:"100%",
                  maxHeight:180,
                  borderRadius:16,
                  objectFit:"contain",
                  boxShadow: hovered ? "0 18px 60px rgba(0,0,0,0.6)" : "0 10px 32px rgba(0,0,0,0.5)",
                  transition:"box-shadow 0.3s",
                }}
              />
            </div>
          ) : (
            <div style={{ textAlign:"center", fontSize:"5.5rem", lineHeight:1 }}>
              {p.emoji}
            </div>
          )}
        </motion.div>

        {/* Tagline under emoji */}
        <div style={{ textAlign:"center", position:"relative", zIndex:2 }}>
          <span style={{
            fontFamily:"'Bebas Neue',cursive", fontSize:"0.95rem",
            letterSpacing:"0.12em", color:`${p.accentColor}cc`, textTransform:"uppercase"
          }}>{p.tagline}</span>
        </div>
      </div>

      {/* ── Info area ── */}
      <div style={{ padding:"22px 24px", flex:1, display:"flex", flexDirection:"column", gap:14 }}>

        {/* Name */}
        <div>
          <h3 style={{
            fontFamily:"'Bebas Neue',cursive",
            fontSize:"1.75rem", letterSpacing:"0.04em",
            color: hovered ? p.accentColor : "#f0f4ff",
            transition:"color 0.25s", lineHeight:1.05, marginBottom:6
          }}>{p.name}</h3>
          <p style={{ fontSize:"0.82rem", color:"#8a9ab8", lineHeight:1.65, fontWeight:300 }}>{p.desc}</p>
        </div>

        {/* Spec pills */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
          {p.specs.map((spec, i) => (
            <span key={i} style={{
              background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.08)",
              color:"#8a9ab8", fontSize:"0.68rem", fontWeight:600,
              padding:"4px 10px", borderRadius:6, letterSpacing:"0.03em"
            }}>
              {spec}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Stars rating={p.rating}/>
          <span style={{ fontSize:"0.78rem", color:"#5a6882", fontWeight:500 }}>{p.rating} · {p.reviews} reviews</span>
        </div>

        {/* Price + CTA */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          paddingTop:14, borderTop:"1px solid rgba(255,255,255,0.05)", marginTop:"auto"
        }}>
          <div>
            <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2rem", letterSpacing:"0.02em", color:"#ff6b00", lineHeight:1 }}>
              {p.price}
            </span>
            <div style={{ fontSize:"0.72rem", color:"#5a6882", textDecoration:"line-through", marginTop:1 }}>{p.old}</div>
          </div>

          <motion.a
            href={p.link}
            onClick={() => setClicked(true)}
            style={{
              display:"flex", alignItems:"center", gap:7, textDecoration:"none",
              background: clicked ? "#22c55e" : "#ff6b00",
              color:"#000", fontWeight:800, fontSize:"0.72rem",
              letterSpacing:"0.08em", textTransform:"uppercase",
              padding:"11px 20px", borderRadius:10, transition:"background 0.3s",
              flexShrink:0
            }}
            whileHover={{ scale:1.07, boxShadow:"0 0 26px rgba(255,107,0,0.5)" }}
            whileTap={{ scale:0.95 }}
          >
            {clicked ? "✓ Copied!" : "Get Deal"}
            {!clicked && (
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Featured horizontal card (first product) ── */
function FeaturedCard({ p }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      style={{
        background: "var(--card)",
        border: hovered ? `1px solid ${p.accentColor}44` : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        overflow: "hidden",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? `0 30px 80px rgba(0,0,0,0.5)` : "0 4px 24px rgba(0,0,0,0.3)",
        marginBottom: 8,
        position: "relative",
      }}
      className="featured-card"
    >
      {/* Accent top */}
      <motion.div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${p.accentColor}, transparent)`, originX:0 }}
        initial={{ scaleX:0 }} animate={{ scaleX: hovered ? 1 : 0 }} transition={{ duration:0.4 }}
      />

      {/* Left visual */}
      <div style={{
        background: p.imageBg || p.gradient, padding:36,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        position:"relative", overflow:"hidden", minHeight:320
      }}>
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${p.accentColor}18 0%, transparent 70%)`,
          }}
          animate={{ scale: hovered ? 1.3 : 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          style={{ position:"relative", zIndex:2, width:"100%", maxWidth:320 }}
          animate={{ y: hovered ? -10 : 0, scale: hovered ? 1.03 : 1 }}
          transition={{ duration:0.45, ease:"easeOut" }}
        >
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              style={{
                width:"100%",
                borderRadius:20,
                objectFit:"contain",
                boxShadow:"0 24px 80px rgba(0,0,0,0.65)",
              }}
            />
          ) : (
            <div style={{ fontSize:"7rem", textAlign:"center" }}>{p.emoji}</div>
          )}
        </motion.div>

        <div style={{ position:"relative", zIndex:2, textAlign:"center", marginTop:12 }}>
          <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.1rem", letterSpacing:"0.14em", color:`${p.accentColor}bb`, textTransform:"uppercase" }}>{p.tagline}</span>
        </div>

        {/* FEATURED label */}
        <div style={{
          position:"absolute", top:20, left:20,
          background:"rgba(255,107,0,0.15)", border:"1px solid rgba(255,107,0,0.3)",
          color:"#ff6b00", fontSize:"0.65rem", fontWeight:800, letterSpacing:"0.14em",
          textTransform:"uppercase", padding:"5px 12px", borderRadius:6
        }}>⭐ FEATURED</div>
      </div>

      {/* Right info */}
      <div style={{ padding:"36px 36px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
        <div>
          <span style={{
            background:`${p.badgeColor}22`, border:`1px solid ${p.badgeColor}44`,
            color:p.badgeColor, fontSize:"0.65rem", fontWeight:800, letterSpacing:"0.12em",
            textTransform:"uppercase", padding:"4px 10px", borderRadius:6, display:"inline-block", marginBottom:14
          }}>{p.badge}</span>

          <h3 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2.8rem", letterSpacing:"0.04em", lineHeight:1, color:"#f0f4ff", marginBottom:8 }}>{p.name}</h3>
          <p style={{ fontSize:"0.9rem", color:"#8a9ab8", lineHeight:1.7, fontWeight:300, marginBottom:20 }}>{p.desc}</p>

          {/* Specs 2x2 grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
            {p.specs.map((s,i) => (
              <div key={i} style={{
                background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:10, padding:"10px 14px"
              }}>
                <div style={{ fontSize:"0.7rem", color:"#5a6882", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:3 }}>Spec {i+1}</div>
                <div style={{ fontSize:"0.78rem", color:"#d0d8f0", fontWeight:600 }}>{s}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
            <Stars rating={p.rating}/>
            <span style={{ fontSize:"0.78rem", color:"#5a6882" }}>{p.rating} · {p.reviews} reviews</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2.5rem", letterSpacing:"0.02em", color:"#ff6b00", lineHeight:1 }}>{p.price}</div>
            <div style={{ fontSize:"0.72rem", color:"#5a6882", textDecoration:"line-through" }}>{p.old}</div>
          </div>
          <motion.a href={p.link}
            style={{
              flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8,
              textDecoration:"none", background:"#ff6b00", color:"#000",
              fontWeight:800, fontSize:"0.8rem", letterSpacing:"0.08em", textTransform:"uppercase",
              padding:"14px 24px", borderRadius:12,
            }}
            whileHover={{ scale:1.04, boxShadow:"0 0 32px rgba(255,107,0,0.55)" }}
            whileTap={{ scale:0.97 }}
          >
            Get Best Deal
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </motion.a>
          <div style={{
            background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.25)",
            color:"#86efac", fontSize:"0.72rem", fontWeight:700,
            padding:"14px 16px", borderRadius:12, textAlign:"center", whiteSpace:"nowrap"
          }}>
            Save {p.savings}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


export default function DealsSection() {
  const [active, setActive] = useState("All");
  const ref = useRef();
  const inView = useInView(ref, { once:true, margin:"-80px" });

  const filtered = active === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === active);
  const [featured, ...rest] = filtered;

  return (
    <section id="deals" ref={ref} style={{ padding:"100px 0", background:"var(--bg)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6 }}
          style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-end", justifyContent:"space-between", gap:20, marginBottom:48 }}
        >
          <div>
            <OrangeLabel>Affiliate Picks</OrangeLabel>
            <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(2.5rem,5vw,4rem)", letterSpacing:"0.04em", lineHeight:1, color:"#f0f4ff" }}>
              HAND-PICKED <span style={{ color:"#ff6b00" }}>BEST DEALS</span>
            </h2>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {CATEGORIES.map(cat => (
              <motion.button key={cat} onClick={() => setActive(cat)}
                style={{
                  background: active===cat ? "#ff6b00" : "transparent",
                  border: `1px solid ${active===cat ? "#ff6b00" : "rgba(255,255,255,0.1)"}`,
                  color: active===cat ? "#000" : "#8a9ab8",
                  fontWeight:700, fontSize:"0.72rem", letterSpacing:"0.08em",
                  textTransform:"uppercase", padding:"8px 18px", borderRadius:100,
                  cursor:"pointer", transition:"all 0.2s",
                }}
                whileTap={{ scale:0.95 }}
              >{cat}</motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured card (first product) */}
        {featured && (
          <div className="hidden md:block" style={{ marginBottom:20 }}>
            <FeaturedCard p={featured} />
          </div>
        )}

        {/* Grid for rest */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          <AnimatePresence mode="popLayout">
            {/* On mobile show all, on desktop show rest */}
            {(active === "All"
              ? [...(typeof window !== "undefined" && window.innerWidth >= 768 ? rest : PRODUCTS)]
              : filtered
            ).map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Disclosure */}
        <motion.p
          initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.5 }}
          style={{ textAlign:"center", fontSize:"0.72rem", color:"#3a4a5e", marginTop:36, lineHeight:1.7 }}
        >
          ⚠️ Affiliate Disclosure: We participate in Amazon Associates & other programs. Clicking links and purchasing earns us a small commission at no extra cost to you. All reviews are 100% independent.
        </motion.p>
      </div>
    </section>
  );
}
