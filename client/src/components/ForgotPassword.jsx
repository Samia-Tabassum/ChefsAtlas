import { useState } from "react";
import "./ForgotPassword.css";

export default function ForgotPassword({ onClose }) {
  return (
     <div className="fp-overlay" onClick={onClose}>
    <div className="fp-card" onClick={(e) => e.stopPropagation()}></div>
    <div>
      <div>
        <button onClick={onClose}>X</button>

        <h2>Forgot password?</h2>
        <p>No worries — enter your email and we'll send you a reset link.</p>

        <form>
          <input type="email" placeholder="you@example.com" />
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
    </div>
  );
}