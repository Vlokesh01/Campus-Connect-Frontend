import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "../../assets/login-pic.jpg";
import { useNavigate } from "react-router-dom";

// Left Banner animation
const bannerVariants = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Right Form animation
const formVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
  },
};

export default function StudentSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    srn: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "student" }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Student registered successfully ✅");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="bg-[#EBD3F8] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[950px] bg-white shadow-[0_4px_15px_-3px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Banner */}
        <motion.div
          className="md:w-1/2 w-full md:aspect-[7/10] h-64 md:h-auto relative"
          variants={bannerVariants}
          initial="hidden"
          animate="show"
        >
          <img src={Image} alt="signup" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E073F]/80 via-[#2E073F]/60 to-transparent items-end p-6 md:block hidden">
            <h1 className="text-white text-2xl font-semibold">Welcome!</h1>
            <p className="text-[#EBD3F8] text-[15px] font-medium mt-3 leading-relaxed">
              Join our campus as a student and explore clubs & events.
            </p>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          className="md:w-1/2 w-full px-8 lg:px-20 py-8 flex items-center bg-[#ffffff]"
          variants={formVariants}
          initial="hidden"
          animate="show"
        >
          <form onSubmit={handleSubmit} className="w-full">
            <h3 className="text-4xl font-bold text-[#2E073F] mb-12 text-center md:text-left">
              Student Signup
            </h3>

            {error && (
              <p className="text-red-500 text-center text-sm mb-3">{error}</p>
            )}

            <div className="space-y-6">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none transition-colors"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none transition-colors"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none transition-colors"
              />
              <input
                name="srn"
                type="text"
                placeholder="SRN : SRNXXX"
                value={formData.srn}
                onChange={handleChange}
                required
                className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none transition-colors"
              />
            </div>

            <div className="mt-12">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full shadow-xl py-2 px-4 text-[15px] font-medium tracking-wide rounded-md cursor-pointer text-white bg-[#7A1CAC] hover:bg-[#AD49E1] focus:outline-none transition-all"
              >
                Register
              </motion.button>
              <p className="text-slate-600 text-sm text-center mt-6">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-[#7A1CAC] font-medium hover:underline ml-1 whitespace-nowrap"
                >
                  Login here
                </a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
