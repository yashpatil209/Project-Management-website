import React from 'react';
import { Menu, Bell, Search, User, Layout } from 'lucide-react';

function Navbar({ onMenuClick }) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-30 border-b bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="ml-4 flex items-center lg:ml-0">
              <Layout className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold">ProjectHub</span>
            </div>
          </div>

          <div className="hidden flex-1 items-center justify-center px-6 lg:flex lg:max-w-2xl">
            <div className="w-full">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search projects..."
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-lg p-2 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
            <button className="flex items-center rounded-lg p-2 hover:bg-gray-100">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;