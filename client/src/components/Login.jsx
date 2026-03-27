import { useState, useEffect } from "react";


export default function Login({ onClose, onLoginSuccess }) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
}
export default function Login({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <button className="modal-close">X</button>

        <div className="modal-header">
          <h2 className="modal-title">Welcome back</h2>
          <p className="modal-subtitle">Sign in to continue</p>
        </div>

        <form className="modal-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>

      </div>
    </div>
  );
}