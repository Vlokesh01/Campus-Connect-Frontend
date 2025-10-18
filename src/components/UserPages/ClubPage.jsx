import React, { useEffect, useState, useCallback } from "react";
import { motion  } from "framer-motion";
import { toast } from "react-toastify";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const token = localStorage.getItem("token");
  // Fetch all clubs and user's joined clubs
  const fetchData = useCallback(async () => {
    try {
      const resClubs = await fetch(`${baseUrl}/api/clubs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataClubs = await resClubs.json();
      setClubs(dataClubs.clubs || []);
      const resMy = await fetch(`${baseUrl}/api/clubs/myclubs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataMy = await resMy.json();
      setJoinedClubs(dataMy.clubs.map((c) => c._id));
    } catch (err) {
      console.error(err);
    }
  }, [baseUrl, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Join club
  const joinClub = async (clubId) => {
    setLoadingId(clubId);
    try {
      const res = await fetch(`${baseUrl}/api/clubs/join/${clubId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message + " 🎉");
        fetchData();
      } else {
        toast.error("Failed to join club");
      }
    } catch (error) {
      console.error(error);
    }
    setLoadingId(null);
  };

  // View club members
  const viewMembers = async (clubId, clubName) => {
    try {
      const res = await fetch(`${baseUrl}/api/clubs/members/${clubId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMembers(data.members || []);
        setModalTitle(clubName);
        setShowModal(true);
      } else {
        alert(data.message || "Failed to fetch members");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };
  const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

  return (
    <motion.div className="min-h-screen bg-[#EBD3F8] p-6" 
    variants={fadeDown}
    initial="hidden"
    whileInView="show"
     viewport={{ once: true, amount: 0.3 }}
    >
      <h1 className="text-3xl font-bold text-center text-[#2E073F] mb-8">
        Available Clubs
      </h1>

      {clubs.length === 0 ? (
        <p className="text-center text-gray-600 mt-10 text-lg">
          No clubs available at the moment.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club) => {
            const isJoined = joinedClubs.includes(club._id);
            const isLoading = loadingId === club._id;

            return (
              <div
                key={club._id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between border-2 border-[#AD49E1] hover:shadow-xl transition"
              >
                <div>
                  <h2 className="text-xl font-semibold text-[#2E073F] mb-2">
                    {club.name}
                  </h2>
                  <p className="text-sm text-gray-600">{club.description}</p>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {isJoined ? (
                    <>
                      <button
                        onClick={() => viewMembers(club._id, club.name)}
                        className="bg-[#2E073F] hover:bg-[#7A1CAC] text-white py-2 px-4 rounded-xl transition"
                      >
                        View Members
                      </button>
                      <p className="text-sm text-green-600 text-center mt-1">
                        Joined ✅
                      </p>
                    </>
                  ) : (
                    <button
                      onClick={() => joinClub(club._id)}
                      disabled={isLoading}
                      className="bg-[#7A1CAC] hover:bg-[#2E073F] text-white py-2 px-4 rounded-xl transition disabled:opacity-50"
                    >
                      {isLoading ? "Joining..." : "Join Club"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
          <motion.div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md" 
          variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"

          >
            <h2 className="text-xl font-semibold text-[#2E073F] mb-4">
              Members of {modalTitle}
            </h2>
            <ul className="max-h-60 overflow-y-auto">
              {members.length === 0 ? (
                <p className="text-gray-500 text-center">No members yet.</p>
              ) : (
                members.map((member) => (
                  <li key={member._id} className="border-b py-2">
                    <p className="text-gray-700">{member.name}</p>
                    <p className="text-gray-500 text-sm">{member.email}</p>
                  </li>
                ))
              )}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-[#AD49E1] hover:bg-[#7A1CAC] text-white py-2 px-4 rounded-xl transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
