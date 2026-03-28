import { useState } from "react";

export default function ForgotPassword({ onClose }) {
  return (
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
  );
}