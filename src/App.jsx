import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import Jobs from "./pages/Jobs";
import Careers from "./pages/Careers";
import DataOffers from "./pages/DataOffers";
import Loans from "./pages/Loans";
import Blogs from "./pages/Blogs";
import CourseDetail from "./pages/CourseDetail";
import Admin from "./pages/Admin";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import ApplicationFormPage from "./pages/ApplicationFormPage";

// Components
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1 }}>
          <Routes>
            {/* ===== PUBLIC PAGES ===== */}
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />

            {/* ===== PROTECTED PAGES ===== */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
            <Route path="/careers" element={<ProtectedRoute><Careers /></ProtectedRoute>} />
            <Route path="/data-offers" element={<ProtectedRoute><DataOffers /></ProtectedRoute>} />
            <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />
            <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />

            {/* Loan application */}
            <Route path="/apply-loan/:loanType" element={<ProtectedRoute><ApplicationFormPage /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

            {/* ===== FALLBACK ===== */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
