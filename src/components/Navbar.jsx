import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = ["Home","Reviews","Deals","YouTube","Newsletter"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(5,8,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.3s",
      }}
    >
      <div className="navbar-inner" style={{ maxWidth:1280, margin:"0 auto", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:36, height:36, borderRadius:10,
            background:"linear-gradient(135deg,#ff6b00,#ff9500)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"'Bebas Neue',cursive", fontSize:"1.3rem", color:"#000", letterSpacing:1,
            boxShadow:"0 0 20px rgba(255,107,0,0.4)"
          }}>G</div>
          <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.6rem", letterSpacing:"0.08em", color:"#f0f4ff" }}>
            Gadget<span style={{ color:"#ff6b00" }}>Zone</span>
          </span>
        </a>

        {/* Desktop links (show only on large screens for better tablet spacing) */}
        <div className="hidden lg:flex navbar-links" style={{ gap:36 }}>
          {LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              textDecoration:"none", fontSize:"0.82rem", fontWeight:600,
              color:"rgba(240,244,255,0.55)", letterSpacing:"0.05em",
              transition:"color 0.2s", textTransform:"uppercase"
            }}
            onMouseEnter={e=>e.target.style.color="#ff6b00"}
            onMouseLeave={e=>e.target.style.color="rgba(240,244,255,0.55)"}
            >{l}</a>
          ))}
        </div>

        <div className="navbar-cta-wrap" style={{ display:"flex", gap:12, alignItems:"center" }}>
          <motion.a href="#newsletter"
            className="hidden md:flex navbar-cta"
            style={{
              textDecoration:"none", background:"#ff6b00", color:"#000",
              fontWeight:800, fontSize:"0.72rem", padding:"10px 22px",
              borderRadius:8, letterSpacing:"0.1em", textTransform:"uppercase",
            }}
            whileHover={{ scale:1.05, boxShadow:"0 0 28px rgba(255,107,0,0.55)" }}
            whileTap={{ scale:0.97 }}
          >Get Free Deals →</motion.a>

          <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background:"none", border:"none", cursor:"pointer", color:"#8a9ab8", padding:4 }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                    : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
            style={{ background:"rgba(5,8,15,0.98)", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"0 32px 20px" }}
          >
            {LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setOpen(false)}
                style={{ display:"block", padding:"14px 0", color:"#8a9ab8", textDecoration:"none", fontSize:"0.85rem", fontWeight:600, borderBottom:"1px solid rgba(255,255,255,0.04)", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
