import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role is provided and doesn't match, redirect to home
  if (role && userRole !== role) {
    if (userRole === "clubadmin") return <Navigate to="/admin/home" replace />;
    else return <Navigate to="/user/home" replace />;
  }

  return children;
}
