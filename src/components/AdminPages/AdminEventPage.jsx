import React, { useEffect, useState } from "react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editingEventId, setEditingEventId] = useState(null);
  const token = localStorage.getItem("token");
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch events created by this ClubAdmin
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setEvents(data.events || []);
      } else {
        alert(data.message || "Failed to fetch events");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  });

  // Create Event
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title || !description || !date) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/events/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, date }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Event created successfully ✅");
        setTitle("");
        setDescription("");
        setDate("");
        fetchEvents();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  // Edit Event
  const handleEdit = async (e) => {
    e.preventDefault();

    if (!title || !description || !date) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        `${baseUrl}/api/events/edit/${editingEventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description, date }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Event updated successfully ✏️");
        setTitle("");
        setDescription("");
        setDate("");
        setEditingEventId(null);
        fetchEvents();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error editing event:", err);
    }
  };

  // Delete Event
  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(
        `${baseUrl}/api/events/delete/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Event deleted successfully ❌");
        fetchEvents();
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  // Fill form for editing
  const startEditing = (event) => {
    setEditingEventId(event._id);
    setTitle(event.title);
    setDescription(event.description);
    setDate(new Date(event.date).toISOString().slice(0, 16)); // for datetime-local input
  };

  return (
    <div className="p-6 bg-[#EBD3F8] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#2E073F] text-center">
        Admin Event Management
      </h1>

      {/* Create/Edit Form */}
      <form
        onSubmit={editingEventId ? handleEdit : handleCreate}
        className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md mb-10 border-2 border-[#AD49E1]"
      >
        <h2 className="text-xl font-semibold mb-4 text-[#7A1CAC]">
          {editingEventId ? "Edit Event ✏️" : "Create Event ➕"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border rounded p-2 mb-3 border-[#AD49E1]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border rounded p-2 mb-3 border-[#AD49E1]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="datetime-local"
          className="w-full border rounded p-2 mb-4 border-[#AD49E1]"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          type="submit"
          className="bg-[#7A1CAC] text-white px-4 py-2 rounded hover:bg-[#AD49E1] w-full"
        >
          {editingEventId ? "Update Event" : "Create Event"}
        </button>

        {editingEventId && (
          <button
            type="button"
            onClick={() => {
              setEditingEventId(null);
              setTitle("");
              setDescription("");
              setDate("");
            }}
            className="mt-2 bg-[#2E073F] text-white px-4 py-2 rounded w-full hover:bg-[#7A1CAC]"
          >
            Cancel Editing
          </button>
        )}
      </form>

      {/* Events List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-5 rounded-2xl shadow flex flex-col justify-between border-2 border-[#AD49E1]"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#7A1CAC]">
                  {event.title}
                </h3>
                <p className="text-[#2E073F]">{event.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  📅 {new Date(event.date).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => startEditing(event)}
                  className="flex-1 bg-[#EBD3F8] text-[#2E073F] py-1 rounded hover:bg-[#AD49E1]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="flex-1 bg-[#7A1CAC] text-white py-1 rounded hover:bg-[#AD49E1]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#2E073F] text-center col-span-full">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
}
