import React from "react";
import '../style.css';
export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Ajira Digital</p>
      <div>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
}
