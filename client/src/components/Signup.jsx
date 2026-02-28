import { useState } from "react";
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || { general: data.message });
      } else {
        localStorage.setItem("token", data.token);
        setSuccess(true);
        setTimeout(() => window.location.href = "/", 1200);
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-top">
        <h1 className="auth-heading">Sign Up</h1>
        <p className="auth-subheading">Join Chef's Atlas and start sharing your favourite recipes with the world.</p>
      </div>

      <div className="auth-card">
        {success && <div className="auth-success-box">✓ Account created! Redirecting…</div>}
        {errors.general && <div className="auth-error-box">{errors.general}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="name" type="text" placeholder="Enter your name"
              value={form.name} onChange={handleChange} required
              className={`form-input ${errors.name ? "input-error" : ""}`} />
            {errors.name && <span className="error-msg">{errors.name[0]}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" placeholder="Enter your email"
              value={form.email} onChange={handleChange} required
              className={`form-input ${errors.email ? "input-error" : ""}`} />
            {errors.email && <span className="error-msg">{errors.email[0]}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" placeholder="Min. 8 characters"
              value={form.password} onChange={handleChange} required
              className={`form-input ${errors.password ? "input-error" : ""}`} />
            {errors.password && <span className="error-msg">{errors.password[0]}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input name="password_confirmation" type="password" placeholder="Repeat your password"
              value={form.password_confirmation} onChange={handleChange} required
              className="form-input" />
          </div>

          <button type="submit" disabled={loading} className={`auth-btn ${loading ? "btn-loading" : ""}`}>
            {loading ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <a href="/login" className="auth-link">Log In</a>
        </p>
      </div>

      <div className="auth-bottom-image" />
    </div>
  );
}