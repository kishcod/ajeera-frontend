// src/pages/Admin.jsx
import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import "../styles/admin.css";

export default function Admin() {
  const token = localStorage.getItem("token"); // JWT after login
  const [activeTab, setActiveTab] = useState("courses");

  // ---------------- STATES ----------------
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loans, setLoans] = useState([]);

  const [newCourse, setNewCourse] = useState({ title: "", description: "", level: "", image: null });
  const [newLesson, setNewLesson] = useState({ course_id: "", title: "", content: "", video_url: "", diagram_url: "", image: null });
  const [newBlog, setNewBlog] = useState({ title: "", content: "", author: "", image: null });
  const [newJob, setNewJob] = useState({ title: "", category: "", description: "", min_age: "", max_age: "" });

  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {
    if (!token) return;
    setLoadingData(true);
    setErrorMessage("");

    const endpoints = [
      ["courses", "courses"],
      ["lessons", "lessons"],
      ["blogs", "blogs"],
      ["jobs", "jobs"],
      ["loans", "loans/admin"]
    ];

    try {
      const results = await Promise.all(
        endpoints.map(([key, url]) =>
          fetch(`http://localhost:5000/api/admin/${url}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then(res => {
              if (!res.ok) throw new Error(`Failed to fetch ${key}`);
              return res.json();
            })
            .catch(err => {
              console.error(err);
              return [];
            })
        )
      );

      setCourses(results[0]);
      setLessons(results[1]);
      setBlogs(results[2]);
      setJobs(results[3]);
      setLoans(results[4]);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setErrorMessage("Failed to load admin data. Check your backend or token.");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // ---------------- CREATE ITEM ----------------
  const handleCreate = async (type, data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));

      const res = await fetch(`http://localhost:5000/api/admin/${type}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error(`Failed to create ${type}`);
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ---------------- JOB CREATION ----------------
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/admin/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) throw new Error("Failed to create job");
      alert("Job created successfully!");
      setNewJob({ title: "", category: "", description: "", min_age: "", max_age: "" });
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ---------------- LOAN APPROVAL ----------------
  const handleLoanUpdate = async (loanId, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/loans/${loanId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update loan status");
      alert(`Loan marked as ${status}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ---------------- RENDER ----------------
  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {loadingData && <div className="loading">Loading data...</div>}

      {/* ---------------- TABS ---------------- */}
      <nav className="admin-tabs">
        {["courses", "lessons", "blogs", "jobs", "loans"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </nav>

      <div className="admin-content">
        {/* ---------------- COURSES ---------------- */}
        {activeTab === "courses" && (
          <div className="admin-section">
            <h2>Courses</h2>
            <form className="admin-form" onSubmit={(e) => { e.preventDefault(); handleCreate("courses", newCourse); }}>
              <input placeholder="Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
              <textarea placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
              <input placeholder="Level" value={newCourse.level} onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })} />
              <input type="file" onChange={(e) => setNewCourse({ ...newCourse, image: e.target.files[0] })} />
              <button type="submit">Create Course</button>
            </form>
            <ul className="admin-list">
              {courses.map(c => (
                <li key={c.id}>
                  {c.image_url && <img src={c.image_url} alt={c.title} width="50" />}
                  {c.title} - {c.level}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ---------------- LESSONS ---------------- */}
        {activeTab === "lessons" && (
          <div className="admin-section">
            <h2>Lessons</h2>
            <form className="admin-form" onSubmit={(e) => { e.preventDefault(); handleCreate("lessons", newLesson); }}>
              <input placeholder="Course ID" value={newLesson.course_id} onChange={(e) => setNewLesson({ ...newLesson, course_id: e.target.value })} />
              <input placeholder="Title" value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} />
              <textarea placeholder="Content" value={newLesson.content} onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })} />
              <input placeholder="Video URL" value={newLesson.video_url} onChange={(e) => setNewLesson({ ...newLesson, video_url: e.target.value })} />
              <input placeholder="Diagram URL" value={newLesson.diagram_url} onChange={(e) => setNewLesson({ ...newLesson, diagram_url: e.target.value })} />
              <input type="file" onChange={(e) => setNewLesson({ ...newLesson, image: e.target.files[0] })} />
              <button type="submit">Create Lesson</button>
            </form>
            <ul className="admin-list">
              {lessons.map(l => <li key={l.id}>{l.title} (Course ID: {l.course_id})</li>)}
            </ul>
          </div>
        )}

        {/* ---------------- BLOGS ---------------- */}
        {activeTab === "blogs" && (
          <div className="admin-section">
            <h2>Blogs</h2>
            <form className="admin-form" onSubmit={(e) => { e.preventDefault(); handleCreate("blogs", newBlog); }}>
              <input placeholder="Title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} />
              <textarea placeholder="Content" value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })} />
              <input placeholder="Author" value={newBlog.author} onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })} />
              <input type="file" onChange={(e) => setNewBlog({ ...newBlog, image: e.target.files[0] })} />
              <button type="submit">Create Blog</button>
            </form>
            <ul className="admin-list">
              {blogs.map(b => (
                <li key={b.id}>
                  {b.image_url && <img src={b.image_url} alt={b.title} width="50" />}
                  {b.title} by {b.author}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ---------------- JOBS ---------------- */}
        {activeTab === "jobs" && (
          <div className="admin-section">
            <h2>Jobs</h2>
            <form className="admin-form" onSubmit={handleJobSubmit}>
              <input placeholder="Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} />
              <input placeholder="Category" value={newJob.category} onChange={(e) => setNewJob({ ...newJob, category: e.target.value })} />
              <textarea placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} />
              <input placeholder="Min Age" value={newJob.min_age} onChange={(e) => setNewJob({ ...newJob, min_age: e.target.value })} />
              <input placeholder="Max Age" value={newJob.max_age} onChange={(e) => setNewJob({ ...newJob, max_age: e.target.value })} />
              <button type="submit">Create Job</button>
            </form>
            <ul className="admin-list">
              {jobs.map(j => <li key={j.id}>{j.title} - {j.category}</li>)}
            </ul>
          </div>
        )}

        {/* ---------------- LOANS ---------------- */}
        {activeTab === "loans" && (
          <div className="admin-section">
            <h2>Loans</h2>
            {loans.length === 0 ? (
              <p>No loan applications yet.</p>
            ) : (
              <ul className="admin-list">
                {loans.map(l => (
                  <li key={l.id} className="loan-admin-item">
                    <strong>{l.user_name}</strong> ({l.user_email}) - KES {l.amount.toLocaleString()} - <em>{l.status}</em>
                    {l.status === "pending" && (
                      <span className="loan-buttons">
                        <button onClick={() => handleLoanUpdate(l.id, "approved")}>Approve</button>
                        <button onClick={() => handleLoanUpdate(l.id, "rejected")}>Reject</button>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
