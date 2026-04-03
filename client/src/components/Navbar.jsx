import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Recipes", href: "/recipes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth();
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

  const userInitial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "A";

  async function handleLogout() {
    await signOut();
    setMenuOpen(false);
  }

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : "top"}`}>
      <div className="nav-inner">
        <Link to="/" className="logo">
          <img
            src={logo}
            alt="Chef's Atlas Logo"
            style={{ height: "102px", width: "auto" }}
          />
          <div className="logo-text">
            <span className="logo-title">Chef&apos;s Atlas</span>
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
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8a7060"
            strokeWidth="2.5"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            placeholder="Search recipes, cuisines..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="nav-right">
          <div className="nav-divider" />

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="profile-btn">
                <div className="profile-avatar">{userInitial}</div>
                <span className="profile-label">{user?.name || "User Profile"}</span>
              </Link>

              <Link to="/recipes/new" className="cta-btn">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Share Recipe
              </Link>

              <button type="button" className="logout-btn" onClick={handleLogout}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="ghost-btn link-btn">
                Login
              </Link>
              <Link to="/signup" className="profile-btn">
                <div className="profile-avatar">+</div>
                <span className="profile-label">Sign Up</span>
              </Link>
            </>
          )}

          <button
            type="button"
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-search">
          <input placeholder="Search recipes..." />
        </div>

        <ul className="mobile-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`mobile-nav-link ${location.pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mobile-footer">
          <Link to={isAuthenticated ? "/profile" : "/login"} className="mobile-profile">
            <div
              className="profile-avatar"
              style={{
                width: 34,
                height: 34,
                fontSize: 15,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c9742b 0%, #e8935c 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {isAuthenticated ? userInitial : "+"}
            </div>
            <div className="mobile-profile-info">
              <span className="mobile-profile-name">
                {isAuthenticated ? user?.name || "User Profile" : "Login"}
              </span>
              <span className="mobile-profile-role">
                {isAuthenticated ? "View Profile" : "Sign in or create account"}
              </span>
            </div>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/recipes/new" className="mobile-cta">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Share
              </Link>
              <button type="button" className="mobile-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="mobile-cta">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
