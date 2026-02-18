import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ApplicationFormPage.css"; // Import the CSS

export default function ApplicationFormPage({ token, onSuccess }) {
  const { loanType } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
    age: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          loan_type: loanType,
          ...formData,
        }),
      });

      if (res.ok) {
        const newLoan = await res.json();
        alert("Application Submitted Successfully!");
        onSuccess(newLoan);
        navigate("/loans"); // go back to loans page
      } else {
        const errData = await res.json();
        alert("Failed to submit loan: " + (errData.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="application-page">
      <h2>Apply for {decodeURIComponent(loanType)}</h2>

      <form className="application-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Your Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Residential Address"
          value={formData.address}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Purpose of Loan"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Application</button>
        <button
          type="button"
          className="close-btn"
          onClick={() => navigate("/loans")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
