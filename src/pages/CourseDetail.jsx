// src/pages/CourseDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();

        // Ensure lessons is always an array
        if (!data.lessons) data.lessons = [];
        setCourse(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="page-container">
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p><strong>Level:</strong> {course.level}</p>

      <h2>Lessons</h2>
      {course.lessons.length === 0 ? (
        <p>No lessons yet. Check back soon!</p>
      ) : (
        <ul>
          {course.lessons.map((lesson) => (
            <li key={lesson.id} className="lesson-card">
              <h3>{lesson.title}</h3>
              <p>{lesson.content}</p>
              {lesson.video_url && <p>Video: <a href={lesson.video_url}>Watch</a></p>}
              {lesson.diagram_url && <p>Diagram: <a href={lesson.diagram_url}>View</a></p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
