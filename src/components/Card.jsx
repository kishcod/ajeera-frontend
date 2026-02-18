import React from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css";

export default function Card({ title, range, disabled = false, onClick }) {
  const routes = {
    Jobs: "/jobs",
    Careers: "/careers",
    "Data Offers": "/data-offers",
    Loans: "/loans",
    News: "/news",
    Blogs: "/blogs",
    Courses: "/courses",
  };

  return (
    <Link
      to={disabled ? "#" : routes[title]}
      className={`card ${disabled ? "disabled" : ""}`}
      onClick={onClick}
    >
      {disabled && <div className="lock-overlay">🔒</div>}
      <h3>{title}</h3>
      <p>Age: {range}</p>
    </Link>
  );
}
