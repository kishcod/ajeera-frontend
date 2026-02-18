import React from "react";
import { Link } from "react-router-dom";
import "../styles/hero.css";

export default function Hero() {
  return (
    <div
      style={{
        position: "relative",
        height: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))",
        }}
      />

      {/* AUTH BUTTONS */}
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 28,
          display: "flex",
          gap: 12,
          zIndex: 3,
        }}
      >
        <Link className="btn-outline" to="/login">Login</Link>
        <Link className="btn-primary" to="/signup">Sign Up</Link>
      </div>

      <div style={{ textAlign: "center", zIndex: 2, maxWidth: 700 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: 340,
            borderRadius: 18,
            marginBottom: 20,
            boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        <h1 style={{ fontSize: 52, fontWeight: 900, color: "#fff" }}>
          <span style={{ color: "#22c55e" }}>Ajira</span> Digital
        </h1>

        <p style={{ color: "#cbd5e1", fontSize: 18, marginTop: 10 }}>
          Empowering Kenyan Youth for the Digital Economy
        </p>
      </div>
    </div>
  );
}
