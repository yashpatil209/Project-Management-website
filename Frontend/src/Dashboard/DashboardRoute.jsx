import React, {useState} from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Common/Navbar";
import Sidebar  from "./Components/Common/Sidebar";
import Projects from "./Pages/Projects";
import Tasks from "./Pages/Tasks";

const DashboardRoutes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (

    <div className="min-h-screen bg-gray-100">
    <Navbar onMenuClick={toggleSidebar} />
    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

    <main className="pt-16 lg:pl-64">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Project Board</h1>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
        <div className="mx-4">
          <Routes>
            <Route path="/dashboard" element={<Projects />} />
            <Route path="/dashboard/task/:Id" element={<Tasks />} />
          </Routes>
        </div>
        </div>
      </div>
    </main>
  </div>

  );
};

export default DashboardRoutes;