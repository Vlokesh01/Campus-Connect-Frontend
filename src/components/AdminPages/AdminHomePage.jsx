import React from "react";
import { useNavigate } from "react-router-dom";

export default function ClubAdminHomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#EBD3F8] p-6">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#2E073F]">
          Welcome, Club Admin!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-[#7A1CAC] text-white px-4 py-2 rounded hover:bg-[#AD49E1] transition"
        >
          Logout
        </button>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Manage Events */}
        <div
          onClick={() => navigate("/admin/events")}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-2 border-[#AD49E1] transition flex flex-col items-center justify-center"
        >
          <h2 className="text-xl font-semibold mb-2 text-[#7A1CAC]">
            Manage Events
          </h2>
          <p className="text-[#2E073F] text-center">
            Create, edit, or delete events
          </p>
        </div>

        {/* Manage Clubs */}
        <div
          onClick={() => navigate("/admin/clubs")}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-2 border-[#AD49E1] transition flex flex-col items-center justify-center"
        >
          <h2 className="text-xl font-semibold mb-2 text-[#7A1CAC]">
            Manage Clubs
          </h2>
          <p className="text-[#2E073F] text-center">
            Create, edit, or delete clubs
          </p>
        </div>
        {/* Manage Announcements */}
        <div
          onClick={() => navigate("/admin/announcements")}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border-2 border-[#AD49E1] transition flex flex-col items-center justify-center"
        >
          <h2 className="text-xl font-semibold mb-2 text-[#7A1CAC]">
            Manage Announcements
          </h2>
          <p className="text-[#2E073F] text-center">
            Create, edit, or delete announcements
          </p>
        </div>
      </div>
    </div>
  );
}
