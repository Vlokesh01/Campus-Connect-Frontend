import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "../../assets/login-pic.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Banner Animation - fades in from left
const bannerVariants = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Form Animation - slides up with delay
const formVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
  toast.error(data.message || "Login failed");
  return;
} else {
  toast.success("Login successful 🎉");
}

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data._id);
      localStorage.setItem("name", data.name);
      localStorage.setItem("srn", data.srn);

      if (data.role === "clubadmin") navigate("/admin/home");
      else navigate("/user/home");
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="bg-[#EBD3F8] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[950px] bg-white shadow-[0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Banner */}
        <motion.div
          className="md:w-1/2 w-full md:aspect-[7/10] h-64 md:h-auto relative"
          variants={bannerVariants}
          initial="hidden"
          animate="show"
        >
          <img src={Image} alt="login" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E073F]/80 via-[#2E073F]/60 to-transparent items-end p-6 md:block hidden">
            <h1 className="text-white text-2xl font-semibold">Welcome Back</h1>
            <p className="text-[#EBD3F8] text-[15px] font-medium mt-3 leading-relaxed">
              Join our private network to explore clubs and events.
            </p>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          className="md:w-1/2 w-full px-8 lg:px-20 py-8 flex items-center bg-white"
          variants={formVariants}
          initial="hidden"
          animate="show"
        >
          <form onSubmit={handleLogin} className="w-full">
            <h3 className="text-4xl font-bold text-[#2E073F] mb-12 text-center md:text-left">
              Login
            </h3>

            {error && (
              <p className="text-red-500 text-center text-sm mb-3">{error}</p>
            )}

            <div className="space-y-6">
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none"
              />
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-sm border-b border-gray-300 focus:border-[#7A1CAC] px-2 py-3 outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#7A1CAC] focus:ring-[#7A1CAC] border-gray-300 rounded-sm"
                />
                <label
                  htmlFor="remember-me"
                  className="text-slate-600 ml-3 block text-sm"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="/forgot-password"
                  className="text-[#7A1CAC] font-medium text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2 px-4 text-[15px] font-medium tracking-wide rounded-md cursor-pointer text-white bg-[#7A1CAC] hover:bg-[#2E073F] focus:outline-none"
              >
                Login
              </button>
              <p className="text-slate-600 text-sm text-center mt-6">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-[#7A1CAC] font-medium hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
