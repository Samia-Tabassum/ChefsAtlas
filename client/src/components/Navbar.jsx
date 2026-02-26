import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Recipes", href: "/recipes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState("/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-inner">

          <a href="/" className="logo" onClick={() => setActive("/")}>
            <img src={logo} alt="Chef's Atlas Logo" style={{ height: "52px", width: "auto" }} />
            <div className="logo-text">
              <span className="logo-title">Chef's Atlas</span>
              <span className="logo-sub">World Kitchen</span>
            </div>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${active === link.href ? "active" : ""}`}
                  onClick={() => setActive(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8a7060" strokeWidth="2.5" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              placeholder="Search recipes, cuisines…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="nav-right">
            <div className="nav-divider" />
            <a href="/profile" className="profile-btn" onClick={() => setActive("/profile")}>
              <div className="profile-avatar">A</div>
              <span className="profile-label">User Profile</span>
            </a>
            <a href="/recipes/new" className="cta-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Share Recipe
            </a>
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

     
    </>
  );
}