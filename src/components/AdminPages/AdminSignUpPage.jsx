import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ClubAdminRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    srn: "",
    role: "clubadmin",
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
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Admin registered successfully ✅");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="bg-[#EBD3F8] min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[450px] bg-white shadow-[0_4px_15px_-3px_rgba(0,0,0,0.3)] rounded-2xl p-8"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-3xl font-bold text-[#2E073F] text-center mb-8">
          Club Admin Register
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none transition-colors"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none transition-colors"
          />
          <input
            type="text"
            name="srn"
            placeholder="SRN"
            value={formData.srn}
            onChange={handleChange}
            required
            className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none transition-colors"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none transition-colors"
          >
            <option value="student">Student</option>
            <option value="clubadmin">Club Admin</option>
          </select>

          <button
            type="submit"
            className="w-full shadow-xl py-2 px-4 text-[15px] font-medium tracking-wide rounded-md cursor-pointer text-white bg-[#7A1CAC] hover:bg-[#AD49E1] focus:outline-none transition-all"
          >
            Register
          </button>

          <p className="text-slate-600 text-sm text-center mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#7A1CAC] font-medium hover:underline ml-1 whitespace-nowrap"
            >
              Login here
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
