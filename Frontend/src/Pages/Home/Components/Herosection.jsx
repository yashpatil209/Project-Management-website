import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  BarChart2,
  Calendar,
  Layout,
  Play,
  ChevronRight,
  Star,
} from "lucide-react";
import NavbarComp from "../../../Components/Navbar";

const HeroSection = () => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Task Management",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      color: "from-blue-400/20 to-cyan-400/20",
    },
    {
      title: "Team Collaboration",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      color: "from-indigo-400/20 to-blue-400/20",
    },
    {
      title: "Project Analytics",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2015&q=80",
      color: "from-violet-400/20 to-indigo-400/20",
    },
  ];
  return (
    <>
    <section className="h-screen bg-navy-900 overflow-hidden">
    <NavbarComp />
      <div className="absolute z-10 inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f6,transparent_40%)]"></div>
      <div className="absolute z-10 inset-0 bg-[radial-gradient(circle_at_bottom_left,#6366f1,transparent_40%)]"></div>

      <div className="max-w-7xl mx-auto relative z-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8  overflow-hidden">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="relative">
              <span className="relative z-10 text-blue-400"> Workflow</span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-blue-900"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 Q50,12 100,0"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Empower your team with our intelligent project management platform.
            Streamline tasks, boost collaboration, and achieve more together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto bg-blue-500 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25">
              <span>Start Free Trial</span>
              <ChevronRight className="h-5 w-5" />
            </button>
            <button className="w-full sm:w-auto bg-navy-800 text-gray-300 px-8 py-4 rounded-full hover:bg-navy-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg border border-white/10">
              <Play className="h-5 w-5 text-blue-400" />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                  activeCard === index
                    ? "scale-105 shadow-xl"
                    : "scale-95 shadow-md opacity-70"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color}`}
                ></div>
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-navy-900/50">
                  <h3 className="text-xl font-bold text-white">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="mt-16 flex items-center justify-center space-x-8">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-navy-800"
                  src={`https://i.pravatar.cc/150?img=${i + 1}`}
                  alt="User avatar"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-300">
                Trusted by 10,000+ teams worldwide
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroSection;
