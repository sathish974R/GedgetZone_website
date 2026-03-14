import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import YouTubeSection from "./components/YouTubeSection.jsx";
import DealsSection from "./components/DealsSection.jsx";
import TrustSection from "./components/TrustSection.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";
import { CursorGlow, Particles } from "./components/Effects.jsx";

export default function App() {
  return (
    <div style={{ minHeight:"100vh", background:"#05080f", color:"#f0f4ff", overflowX:"hidden" }}>
      <CursorGlow />
      <Particles />
      <Navbar />
      <Hero />
      <YouTubeSection />
      <DealsSection />
      <TrustSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
