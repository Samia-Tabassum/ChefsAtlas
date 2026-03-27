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

  const [error, setError] = useState("");

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.firstName || !form.lastName)
      return "Enter full name";
    if (form.username.length < 3)
      return "Username too short";
    if (!form.email.includes("@"))
      return "Invalid email";
    if (form.password.length < 8)
      return "Password too short";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    alert("Signup success!");
  };

  return (
    <div className="signup-overlay">
      <div className="signup-card">

        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="First Name" value={form.firstName} onChange={set("firstName")} />
          <input placeholder="Last Name" value={form.lastName} onChange={set("lastName")} />
          <input placeholder="Username" value={form.username} onChange={set("username")} />
          <input placeholder="Email" value={form.email} onChange={set("email")} />
          <input type="password" placeholder="Password" value={form.password} onChange={set("password")} />
          <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={set("confirmPassword")} />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Sign Up</button>
        </form>

      </div>
    </div>
  );
}