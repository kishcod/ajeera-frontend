import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import AgeFilter from "../components/AgeFilter";
import Card from "../components/Card";
import Stats from "../components/stats";
import "../styles/home.css";

export default function Home() {
  const [age, setAge] = useState(18);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const items = [
    { t: "Jobs", min: 18, max: 35 },
    { t: "Careers", min: 16, max: 30 },
    { t: "Data Offers", min: 18, max: 45 },
    { t: "Loans", min: 21, max: 45 },
    { t: "News", min: 15, max: 60 },
    { t: "Blogs", min: 16, max: 99 },
    { t: "Courses", min: 15, max: 60 },
  ];

  const handleCardClick = (disabled) => {
    if (disabled) {
      alert("🔒 Signup first to continue!");
      navigate("/", { replace: true }); // redirect to signup
    }
  };

  return (
    <>
      <Hero />
      <Stats />

      <section className="home-section">
        <h2 className="section-title">Explore Digital Opportunities</h2>
        <p className="section-subtitle">
          Opportunities tailored to your age and skills
        </p>

        <AgeFilter age={age} setAge={setAge} />

        <div className="cards-wrapper">
          <div className="cards">
            {items
              .filter((item) => age >= item.min && age <= item.max)
              .map((item, index) => (
                <Card
                  key={index}
                  title={item.t}
                  range={`${item.min}-${item.max}`}
                  disabled={!isLoggedIn}
                  onClick={() => handleCardClick(!isLoggedIn)}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>About Ajira Digital</h2>
        <p>
          Ajira Digital is a Government of Kenya initiative that equips youth
          with digital skills, online jobs, and sustainable income opportunities.
        </p>
        <ul>
          <li>✔ Verified online jobs & gigs</li>
          <li>✔ Digital skills training</li>
          <li>✔ Career growth pathways</li>
          <li>✔ News, blogs & resources</li>
        </ul>
      </section>
    </>
  );
}
