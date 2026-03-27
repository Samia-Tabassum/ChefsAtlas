import { useState } from "react";
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <div className="signup-overlay">
      <div className="signup-card">

        <h2>Sign Up</h2>

        <form>
          <input placeholder="First Name" value={form.firstName} onChange={set("firstName")} />
          <input placeholder="Last Name" value={form.lastName} onChange={set("lastName")} />
          <input placeholder="Username" value={form.username} onChange={set("username")} />
          <input placeholder="Email" value={form.email} onChange={set("email")} />
          <input type="password" placeholder="Password" value={form.password} onChange={set("password")} />
          <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={set("confirmPassword")} />

          <button type="submit">Sign Up</button>
        </form>

      </div>
    </div>
  );
}