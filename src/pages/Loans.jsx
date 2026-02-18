import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loans.css";

// Import your images
import brianImg from "../assets/users/brian.jpg";
import faithImg from "../assets/users/faith.jpg";
import kevinImg from "../assets/users/kevin.jpg";
import mercyImg from "../assets/users/mercy.jpg";

export default function Loans() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const defaultLoans = [
    { id: 1, type: "Long Term Loan", amount: 20000, icon: "📆" },
    { id: 2, type: "Short Term Loan", amount: 10000, icon: "⚡" },
    { id: 3, type: "Business Loan", amount: 50000, icon: "🏢" },
    { id: 4, type: "Youth Grant", amount: 15000, icon: "🎓" },
  ];

  const [loans, setLoans] = useState([]);
  const [liveApplicants, setLiveApplicants] = useState(1544);
  const [popup, setPopup] = useState(null);

  // Fetch loans
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/loans", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setLoans(data))
      .catch(err => console.error(err));
  }, [token]);

  // Live Popup
  useEffect(() => {
    const users = [
      { name: "Brian", img: brianImg, phone: "+254712345678" },
      { name: "Faith", img: faithImg, phone: "+254798765432" },
      { name: "Kevin", img: kevinImg, phone: "+254701234567" },
      { name: "Mercy", img: mercyImg, phone: "+254734567890" },
    ];

    const amounts = [10000, 15000, 20000, 50000];

    const interval = setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];

      setPopup({ ...randomUser, amount: randomAmount });
      setTimeout(() => setPopup(null), 5000);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const pendingLoans = loans.filter(l => l.status === "pending");
  const approvedLoans = loans.filter(l => l.status === "approved");

  const hasApplied = (loanType) => loans.some(l => l.loan_type === loanType);

  return (
    <div className="loan-page">
      <h1 className="page-title">Government Youth Loan Programs</h1>

      <div className="stats-bar">
        <div>🔥 {liveApplicants}+ Youths Applied</div>
        <div>✅ {approvedLoans.length}+ Approved</div>
      </div>

      <div className="loan-grid">
        {defaultLoans.map(loan => {
          const applied = hasApplied(loan.type);
          return (
            <div key={loan.id} className={`loan-card ${applied ? "applied" : ""}`}>
              <div className="loan-icon">{loan.icon}</div>
              <h3>{loan.type}</h3>
              <p className="loan-amount">KES {loan.amount.toLocaleString()}</p>
              <button
                className="loan-btn"
                disabled={applied}
                onClick={() =>
                  navigate(`/apply-loan/${encodeURIComponent(loan.type)}`)
                }
              >
                {applied ? "Already Applied" : "Apply Now"}
              </button>
            </div>
          );
        })}
      </div>

      {pendingLoans.length > 0 && (
        <>
          <h2 className="section-title">Pending Applications</h2>
          <div className="loan-grid">
            {pendingLoans.map(loan => (
              <div key={loan.id} className="loan-card pending">
                <h3>{loan.loan_type}</h3>
                <p>KES {Number(loan.amount).toLocaleString()}</p>
                <span className="status pending-status">Pending ⏳</span>
              </div>
            ))}
          </div>
        </>
      )}

      {approvedLoans.length > 0 && (
        <>
          <h2 className="section-title">Approved Loans</h2>
          <div className="loan-grid">
            {approvedLoans.map(loan => (
              <div key={loan.id} className="loan-card approved">
                <h3>{loan.loan_type}</h3>
                <p>KES {Number(loan.amount).toLocaleString()}</p>
                <span className="status approved-status">Approved ✅</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* LIVE POPUP */}
      {popup && (
        <div className="live-popup">
          <img src={popup.img} alt={popup.name} />
          <div>
            <strong>{popup.name}</strong> ({popup.phone}) just received <br />
            KES {popup.amount.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
