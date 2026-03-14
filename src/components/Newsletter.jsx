import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { OrangeLabel } from "./Shared.jsx";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef();
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section id="newsletter" ref={ref} style={{ padding:"100px 0", background:"var(--bg)", position:"relative", overflow:"hidden" }}>
      <div style={{
        position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
        width:800, height:600, borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(circle, rgba(255,107,0,0.055) 0%, transparent 68%)"
      }}/>

      <motion.div
        initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6 }}
        style={{ maxWidth:600, margin:"0 auto", textAlign:"center", padding:"0 32px", position:"relative" }}
      >
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, color:"#ff6b00", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:16 }}>
          <span style={{ width:28, height:2, background:"#ff6b00", borderRadius:2, display:"inline-block" }}/>
          Free Deal Alerts
          <span style={{ width:28, height:2, background:"#ff6b00", borderRadius:2, display:"inline-block" }}/>
        </div>

        <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(3rem,7vw,5rem)", letterSpacing:"0.04em", lineHeight:1, color:"#f0f4ff", marginBottom:12 }}>
          GET DEALS BEFORE<br/><span style={{ color:"#ff6b00" }}>EVERYONE ELSE</span>
        </h2>

        <p style={{ color:"#8a9ab8", fontWeight:300, lineHeight:1.7, marginBottom:36 }}>
          Flash sales, new reviews & exclusive discount codes — straight to your inbox. No spam. Ever.
        </p>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.form key="form"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onSubmit={e => { e.preventDefault(); if(email) setDone(true); }}
              style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}
            >
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="your@email.com" required
                style={{
                  flex:1, minWidth:240,
                  background:"var(--card)", border:"1px solid rgba(255,255,255,0.1)",
                  color:"#d0d8f0", fontFamily:"'Plus Jakarta Sans',sans-serif",
                  fontSize:"0.9rem", padding:"14px 20px", borderRadius:12, outline:"none",
                  transition:"border-color 0.2s"
                }}
                onFocus={e => e.target.style.borderColor="rgba(255,107,0,0.4)"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"}
              />
              <motion.button type="submit"
                style={{
                  background:"#ff6b00", color:"#000", fontWeight:800,
                  fontFamily:"'Plus Jakarta Sans',sans-serif",
                  fontSize:"0.8rem", letterSpacing:"0.08em", textTransform:"uppercase",
                  padding:"14px 28px", borderRadius:12, border:"none", cursor:"pointer"
                }}
                whileHover={{ scale:1.05, boxShadow:"0 0 32px rgba(255,107,0,0.5)" }}
                whileTap={{ scale:0.97 }}
              >Subscribe Free →</motion.button>
            </motion.form>
          ) : (
            <motion.div key="ok"
              initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }}
              style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:12,
                background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.25)",
                color:"#86efac", padding:"16px 28px", borderRadius:14, fontWeight:600, fontSize:"0.9rem"
              }}
            >
              <span style={{ fontSize:"1.3rem" }}>🎉</span> You're in! Check your inbox for a welcome deal.
            </motion.div>
          )}
        </AnimatePresence>

        <p style={{ color:"#3a4a5e", fontSize:"0.72rem", marginTop:14 }}>🔒 100% free. Unsubscribe anytime. We hate spam too.</p>

        {/* Social proof bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            marginTop: 40,
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.05)",
            flexWrap: "wrap",
            rowGap: 10,
          }}
        >
          {["4.9★ on Google","82K YouTube Subs","50K Email Readers"].map((s,i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:10 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.4+i*0.1 }}
              style={{ fontSize:"0.75rem", fontWeight:600, color:"#5a6882" }}
            >{s}</motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
