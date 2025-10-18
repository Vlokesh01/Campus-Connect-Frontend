import React, { useEffect, useState, useCallback } from "react";
import {motion} from "framer-motion";
import { toast } from "react-toastify";

export default function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // per-event loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem("token");

  // Fetch my events
  const fetchMyEvents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      if (!token) {
        setError("Please login first!");
        setLoading(false);
        return;
      }

      const res = await fetch(`${baseUrl}/api/events/myevents`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch events");
      } else {
        setEvents(data.events || []);
      }
    } catch (err) {
      console.error("Error fetching my events:", err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, [baseUrl, token]);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  // Leave / unregister event
  const leaveEvent = async (eventId) => {
    setLoadingId(eventId);
    try {
      const res = await fetch(`${baseUrl}/api/events/leave/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      

      if (res.ok) {
        toast.success("Successfully left the event!");
        fetchMyEvents(); // refresh list
      } else {
        toast.error( "Failed to leave event");
      }
    } catch (err) {
      console.error("Error leaving event:", err);
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
      <h1 className="text-3xl font-bold text-center mb-6 text-[#2E073F]">
        My Registered Events
      </h1>

      {loading ? (
        <p className="text-center text-[#7A1CAC]">Loading events...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-center text-[#7A1CAC]">
          You have not joined any events yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
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

                <button
                  onClick={() => leaveEvent(event._id)}
                  disabled={isLoading}
                  className="mt-4 bg-[#AD49E1] hover:bg-[#7A1CAC] text-white py-2 px-4 rounded-xl transition disabled:opacity-50"
                >
                  {isLoading ? "Leaving..." : "Leave Event"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
