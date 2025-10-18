import React, { useEffect, useState } from "react";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");
  const baseUrl  = process.env.REACT_APP_BACKEND_URL;

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/announcements`);
      const data = await res.json();
      if (res.ok) setAnnouncements(data.announcements || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content are required");

    try {
      const url = editingId
        ? `${baseUrl}/api/announcements/edit/${editingId}`
        : `${baseUrl}/api/announcements/create`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, expiryDate }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message || "Error saving announcement");

      alert(editingId ? "Announcement updated" : "Announcement created");
      setTitle("");
      setContent("");
      setExpiryDate("");
      setEditingId(null);
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleEdit = (ann) => {
    setEditingId(ann._id);
    setTitle(ann.title);
    setContent(ann.content);
    setExpiryDate(ann.expiryDate ? ann.expiryDate.slice(0, 10) : "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const res = await fetch(`${baseUrl}/api/announcements/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Error deleting");
      alert("Announcement deleted");
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#EBD3F8] p-6">
      <h1 className="text-3xl font-bold text-[#2E073F] mb-6 text-center">
        Manage Announcements
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md mb-8 max-w-md mx-auto border-2 border-[#AD49E1]"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#7A1CAC]">
          {editingId ? "Edit Announcement" : "Create Announcement"}
        </h2>
        <input
          className="w-full px-3 py-2 border rounded mb-3 border-[#AD49E1] focus:outline-none focus:ring-2 focus:ring-[#7A1CAC]"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full px-3 py-2 border rounded mb-3 border-[#AD49E1] focus:outline-none focus:ring-2 focus:ring-[#7A1CAC]"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 border rounded mb-3 border-[#AD49E1] focus:outline-none focus:ring-2 focus:ring-[#7A1CAC]"
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#7A1CAC] text-white py-2 px-4 rounded hover:bg-[#AD49E1] transition w-full"
        >
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      {/* Announcements List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((ann) => (
          <div
            key={ann._id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition relative border-2 border-[#AD49E1]"
          >
            <h2 className="text-xl font-semibold text-[#7A1CAC] mb-2">{ann.title}</h2>
            <p className="text-[#2E073F] mb-3">{ann.content}</p>
            {ann.expiryDate && (
              <p className="text-sm text-[#2E073F] mb-2">
                Expires on: {new Date(ann.expiryDate).toLocaleDateString("en-IN")}
              </p>
            )}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(ann)}
                className="bg-[#EBD3F8] text-[#2E073F] px-3 py-1 rounded hover:bg-[#AD49E1] transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(ann._id)}
                className="bg-[#7A1CAC] text-white px-3 py-1 rounded hover:bg-[#AD49E1] transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
