import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    premium: "no",
    premiumPaid: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Social proof notifications
  const notifications = [
    { name: "Kenedy", msg: "joined Premium", img: "/assets/profiles/kenedy.jpg" },
    { name: "Mike Lucy", msg: "got Ksh 25k grant", img: "/assets/profiles/mike.jpg" },
    { name: "Alice W.", msg: "joined Premium", img: "/assets/profiles/alice.jpg" },
    { name: "John K.", msg: "got Ksh 50k grant", img: "/assets/profiles/john.jpg" },
    { name: "Mary L.", msg: "joined Premium", img: "/assets/profiles/mary.jpg" },
  ];

  const [currentNotification, setCurrentNotification] = useState(0);

  // Rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePremiumYes = () => {
    setForm({ ...form, premium: "yes" });
    setShowModal(true);
  };

  const handlePayNow = () => {
    window.open("https://short.payhero.co.ke/s/cwNCH9UPvaHGn9chVyr5iW", "_blank");
    setForm({ ...form, premiumPaid: 1 });
    setShowModal(false);
    alert("Payment successful! You can now finish signup.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.premium === "yes" && form.premiumPaid === 0) {
      setError("Please complete Premium payment to proceed");
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Signup successful! You can now login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1><span>Ajira</span> Sign Up</h1>
        <p>Create your digital account</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="password-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <span className="toggle-password" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <div className="premium-section">
            <p>Join Premium Membership?</p>
            <div className="radio-group small-radio">
              <label>
                <input type="radio" name="premium" value="yes" checked={form.premium === "yes"} onChange={handlePremiumYes} />
                <span>Yes</span>
              </label>
              <label>
                <input type="radio" name="premium" value="no" checked disabled />
                <span>No</span>
              </label>
            </div>
          </div>

          <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
        </form>

        <p className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>

      {/* Premium Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2>Premium Membership Benefits</h2>
            <ul>
              <li>⭐ Direct access to Nyota Fund & Grants</li>
              <li>⭐ Access to Business Loans</li>
              <li>⭐ Access to Premium Government Services</li>
            </ul>
            <p>Premium deposit: Ksh 100</p>
            <div className="modal-actions">
              <button className="pay-btn" onClick={handlePayNow}>Pay Now</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Social proof */}
      <div className="social-proof">
        <img src={notifications[currentNotification].img} alt={notifications[currentNotification].name} />
        <span>
          {notifications[currentNotification].name} {notifications[currentNotification].msg}
        </span>
      </div>
    </div>
  );
}
