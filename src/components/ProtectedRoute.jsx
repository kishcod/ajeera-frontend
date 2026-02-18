import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
  role = null,
}) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Invalid user data in localStorage");
    localStorage.removeItem("user");
  }

  const isAuthenticated = !!token && !!user;

  // ❌ Not authenticated → Redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // ❌ Role restriction (if role is required)
  if (role && user.role !== role) {
    return <Navigate to="/home" replace />;
  }

  // ✅ Authorized
  return children;
}
