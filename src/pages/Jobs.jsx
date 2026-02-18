import React, { useEffect, useState } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(setJobs)
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <h1>Available Jobs</h1>
      {jobs.length === 0 && <p>No jobs available at the moment.</p>}

      {jobs.map((j) => (
        <div key={j.id} className="job-card">
          <h2>{j.title}</h2>
          <p><strong>Category:</strong> {j.category}</p>
          <p>{j.description}</p>
          <p><strong>Age range:</strong> {j.min_age} - {j.max_age}</p>
        </div>
      ))}
    </div>
  );
}
