import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./UserDashboard.css";

const mockRecipes = [];

export default function UserDashboard() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("info");

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const joined = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "Recently joined";

  return (
    <div className="ud-page">
      <div className="ud-hero">
        <div className="ud-hero-bg" />
        <div className="ud-hero-content">
          <div className="ud-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div className="ud-hero-text">
            <h1 className="ud-name">{user.name}</h1>
            <p className="ud-email">{user.email}</p>
            <div className="ud-badges">
              <span className="ud-badge">Member since {joined}</span>
              <button type="button" className="ud-badge ud-badge-button" onClick={signOut}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="ud-body">
        <div className="ud-tabs">
          <button className={`ud-tab ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>
            <span>Profile</span> User Info
          </button>
          <button className={`ud-tab ${activeTab === "recipes" ? "active" : ""}`} onClick={() => setActiveTab("recipes")}>
            <span>Recipes</span> My Uploads
            <span className="ud-tab-pill">{mockRecipes.length}</span>
          </button>
        </div>

        <div className="ud-panel">
          {activeTab === "info" && (
            <div className="ud-info-grid">
              <div className="ud-info-card">
                <div className="ud-info-icon">U</div>
                <div className="ud-info-detail">
                  <span className="ud-info-lbl">Full Name</span>
                  <span className="ud-info-val">{user.name}</span>
                </div>
              </div>
              <div className="ud-info-card">
                <div className="ud-info-icon">@</div>
                <div className="ud-info-detail">
                  <span className="ud-info-lbl">Email Address</span>
                  <span className="ud-info-val">{user.email}</span>
                </div>
              </div>
              <div className="ud-info-card">
                <div className="ud-info-icon">D</div>
                <div className="ud-info-detail">
                  <span className="ud-info-lbl">Member Since</span>
                  <span className="ud-info-val">{joined}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "recipes" && (
            <div className="ud-empty-state">
              <span className="ud-empty-icon">+</span>
              <p>No recipes uploaded yet.</p>
              <Link to="/recipes/new" className="ud-upload-btn">+ Share Your First Recipe</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
