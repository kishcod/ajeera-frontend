import React, { useEffect, useState } from "react";
import { Users, Briefcase, BookOpen, Award } from "lucide-react";
import "../styles/stats.css";

function CountUp({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 80);

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}+</span>;
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stat">
        <Users size={32} />
        <h3><CountUp target={10000} /></h3>
        <p>Youths Trained</p>
      </div>

      <div className="stat">
        <Briefcase size={32} />
        <h3><CountUp target={2500} /></h3>
        <p>Jobs & Gigs</p>
      </div>

      <div className="stat">
        <BookOpen size={32} />
        <h3><CountUp target={120} /></h3>
        <p>Courses</p>
      </div>

      <div className="stat">
        <Award size={32} />
        <h3><CountUp target={3000} /></h3>
        <p>Certifications</p>
      </div>
    </section>
  );
}
