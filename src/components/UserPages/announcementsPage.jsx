import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function UserAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/announcements`);
        const data = await res.json();
        if (res.ok) setAnnouncements(data.announcements || []);
        else console.error(data.message || "Failed to fetch announcements");
      } catch (err) {
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  },);
  const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

  return (
    <motion.div className="min-h-screen bg-[#EBD3F8] p-6" 
    variants={fadeDown}
    initial="hidden"
    whileInView="show"
     viewport={{ once: true, amount: 0.3 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-[#2E073F]">
        Announcements
      </h1>

      {loading ? (
        <p className="text-center text-[#7A1CAC]">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className="text-center text-[#7A1CAC]">No announcements found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((ann) => (
            <div
              key={ann._id}
              className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition border-2 border-[#AD49E1]"
            >
              <h2 className="text-xl font-semibold text-[#7A1CAC] mb-2">
                {ann.title}
              </h2>
              <p className="text-[#2E073F] mb-3">{ann.content}</p>
              {ann.expiryDate && (
                <p className="text-sm text-[#AD49E1]">
                  Expires on: {new Date(ann.expiryDate).toLocaleDateString("en-IN")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
