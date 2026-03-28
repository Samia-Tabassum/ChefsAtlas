import { useState } from "react";
import "./ForgotPassword.css";

const [email, setEmail] = useState("");
const [error, setError] = useState("");
const [submitted, setSubmitted] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }
  setError("");
  setSubmitted(true);
};

export default function ForgotPassword({ onClose }) {
  return (
     <div className="fp-overlay" onClick={onClose}>
    <div className="fp-card" onClick={(e) => e.stopPropagation()}></div>
    <div>
      <div>
        <button onClick={onClose}>X</button>

        <h2>Forgot password?</h2>
        <p>No worries — enter your email and we'll send you a reset link.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          {error && <p>{error}</p>}
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
    </div>
  );
}