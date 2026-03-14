import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const fn = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full"
      style={{
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 65%)",
        left: pos.x - 250, top: pos.y - 250,
      }}
      animate={{ left: pos.x - 250, top: pos.y - 250 }}
      transition={{ type: "spring", stiffness: 60, damping: 20 }}
    />
  );
}

export function Particles() {
  const pts = Array.from({ length: 22 }, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100,
    size: Math.random()*2+0.5, dur: Math.random()*9+5, delay: Math.random()*5,
    color: Math.random() > 0.6 ? "rgba(255,107,0,0.35)" : "rgba(255,193,71,0.2)",
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pts.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ width:p.size, height:p.size, left:`${p.x}%`, top:`${p.y}%`, background:p.color }}
          animate={{ y:[0,-55,0], opacity:[0.1,0.7,0.1] }}
          transition={{ duration:p.dur, delay:p.delay, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}
    </div>
  );
}
