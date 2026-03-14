# 🔥 GadgetZone v2 — Premium Affiliate Marketing Landing Page

Built with React + Vite + Framer Motion + Recharts + Tailwind CSS

## 🚀 Quick Start (3 commands)

```bash
npm install
npm run dev
```
Open: http://localhost:5173

## 📦 Build for Production
```bash
npm run build
npm run preview
```

## 🎨 What's New in v2
- **Bebas Neue** display font — bold, editorial, unforgettable
- **Premium product cards** with:
  - Large emoji "product visual" with glow orb + hover float
  - Spec pills grid
  - Gradient visual area per product
  - Featured horizontal card for top pick
  - Accent color per product
- Orange (#ff6b00) + Gold accent palette
- Diagonal grid lines, atmospheric glows
- Animated counter stats in Hero

## ✏️ Customize

### Products → `src/data.js`
```js
{
  id: 7,
  emoji: "📷",
  name: "Sony ZV-E10 II",
  tagline: "Your First Creator Camera",
  category: "Cameras",
  badge: "NEW PICK",
  badgeColor: "#3b82f6",
  desc: "Best vlogging camera for YouTube beginners.",
  specs: ["APS-C Sensor", "4K 60fps", "Flip Screen", "Eye-AF"],
  price: "₹54,990",
  old: "₹64,990",
  rating: 4.8,
  reviews: "3.2K",
  savings: "15%",
  gradient: "linear-gradient(135deg, #0f1a1a 0%, #08100d 50%, #0f141a 100%)",
  accentColor: "#34d399",
  link: "YOUR_AFFILIATE_LINK_HERE",
}
```

### YouTube URL
Search for `youtube.com/@GadgetZone` → replace with your real channel URL.

## 🌐 Free Deployment

**Vercel** (best): Push to GitHub → import on vercel.com → Deploy ✅

**Netlify**: `npm run build` → drag `dist/` to netlify.com/drop
