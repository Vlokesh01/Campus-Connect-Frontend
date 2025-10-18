import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";
import { toast } from "react-toastify";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [joinedEventIds, setJoinedEventIds] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Fetch all events + my joined events
  const fetchData = useCallback(async () => {
    try {
      // All events
      const resEvents = await fetch(`${baseUrl}/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataEvents = await resEvents.json();
      setEvents(dataEvents.events || []);

      // My joined events
      const resMy = await fetch(`${baseUrl}/api/events/myevents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataMy = await resMy.json();
      setJoinedEventIds(dataMy.events.map((e) => e._id));
    } catch (err) {
      console.error(err);
    }
  }, [baseUrl, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Join event
  const handleJoinEvent = async (eventId) => {
    setLoadingId(eventId);
    try {
      if (!token) return alert("Please login first!");
      const res = await fetch(`${baseUrl}/api/events/join/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      if (!res.ok) return alert(data.message || "Something went wrong!");
      toast.success("Successfully joined the event!");
      fetchData(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to join the event.");
    }
    setLoadingId(null);
  };
  const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

  return (
    <motion.div className="min-h-screen bg-[#EBD3F8] p-6"
    variants={fadeDown}
    initial="hidden"
    whileInView="show"
     viewport={{ once: true, amount: 0.3 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-[#2E073F]">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-[#7A1CAC] mt-10">No events found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const isJoined = joinedEventIds.includes(event._id);
            const isLoading = loadingId === event._id;

            return (
              <div
                key={event._id}
                className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition flex flex-col justify-between border-2 border-[#AD49E1]"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#7A1CAC] mb-2">
                    {event.title}
                  </h2>
                  <p className="text-[#2E073F] mb-3">{event.description}</p>
                  <p className="text-sm text-[#AD49E1]">
                    📅 {new Date(event.date).toLocaleDateString("en-IN")}
                  </p>
                  <p className="text-xs text-[#AD49E1] mt-1">
                    Created on: {new Date(event.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                {isJoined ? (
                  <button
                    onClick={() => navigate("/user/myevents")}
                    className="mt-4 bg-[#7A1CAC] hover:bg-[#2E073F] text-white py-2 px-4 rounded-xl transition"
                  >
                    View in My Events
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinEvent(event._id)}
                    disabled={isLoading}
                    className="mt-4 bg-[#AD49E1] hover:bg-[#7A1CAC] text-white py-2 px-4 rounded-xl transition disabled:opacity-50"
                  >
                    {isLoading ? "Joining..." : "Join Event"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
