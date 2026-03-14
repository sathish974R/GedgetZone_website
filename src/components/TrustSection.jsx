import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_DATA } from "../data.js";
import { OrangeLabel } from "./Shared.jsx";

const POINTS = [
  { icon:"🎬", title:"Every product tested on camera", desc:"We show you exactly how we use it before recommending. No stock footage, no paid sets." },
  { icon:"🔗", title:"Affiliate links = same price for you", desc:"We earn a small % when you click through. You never pay a rupee more than the listed price." },
  { icon:"⚖️", title:"Cons are always mentioned", desc:"We actively tell you when a product isn't worth it. Honest reviews protect our reputation — and your money." },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) return (
    <div style={{ background:"#0c1120", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"8px 14px" }}>
      <span style={{ color:"#ff6b00", fontWeight:700, fontSize:"0.82rem" }}>{payload[0].value} deals</span>
      <span style={{ color:"#5a6882", fontSize:"0.75rem", marginLeft:8 }}>{payload[0].payload.month}</span>
    </div>
  );
  return null;
};

export default function TrustSection() {
  const ref = useRef();
  const inView = useInView(ref, { once:true, margin:"-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 0",
        background: "var(--bg2)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="trust-layout"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}
      >

        {/* Left */}
        <motion.div initial={{ opacity:0, x:-30 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6 }}>
          <OrangeLabel>Why Trust Us</OrangeLabel>
          <h2 style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"clamp(2.5rem,4vw,3.8rem)", letterSpacing:"0.04em", lineHeight:1.05, color:"#f0f4ff", marginBottom:12 }}>
            TRANSPARENT.<br/><span style={{ color:"#ff6b00" }}>INDEPENDENT.</span><br/>HONEST.
          </h2>
          <p style={{ color:"#8a9ab8", fontWeight:300, lineHeight:1.75, marginBottom:32, fontSize:"0.9rem" }}>
            No brand has ever paid us to review their product. Our affiliate income funds the channel — it never influences the ratings.
          </p>

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {POINTS.map((pt, i) => (
              <motion.div key={i}
                initial={{ opacity:0, x:-20 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ delay:0.2+i*0.1, duration:0.5 }}
                style={{
                  display:"flex", gap:16, padding:"16px 18px",
                  background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)",
                  borderRadius:12, transition:"border-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,107,0,0.2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.05)"}
              >
                <span style={{ fontSize:"1.6rem", flexShrink:0 }}>{pt.icon}</span>
                <div>
                  <div style={{ fontWeight:700, fontSize:"0.85rem", color:"#d0d8f0", marginBottom:4 }}>{pt.title}</div>
                  <div style={{ fontSize:"0.78rem", color:"#5a6882", fontWeight:300, lineHeight:1.6 }}>{pt.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div initial={{ opacity:0, x:30 }} animate={inView ? { opacity:1, x:0 } : {}} transition={{ duration:0.6, delay:0.2 }}>
          <div style={{ background:"var(--card)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:18, padding:28, marginBottom:16 }}>
            <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.1rem", letterSpacing:"0.06em", color:"#f0f4ff", marginBottom:4 }}>Monthly Deals Shared</div>
            <p style={{ fontSize:"0.72rem", color:"#5a6882", marginBottom:20, letterSpacing:"0.04em" }}>Curated for our audience — last 6 months</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={CHART_DATA} margin={{ top:10, right:0, left:-20, bottom:0 }}>
                <defs>
                  <linearGradient id="og" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff6b00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill:"#475569", fontSize:11 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:"#475569", fontSize:11 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Area type="monotone" dataKey="deals" stroke="#ff6b00" strokeWidth={2.5} fill="url(#og)"
                  dot={{ fill:"#ff6b00", strokeWidth:0, r:4 }} activeDot={{ r:6, fill:"#ff6b00", strokeWidth:0 }}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {[
              { v:"₹12Cr+", l:"Deals Saved" },
              { v:"98%",    l:"Honest Reviews" },
              { v:"0",      l:"Paid Sponsors" },
            ].map((s,i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:12 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.45+i*0.08 }}
                style={{
                  background:"var(--card)", border:"1px solid rgba(255,255,255,0.05)",
                  borderRadius:14, padding:"18px 12px", textAlign:"center",
                  transition:"border-color 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,107,0,0.2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.05)"}
              >
                <div style={{ fontFamily:"'Bebas Neue',cursive", fontSize:"1.6rem", letterSpacing:"0.04em", color:"#ff6b00" }}>{s.v}</div>
                <div style={{ fontSize:"0.65rem", color:"#5a6882", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:3 }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
