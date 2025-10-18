import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function MyClubs() {
  const [myClubs, setMyClubs] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const token = localStorage.getItem("token");
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch user's joined clubs
  const fetchMyClubs = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${baseUrl}/api/clubs/myclubs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMyClubs(data.clubs || []);
    } catch (err) {
      console.error(err);
    }
  }, [baseUrl, token]);

  useEffect(() => {
    fetchMyClubs();
  }, [fetchMyClubs]);

  // Leave club
  const leaveClub = async (clubId) => {
    setLoadingId(clubId);
    try {
      const res = await fetch(`${baseUrl}/api/clubs/leave/${clubId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success( data.message + " 🎉");
        fetchMyClubs();
      } else {
        toast.error("Failed to leave club");
      }
    } catch (error) {
      console.error(error);
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
      <h1 className="text-3xl font-bold text-center text-[#2E073F] mb-8 ">
        My Joined Clubs
      </h1>

      {myClubs.length === 0 ? (
        <p className="text-center text-gray-600 mt-10 text-lg">
          You haven’t joined any clubs yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {myClubs.map((club) => {
            const isLoading = loadingId === club._id;
            return (
              <div
                key={club._id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-xl transition  border-2 border-[#AD49E1]"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#2E073F] mb-2">
                    {club.name}
                  </h2>
                  <p className="text-sm text-gray-600">{club.description}</p>
                </div>
                <button
                  onClick={() => leaveClub(club._id)}
                  disabled={isLoading}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl transition disabled:opacity-50 "
                >
                  {isLoading ? "Leaving..." : "Leave Club"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
