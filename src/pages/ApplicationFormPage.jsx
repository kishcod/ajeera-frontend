// src/pages/ApplicationFormPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/application.css";

export default function ApplicationFormPage() {
  const { loanType } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const defaultAmounts = {
    "Long Term Loan": 20000,
    "Short Term Loan": 10000,
    "Business Loan": 50000,
    "Youth Grant": 15000,
  };

  const [amount, setAmount] = useState(0);
  const [existingLoan, setExistingLoan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });

  /* ---------------- SET DEFAULT AMOUNT ---------------- */
  useEffect(() => {
    if (loanType && defaultAmounts[loanType]) {
      setAmount(defaultAmounts[loanType]);
    }
  }, [loanType]);

  /* ---------------- CHECK IF USER ALREADY APPLIED ---------------- */
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/loans", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const found = data.find(l => l.loan_type === loanType);
        if (found) setExistingLoan(found);
      })
      .catch(err => console.error(err));
  }, [loanType, token]);

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          loan_type: loanType,
          name: formData.name,
          phone: formData.phone,
          description: formData.description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Application failed.");
      } else {
        setMessage("✅ Application submitted successfully!");
        setExistingLoan(data);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    }

    setLoading(false);
  };

  /* ---------------- IF ALREADY APPLIED ---------------- */
  if (existingLoan) {
    return (
      <div className="application-page">
        <div className="application-card">
          <h2>{loanType}</h2>
          <p className="amount">
            KES {Number(existingLoan.amount).toLocaleString()}
          </p>

          <div className={`status ${existingLoan.status}`}>
            {existingLoan.status.toUpperCase()}
          </div>

          <button onClick={() => navigate("/loans")} className="back-btn">
            Back to Loans
          </button>
        </div>
      </div>
    );
  }

  /* ---------------- FORM UI ---------------- */
  return (
    <div className="application-page">
      <div className="application-card">

        <h2>{loanType}</h2>
        <p className="amount">
          Default Amount: <strong>KES {amount.toLocaleString()}</strong>
        </p>

        {message && <div className="form-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (+254...)"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Describe how you will use the loan"
            required
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>

        <button onClick={() => navigate("/loans")} className="back-btn">
          Cancel
        </button>

      </div>
    </div>
  );
}
