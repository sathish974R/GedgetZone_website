import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VIDEOS } from "../data.js";
import { OrangeLabel } from "./Shared.jsx";

export default function YouTubeSection() {
  const ref = useRef();
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="youtube" ref={ref} style={{
      padding:"100px 0",
      background:"linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)",
      borderTop:"1px solid rgba(255,255,255,0.04)",
      position:"relative", overflow:"hidden"
    }}>
      {/* Red atmospheric glow */}
      <div style={{
        position:"absolute", top:-100, right:-100, width:500, height:500, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%)", pointerEvents:"none"
      }}/>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>
        <motion.div
          initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6 }}
          style={{ marginBottom:48 }}
        >
          <OrangeLabel>YouTube Channel</OrangeLabel>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(2.5rem,5vw,4rem)", letterSpacing:"0.04em", lineHeight:1, color:"#f0f4ff" }}>
            LATEST REVIEWS <span style={{ color:"#ef4444" }}>&amp; COMPARISONS</span>
          </h2>
          <p style={{ color:"#8a9ab8", fontWeight:300, maxWidth:520, marginTop:10, lineHeight:1.7 }}>
            Every video has affiliate links in the description. Watch the full review, then shop right here — same price.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
            gap: 18,
          }}
        >
          {VIDEOS.map((v, i) => (
            <motion.a
              key={i}
              href="https://youtube.com/@GadgetZone"
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity:0, y:40 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay:i*0.12, duration:0.5 }}
              whileHover={{ y:-6, boxShadow:"0 20px 60px rgba(239,68,68,0.13)" }}
              style={{
                textDecoration:"none", color:"inherit",
                background:"var(--card2)", border:"1px solid rgba(255,255,255,0.06)",
                borderRadius:18, overflow:"hidden", display:"block",
                transition:"border-color 0.25s",
              }}
            >
              {/* Thumbnail mockup */}
              <div style={{
                aspectRatio:"16/9", background:"linear-gradient(135deg, #1a1f2e, #0d1117)",
                position:"relative", display:"flex", alignItems:"center", justifyContent:"center",
                overflow:"hidden"
              }}>
                {/* Diagonal lines decoration */}
                {[...Array(5)].map((_,j) => (
                  <div key={j} style={{
                    position:"absolute", top:0, bottom:0,
                    left:`${j*25}%`, width:1,
                    background:"linear-gradient(180deg, transparent, rgba(255,255,255,0.03), transparent)",
                    transform:"rotate(12deg)", transformOrigin:"top"
                  }}/>
                ))}

                {/* Play button */}
                <motion.div
                  style={{
                    width:56, height:56, borderRadius:"50%",
                    background:"#ef4444",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:"0 0 32px rgba(239,68,68,0.5)", zIndex:2, position:"relative"
                  }}
                  whileHover={{ scale:1.15 }}
                >
                  <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </motion.div>

                {/* Duration */}
                <span style={{
                  position:"absolute", bottom:10, right:10,
                  background:"rgba(0,0,0,0.85)", color:"#fff",
                  fontSize:"0.72rem", fontWeight:700, padding:"3px 8px", borderRadius:5
                }}>{v.dur}</span>

                {/* Tag */}
                <span style={{
                  position:"absolute", top:10, left:10,
                  background:"rgba(0,0,0,0.7)", color:"#c0cce4",
                  fontSize:"0.65rem", fontWeight:700, padding:"3px 8px", borderRadius:5, letterSpacing:"0.06em", textTransform:"uppercase"
                }}>{v.tag}</span>

                {/* Hot badge */}
                {v.hot && (
                  <span style={{
                    position:"absolute", top:10, right:10,
                    background:"rgba(255,107,0,0.15)", border:"1px solid rgba(255,107,0,0.3)",
                    color:"#ff6b00", fontSize:"0.62rem", fontWeight:800,
                    padding:"3px 8px", borderRadius:5, letterSpacing:"0.08em"
                  }}>🔥 HOT</span>
                )}
              </div>

              {/* Info */}
              <div style={{ padding:"18px 20px" }}>
                <h3 style={{
                  fontFamily:"'Plus Jakarta Sans',sans-serif",
                  fontSize:"0.9rem", fontWeight:700, lineHeight:1.4, marginBottom:10,
                  color:"#d0d8f0"
                }}>{v.title}</h3>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span style={{ fontSize:"0.75rem", color:"#5a6882" }}>{v.views} views · {v.time}</span>
                  <span style={{
                    background:"rgba(255,107,0,0.1)", border:"1px solid rgba(255,107,0,0.2)",
                    color:"#ff6b00", fontSize:"0.65rem", fontWeight:700,
                    padding:"3px 9px", borderRadius:5, letterSpacing:"0.06em"
                  }}>LINKS BELOW</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.5 }}
          style={{ textAlign:"center", marginTop:36 }}
        >
          <a href="https://youtube.com/@GadgetZone" target="_blank" rel="noopener noreferrer"
            style={{
              display:"inline-flex", alignItems:"center", gap:8,
              border:"1px solid rgba(239,68,68,0.3)", color:"#ef4444",
              fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase",
              padding:"12px 28px", borderRadius:10, textDecoration:"none",
              transition:"all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
            Subscribe to GadgetZone on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}
