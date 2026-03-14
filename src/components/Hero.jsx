import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STATS } from "../data.js";
import { Counter } from "./Shared.jsx";

export default function Hero() {
  const ref = useRef();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0,600], [0,-100]);
  const op = useTransform(scrollY, [0,500], [1,0]);

  const words = ["BEST", "TECH.", "REAL", "DEALS."];

  return (
    <section id="home" ref={ref} style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", paddingTop:100, paddingBottom:80 }}>

      {/* Animated grid bg */}
      <div style={{
        position:"absolute", inset:0, opacity:0.07,
        backgroundImage:"linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,107,0,0.5) 1px,transparent 1px)",
        backgroundSize:"72px 72px"
      }}/>

      {/* Large radial glow */}
      <div style={{
        position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)",
        width:1000, height:700, borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(ellipse, rgba(255,107,0,0.09) 0%, transparent 68%)"
      }}/>

      {/* Diagonal accent line */}
      <div style={{
        position:"absolute", top:0, right:"15%", width:1, height:"100%",
        background:"linear-gradient(180deg, transparent, rgba(255,107,0,0.15), transparent)",
        transform:"rotate(8deg)", transformOrigin:"top"
      }}/>
      <div style={{
        position:"absolute", top:0, right:"35%", width:1, height:"100%",
        background:"linear-gradient(180deg, transparent, rgba(255,107,0,0.07), transparent)",
        transform:"rotate(8deg)", transformOrigin:"top"
      }}/>

      <motion.div ref={ref} style={{ y, opacity:op, position:"relative", textAlign:"center", maxWidth:1100, margin:"0 auto", padding:"0 32px" }}>

        {/* Pill badge */}
        <motion.div
          initial={{ opacity:0, scale:0.85 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.5 }}
          style={{
            display:"inline-flex", alignItems:"center", gap:8, marginBottom:28,
            background:"rgba(255,107,0,0.1)", border:"1px solid rgba(255,107,0,0.28)",
            color:"#ff6b00", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.18em",
            textTransform:"uppercase", padding:"8px 20px", borderRadius:100
          }}
        >
          <span style={{ width:7, height:7, borderRadius:"50%", background:"#ff6b00", animation:"pulse 1.8s infinite" }}/>
          India's #1 Tech Affiliate Channel · 82K Subscribers
        </motion.div>

        {/* Giant Bebas headline */}
        <div style={{ overflow:"hidden", marginBottom:16 }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: 120, opacity:0 }}
              animate={{ y:0, opacity:1 }}
              transition={{ delay: i*0.1 + 0.15, duration:0.7, ease:[0.16,1,0.3,1] }}
              style={{
                display:"inline-block",
                fontFamily:"'Bebas Neue',cursive",
                fontSize:"clamp(4rem, 12vw, 9rem)",
                lineHeight:0.95,
                letterSpacing:"0.04em",
                color: (i===1||i===3) ? "#ff6b00" : "#f0f4ff",
                marginRight: word.endsWith(".") ? "0.3em" : "0.15em",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.55, duration:0.6 }}
          style={{ fontSize:"1.05rem", color:"#8a9ab8", maxWidth:540, margin:"0 auto 36px", fontWeight:300, lineHeight:1.7 }}
        >
          We test every gadget. We link every deal. Watch on YouTube — shop from here.{" "}
          <span style={{ color:"#d0d8f0", fontWeight:500 }}>Same price. We earn a small commission.</span>
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.68, duration:0.55 }}
          style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:60 }}
        >
          <motion.a href="#deals"
            style={{
              display:"flex", alignItems:"center", gap:8, textDecoration:"none",
              background:"#ff6b00", color:"#000",
              fontWeight:800, fontSize:"0.85rem", letterSpacing:"0.07em", textTransform:"uppercase",
              padding:"15px 36px", borderRadius:10,
            }}
            whileHover={{ scale:1.05, boxShadow:"0 0 44px rgba(255,107,0,0.55)" }}
            whileTap={{ scale:0.97 }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Browse Top Deals
          </motion.a>
          <motion.a href="#youtube"
            style={{
              display:"flex", alignItems:"center", gap:8, textDecoration:"none",
              border:"1px solid rgba(255,255,255,0.1)", color:"#8a9ab8",
              fontWeight:600, fontSize:"0.85rem", letterSpacing:"0.07em", textTransform:"uppercase",
              padding:"15px 36px", borderRadius:10, transition:"all 0.2s"
            }}
            whileHover={{ scale:1.03, borderColor:"rgba(255,255,255,0.25)", color:"#f0f4ff" }}
            whileTap={{ scale:0.97 }}
          >
            <svg width="16" height="16" fill="#ef4444" viewBox="0 0 24 24"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
            Watch on YouTube
          </motion.a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="hero-stats"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {STATS.map((s,i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.85+i*0.08 }}
              style={{ background:"rgba(5,8,15,0.9)", padding:"24px 16px", textAlign:"center" }}
            >
              <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"2.4rem", letterSpacing:"0.04em", color:"#f0f4ff", lineHeight:1 }}>
                <Counter target={s.val}/>
              </div>
              <div style={{ fontSize:"0.68rem", color:"#5a6882", textTransform:"uppercase", letterSpacing:"0.12em", marginTop:6 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll arrow */}
      <motion.div
        style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", color:"#5a6882", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}
        animate={{ y:[0,10,0] }} transition={{ repeat:Infinity, duration:2.2 }}
      >
        <span style={{ fontSize:"0.6rem", letterSpacing:"0.18em", textTransform:"uppercase" }}>Scroll</span>
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </motion.div>
    </section>
  );
}
