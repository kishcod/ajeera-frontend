import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Card.css";

export default function Card({ 
  title, 
  range, 
  isPremiumUser = false, 
  premiumOnly = false 
}) {

  const navigate = useNavigate();

  const routes = {
    Jobs: "/jobs",
    Careers: "/careers",
    "Data Offers": "/data-offers",
    Loans: "/loans",
    News: "/news",
    Blogs: "/blogs",
    Courses: "/courses",
  };

  const handleClick = (e) => {
    if (premiumOnly && !isPremiumUser) {
      e.preventDefault();
      alert("This feature is available for Premium users only.");
      return;
    }

    navigate(routes[title]);
  };

  return (
    <div
      className={`card ${premiumOnly && !isPremiumUser ? "locked" : ""}`}
      onClick={handleClick}
    >
      {premiumOnly && !isPremiumUser && (
        <div className="lock-overlay">🔒</div>
      )}
      <h3>{title}</h3>
      <p>Age: {range}</p>
    </div>
  );
}
