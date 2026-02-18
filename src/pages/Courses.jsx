// src/pages/Courses.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses") // fetch courses from backend
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  return (
    <div className="page-container">
      <h1>Ajira Courses</h1>
      {courses.length === 0 ? (
        <p>Loading courses...</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="course-card">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <span className="course-level">{course.level}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
