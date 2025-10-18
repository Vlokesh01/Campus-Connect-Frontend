import React, { useEffect, useState, useCallback } from "react";

export default function AdminClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingClubId, setEditingClubId] = useState(null);

  // Base URL from .env
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem("token");

  // Fetch clubs
  const fetchClubs = useCallback(async () => {
    if (!token || !baseUrl) {
      console.error("Token or baseUrl missing");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/clubs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch clubs");
      }

      const data = await res.json();
      setClubs(Array.isArray(data.clubs) ? data.clubs : []);
    } catch (err) {
      console.error("Error fetching clubs:", err);
      setClubs([]);
    } finally {
      setLoading(false);
    }
  }, [token, baseUrl]);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  // Create or edit club
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("All fields are required");
      return;
    }

    if (!token || !baseUrl) {
      alert("Token or backend URL missing");
      return;
    }

    try {
      const url = editingClubId
        ? `${baseUrl}/api/clubs/edit/${editingClubId}`
        : `${baseUrl}/api/clubs/create`;
      const method = editingClubId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(editingClubId ? "Club updated successfully" : "Club created successfully");
        setName("");
        setDescription("");
        setEditingClubId(null);
        fetchClubs();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error saving club:", err);
    }
  };

  // Delete club
  const handleDelete = async (clubId) => {
    if (!window.confirm("Are you sure you want to delete this club?")) return;

    if (!token || !baseUrl) {
      alert("Token or backend URL missing");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/clubs/delete/${clubId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        alert("Club deleted successfully");
        fetchClubs();
      } else {
        alert(data.message || "Failed to delete club");
      }
    } catch (err) {
      console.error("Error deleting club:", err);
    }
  };

  // Start editing
  const startEditing = (club) => {
    setEditingClubId(club._id);
    setName(club.name);
    setDescription(club.description);
  };

  return (
    <div className="min-h-screen bg-[#EBD3F8] p-6">
      <h1 className="text-3xl font-bold text-[#2E073F] mb-6 text-center">
        Manage Clubs
      </h1>

      {/* Create/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto mb-6 border-2 border-[#AD49E1]"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#7A1CAC]">
          {editingClubId ? "Edit Club" : "Create Club"}
        </h2>
        <input
          type="text"
          placeholder="Club Name"
          className="w-full px-3 py-2 border rounded mb-4 border-[#AD49E1] focus:outline-none focus:ring-2 focus:ring-[#7A1CAC]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full px-3 py-2 border rounded mb-4 border-[#AD49E1] focus:outline-none focus:ring-2 focus:ring-[#7A1CAC]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-[#7A1CAC] text-white py-2 rounded hover:bg-[#AD49E1] transition"
        >
          {editingClubId ? "Update Club" : "Create Club"}
        </button>
      </form>

      {/* Clubs List */}
      {loading ? (
        <p className="text-center text-[#2E073F]">Loading clubs...</p>
      ) : Array.isArray(clubs) && clubs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between border-2 border-[#AD49E1]"
            >
              <div>
                <h3 className="text-xl font-semibold text-[#7A1CAC] mb-2">{club.name}</h3>
                <p className="text-[#2E073F] mb-3">{club.description}</p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => startEditing(club)}
                  className="bg-[#EBD3F8] text-[#2E073F] px-4 py-1 rounded hover:bg-[#AD49E1] transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(club._id)}
                  className="bg-[#7A1CAC] text-white px-4 py-1 rounded hover:bg-[#AD49E1] transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[#2E073F]">No clubs found.</p>
      )}
    </div>
  );
}
