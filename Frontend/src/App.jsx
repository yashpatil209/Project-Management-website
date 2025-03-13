import React, { useState } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Projects from "./Dashboard/Pages/Projects";
import Tasks from "./Dashboard/Pages/Tasks";
import Home from "./Pages/Home/HomePage";
import LoginRegister from "./Pages/LoginRegister/LoginRegister";
import Logout from "./Pages/LoginRegister/Logout";
import NotFound from "./Pages/NotFound";
import Sidebar from "./Dashboard/Components/Common/Sidebar";
import Navbar from "./Dashboard/Components/Common/Navbar";
import DragAndDrop from "./Dashboard/Components/TaskPage/DragDrop";
import MyTasks from "./Dashboard/Pages/MyTasks";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="pt-16 lg:pl-64">
        <div className="flex gap-4 overflow-x-auto pb-4 mx-4">{children}</div>
      </main>
    </div>
  );
}

const App = () => {
  return (
    <Routes>
      {/* Public Routes (No Sidebar, No Navbar) */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/register" element={<LoginRegister />} />
      <Route path="/logout" element={<Logout />} />

      {/* Dashboard Routes (With Sidebar & Navbar) */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Projects />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/task/:projectId"
        element={<DashboardLayout><Tasks/></DashboardLayout>}
      />
      <Route
        path="/dashboard/myprojects"
        element={<DashboardLayout><MyTasks/></DashboardLayout>}
      />
      <Route
        path="/dashboard/mytasks/:projectId"
        element={<DashboardLayout><DragAndDrop/></DashboardLayout>}
      />

      {/* Catch-all route for 404 pages (optional) */}
      <Route
        path="*"
        element={
          <h1 className="text-center text-red-500 text-2xl">
            404 - Page Not Found
          </h1>
        }
      />
    </Routes>
  );
};

export default App;
