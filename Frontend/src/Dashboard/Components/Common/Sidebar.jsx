import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  Home,
  User,
  ClipboardList,
  LogOut,
  Activity,
  IndianRupee,
  FolderOpen ,
  ListTodo 
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const menuItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      link: "/",
    },
    {
      icon: <FolderOpen  className="w-5 h-5" />,
      label: "My Projects",
      link: "/dashboard",
    },
    {
      icon: <ListTodo  className="w-5 h-5" />,
      label: "Your Tasks",
      link: "/dashboard/myprojects",
    },
    {
      icon: <ClipboardList className="w-5 h-5" />,
      label: "Report",
      link: "/dashboard/patient/report",
    },
    {
      icon: <IndianRupee className="w-5 h-5" />,
      label: "Bill",
      link: "/dashboard/patient/billing",
    },
  ];

  const handleCollapse = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      onClose();
    }
  };

  return (
    <aside
      className={`fixed left-0 top-16 z-20 h-[calc(100vh-4rem)] w-60 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 
        ${collapsed ? 'w-16' : ''}
        ${!isOpen ? '-translate-x-full lg:translate-x-0' : ''}`}
    >
      <div className="flex h-full flex-col">
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-colors duration-200 gap-2
                  ${
                    item.link == path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }
                `}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
