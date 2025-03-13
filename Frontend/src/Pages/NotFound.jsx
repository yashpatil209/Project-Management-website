import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {/* Floating Astronaut Animation */}
      <motion.div
        className="relative w-48 h-48"
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
      >
        <img src="https://cdn-icons-png.flaticon.com/512/2917/2917242.png" alt="Astronaut" />
      </motion.div>

      {/* Title */}
      <h1 className="text-6xl font-bold mt-4">404</h1>
      <p className="text-lg text-gray-300 mt-2">Oops! You're lost.</p>

      {/* Button to Go Home */}
      <Button
        color="blue"
        className="mt-6 flex items-center"
        onClick={() => (window.location.href = "/")}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Take Me Home
      </Button>
    </div>
  );
}
