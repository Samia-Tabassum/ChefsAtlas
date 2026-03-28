import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Recipes", href: "/recipes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  showLogin,
  setShowLogin,
  onSwitchToSignup,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    onLogout(); // ✅ correct
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-inner">

          <Link to="/" className="logo">
            <img src={logo} alt="Chef's Atlas Logo" style={{ height: "102px", width: "auto" }} />
            <div className="logo-text">
              <span className="logo-title">Chef's Atlas</span>
              <span className="logo-sub">World Kitchen</span>
            </div>
          </Link>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`nav-link ${location.pathname === link.href ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8a7060" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              placeholder="Search recipes, cuisines…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="nav-right">
            <div className="nav-divider" />

            {isLoggedIn ? (
              <>
                <Link to="/profile" className="profile-btn">
                  <div className="profile-avatar">A</div>
                  <span className="profile-label">User Profile</span>
                </Link>

                <Link to="/recipes/new" className="cta-btn">
                  Share Recipe
                </Link>

                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button className="login-btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
            )}

            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (unchanged) */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {/* keep your existing code */}
      </div>

      {/* ✅ FINAL MERGED LOGIN MODAL */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={() => {
            onLoginSuccess(); // ✅ parent handles auth
            setShowLogin(false);
          }}
          onSwitchToSignup={() => {
            setShowLogin(false);
            onSwitchToSignup();
          }}
        />
      )}
    </>
  );
}