export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            Gadget<span>Zone</span>
          </div>
          <p className="footer-text">
            GadgetZone participates in Amazon Associates & other affiliate programs. Commissions are earned on
            qualifying purchases at no extra cost to you. All opinions and reviews are 100% honest and independent.
          </p>
        </div>
        <div className="footer-links">
          {["Privacy Policy", "Disclosure", "Contact Us", "YouTube"].map((l) => (
            <a key={l} href="#" className="footer-link">
              {l}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 GadgetZone. Built with ❤️ for tech lovers across India.
      </div>
    </footer>
  );
}
