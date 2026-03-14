import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color:"#ffc147", letterSpacing:"3px", fontSize:"0.85rem" }}>
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

export function Counter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  const num = parseFloat(String(target).replace(/[^0-9.]/g, ""));
  const suffix = String(target).replace(/[0-9.]/g, "");

  useEffect(() => {
    if (!inView) return;
    let v = 0; const step = num / 55;
    const t = setInterval(() => {
      v += step;
      if (v >= num) { setCount(num); clearInterval(t); }
      else setCount(parseFloat(v.toFixed(1)));
    }, 18);
    return () => clearInterval(t);
  }, [inView, num]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function OrangeLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-3" style={{ color:"#ff6b00", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase" }}>
      <span style={{ width:28, height:2, background:"#ff6b00", borderRadius:2, display:"inline-block" }}/>
      {children}
    </div>
  );
}
