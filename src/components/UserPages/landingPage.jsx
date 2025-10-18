import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  const testimonials = [
    {
      name: "Aarav S., Student",
      text: "Joining the clubs here has completely transformed my college experience! I’ve met amazing people and discovered passions I didn’t know I had.",
    },
    {
      name: "Priya K., Club Admin",
      text: "Managing events as a Club Admin has never been easier. The platform is super intuitive, and it keeps everything organized seamlessly.",
    },
    {
      name: "Rohan M., Student",
      text: "I love checking the announcements and updates! Everything is just a click away, and I never miss out on interesting events.",
    },
  ];

  // 🌟 Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="overflow-hidden bg-[#2E073F]">
      {/* 🌐 Navbar */}
      <motion.header
        className="flex shadow-md py-4 px-4 sm:px-10 bg-[#2E073F] text-white min-h-[70px] tracking-wide relative z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          <h1 className="font-bold text-2xl tracking-wider text-[#EBD3F8]">
            CAMPUS CLUB
          </h1>

          <div
            className={`lg:block max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-full max-lg:w-1/2 max-lg:min-w-[300px] max-lg:bg-[#2E073F] max-lg:p-6 max-lg:shadow-md z-50 transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-[#EBD3F8] w-9 h-9 flex items-center justify-center"
            >
              ✕
            </button>
            <ul className="lg:flex lg:justify-center gap-x-4 max-lg:space-y-6 max-lg:mt-16">
              <li className="lg:hidden"> <a href="/login" className="hover:text-[#AD49E1] block font-medium text-[15px]" > Login </a> </li> 
              <li className="lg:hidden"> <a href="/signup" className="hover:text-[#AD49E1] block font-medium text-[15px]" > Signup </a> </li>
              
              <li>
                <a href="/user/home" className="hover:text-[#AD49E1] text-[#EBD3F8] font-medium text-[15px]">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#AD49E1] text-[#EBD3F8] font-medium text-[15px]">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#AD49E1] text-[#EBD3F8] font-medium text-[15px]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="flex max-lg:ml-auto space-x-4">
            <div className="flex space-x-4 max-lg:hidden">
              <button
                className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-[#EBD3F8] border border-[#EBD3F8] hover:bg-[#7A1CAC] transition-all"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white bg-[#AD49E1] hover:bg-[#7A1CAC] transition-all"
                onClick={handleSignup}
              >
                Sign up
              </button>
            </div>
            <button onClick={() => setIsOpen(true)} className="lg:hidden cursor-pointer">
              ☰
            </button>
          </div>
        </div>
      </motion.header>

      {/* 🦸 Hero Section */}
      <motion.section
        id="hero"
        className="h-[90vh] bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: "url('https://readymadeui.com/team-image.webp')",
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-[#2E073F]/70"></div>
        <motion.div
          className="relative text-center text-white"
          initial="hidden"
          whileInView="show"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeUp}
            className="lg:text-5xl text-3xl font-bold mb-4 text-[#EBD3F8]"
          >
            Welcome to Our Club
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg max-w-lg mx-auto">
            Join our network and explore amazing opportunities.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* 📖 About Section */}
      <section id="about" className="py-20 px-6 bg-[#EBD3F8] text-[#2E073F]">
        <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p className="max-w-3xl mx-auto text-center text-lg">
            Our club connects students and professionals through events,
            workshops, and mentorship, helping members grow and thrive.
          </p>
        </motion.div>
      </section>

      {/* 💬 Testimonials Section */}
      <section className="bg-[#EBD3F8] py-16 px-6">
        <motion.h2
          className="text-3xl font-bold text-[#2E073F] text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          What People Say
        </motion.h2>

        <motion.div
          className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -10, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
              className="bg-[#AD49E1] p-6 rounded-2xl shadow-lg flex flex-col justify-between border-2 border-[#7A1CAC]"
            >
              <p className="text-[#EBD3F8] mb-4">"{t.text}"</p>
              <p className="font-semibold text-[#2E073F] text-right">— {t.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 📨 Message Form */}
      <section id="message" className="py-20 px-6 bg-white">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-[#2E073F]"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          Send a Message to Club Admin
        </motion.h2>
        <motion.form
          className="space-y-6 max-w-md mx-auto p-6 bg-[#EBD3F8] shadow-lg rounded-lg"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {["Name", "Email", "Phone No.", "Department"].map((label) => (
            <motion.div className="flex items-center" key={label} variants={fadeUp}>
              <label className="text-[#2E073F] font-medium w-36 text-sm">{label}</label>
              <input
                type="text"
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="px-2 py-2 w-full border-b border-[#7A1CAC] bg-transparent outline-none text-sm"
              />
            </motion.div>
          ))}
          <motion.div className="flex items-start" variants={fadeUp}>
            <label className="text-[#2E073F] font-medium w-36 text-sm">Message</label>
            <textarea
              placeholder="Your message"
              className="px-2 py-2 w-full border-b border-[#7A1CAC] bg-transparent outline-none text-sm mt-1"
              rows="4"
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            className="mt-8 px-6 py-2 w-full bg-[#7A1CAC] hover:bg-[#AD49E1] text-white text-sm font-medium rounded-full cursor-pointer transition-all"
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </motion.form>
      </section>

      {/* 🦶 Footer */}
      <motion.footer
        className="bg-[#2E073F] text-[#EBD3F8] py-10 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p>© 2025 Campus Club. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
