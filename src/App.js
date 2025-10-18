import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Toastify for notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth Pages
import LoginPage from "./components/AuthPages/LoginPage.jsx";
import SignupPage from "./components/AuthPages/SignupPage.jsx";
import ClubAdminRegister from "./components/AdminPages/AdminSignUpPage.jsx";

// User Pages
import UserHomePage from "./components/UserPages/HomePage.jsx";
import EventsPage from "./components/UserPages/EventsPage.jsx";
import MyEventsPage from "./components/UserPages/MyEventsPage.jsx";
import ClubPage from "./components/UserPages/ClubPage.jsx";
import MyClubPage from "./components/UserPages/MyClubPage.jsx";
import MyAnnouncementsPage from "./components/UserPages/announcementsPage.jsx";
import LandingPage from "./components/UserPages/landingPage.jsx";

// Admin Pages
import ClubAdminHomePage from "./components/AdminPages/AdminHomePage.jsx";
import ClubAdminPage from "./components/AdminPages/AdminClubPage.jsx";
import AdminEventPage from "./components/AdminPages/AdminEventPage.jsx";
import AdminAnnouncementsPage from "./components/AdminPages/AdminAnnoucementPage.jsx";

// Provide routing for the application
import ProtectedRoute from "./components/ProctedRoutes/protectedRoute.js";

export default function App() {
  return (
    <Router>
      {/* Toast Container should be outside Routes */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/signup" element={<ClubAdminRegister />} />

        {/* User Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/user/home"
          element={
            <ProtectedRoute role="student">
              <UserHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/events"
          element={
            <ProtectedRoute role="student">
              <EventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/myevents"
          element={
            <ProtectedRoute role="student">
              <MyEventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/clubs"
          element={
            <ProtectedRoute role="student">
              <ClubPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/myclubs"
          element={
            <ProtectedRoute role="student">
              <MyClubPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/announcements"
          element={
            <ProtectedRoute role="student">
              <MyAnnouncementsPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/home" element={<ClubAdminHomePage />} />
        <Route path="/admin/clubs" element={<ClubAdminPage />} />
        <Route path="/admin/events" element={<AdminEventPage />} />
        <Route
          path="/admin/announcements"
          element={<AdminAnnouncementsPage />}
        />
      </Routes>
    </Router>
  );
}
