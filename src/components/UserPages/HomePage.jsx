import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();

  const today = new Date();
  const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const name = localStorage.getItem("name");
  const srn = localStorage.getItem("srn");

  // 🔹 Fade down for header
  const fadeDown = {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // 🔹 Fade up for sections
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay },
    },
  });

  // 🔹 Stagger container for sections
  const containerStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // 🔹 Card animation
  const cardMotion = {
    whileHover: { scale: 1.03, y: -5 },
    whileTap: { scale: 0.97 },
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#EBD3F8" }}>
      {/* Header */}
      <motion.header
        className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 rounded-lg shadow-md"
        style={{ backgroundColor: "#2E073F" }}
        variants={fadeDown}
        initial="hidden"
        animate="show"
      >
        <h1 className="text-lg sm:text-2xl font-bold tracking-wide text-white mb-2 sm:mb-0">
          Welcome, Student 👋
        </h1>
      </motion.header>

      {/* Profile Card */}
      <motion.div
        variants={fadeUp(0.2)}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-lg p-5 w-full max-w-3xl mx-auto mb-12 border-2 border-[#AD49E1]"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full"
            style={{ backgroundColor: "#EBD3F8" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
              style={{ color: "#7A1CAC" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 uppercase">{name}</h3>
            <h6 className="text-sm text-gray-500 uppercase">{srn}</h6>
            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>
        </div>
      </motion.div>

      {/* Events Section */}
      <motion.section
        variants={containerStagger}
        initial="hidden"
        animate="show"
        className="mb-12"
      >
        <motion.h2 variants={fadeUp(0)} className="text-xl font-semibold mb-4" style={{ color: "#2E073F" }}>
          🎯 Events
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            {...cardMotion}
            variants={fadeUp(0.1)}
            onClick={() => navigate("/user/events")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow transition border-2 border-[#AD49E1]"
          >
            <h3 className="text-lg font-semibold mb-2" style={{ color: "#7A1CAC" }}>
              All Events
            </h3>
            <p className="text-gray-600 text-sm">See all upcoming events and register</p>
          </motion.div>

          <motion.div
            {...cardMotion}
            variants={fadeUp(0.2)}
            onClick={() => navigate("/user/myevents")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow transition border-2 border-[#AD49E1]"
          >
            <h3 className="text-lg font-semibold mb-2" style={{ color: "#7A1CAC" }}>
              My Events
            </h3>
            <p className="text-gray-600 text-sm">View events you have joined</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Clubs Section */}
      <motion.section
        variants={containerStagger}
        initial="hidden"
        animate="show"
        className="mb-12"
      >
        <motion.h2 variants={fadeUp(0)} className="text-xl font-semibold mb-4" style={{ color: "#2E073F" }}>
          🏛 Clubs
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            {...cardMotion}
            variants={fadeUp(0.1)}
            onClick={() => navigate("/user/clubs")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow transition border-2 border-[#AD49E1]"
          >
            <h3 className="text-lg font-semibold mb-2" style={{ color: "#7A1CAC" }}>
              All Clubs
            </h3>
            <p className="text-gray-600 text-sm">Explore all clubs available</p>
          </motion.div>

          <motion.div
            {...cardMotion}
            variants={fadeUp(0.2)}
            onClick={() => navigate("/user/myclubs")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow transition border-2 border-[#AD49E1]"
          >
            <h3 className="text-lg font-semibold mb-2" style={{ color: "#7A1CAC" }}>
              My Clubs
            </h3>
            <p className="text-gray-600 text-sm">See clubs you are a member of</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Announcements Section */}
      <motion.section
        variants={containerStagger}
        initial="hidden"
        animate="show"
      >
        <motion.h2 variants={fadeUp(0)} className="text-xl font-semibold mb-4" style={{ color: "#2E073F" }}>
          📢 Announcements
        </motion.h2>
        <motion.div
          {...cardMotion}
          variants={fadeUp(0.1)}
          onClick={() => navigate("/user/announcements")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow transition sm:max-w-xs border-2 border-[#AD49E1]"
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: "#7A1CAC" }}>
            All Announcements
          </h3>
          <p className="text-gray-600 text-sm">See all important updates</p>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        variants={fadeUp(0.4)}
        initial="hidden"
        animate="show"
        className="mt-12 text-center text-gray-500 text-sm"
      >
        <p>© 2025 Campus Club. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
