// src/pages/Blogs.jsx
import React, { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs"); // public route
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page">
      <h1>Ajira Digital Blog</h1>
      <p>Latest news, opportunities, and digital skills updates.</p>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="blogs-list">
          {blogs.map((b) => (
            <div key={b.id} className="blog-card">
              {b.image_url && (
                <img
                  src={`http://localhost:5000${b.image_url}`} // full URL to backend uploads
                  alt={b.title}
                  className="blog-image"
                  style={{ maxWidth: "200px", borderRadius: "8px" }}
                />
              )}
              <h2>{b.title}</h2>
              <p><em>by {b.author || "Admin"}</em></p>
              <p>{b.content}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
