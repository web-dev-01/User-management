'use client';
import { useState } from 'react';
import { ChevronDown, Moon, Sun } from 'lucide-react';

export default function TopNavbar({
  user,
  isDarkMode,
  toggleProfile,
  toggleDarkMode,
  isProfileOpen,
  handleLogout
}) {
  const themeClasses = {
    navbar: isDarkMode ? 'bg-[#1E2A32] border-gray-700' : 'bg-white border-gray-200',
    text: isDarkMode ? 'text-white' : 'text-[#1A3C34]',
    input: isDarkMode ? 'bg-[#2D3E50] text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <nav className={`flex-shrink-0 ${themeClasses.navbar} border-b shadow-sm px-4 py-3`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 ${isDarkMode ? 'bg-teal-600' : 'bg-green-500'} rounded flex items-center justify-center`}>
              <span className="text-white text-sm font-bold">🌐</span>
            </div>
            <span className={isDarkMode ? 'text-teal-400' : 'text-green-600'} style={{ fontWeight: 900, fontSize: '5px' }}>
              Atlas
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} style={{ fontSize: '13px' }}>
              {user?.identifier || 'Guest'}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <input
            type="text"
            placeholder="Search..."
            className={`${themeClasses.input} px-2 py-1 text-sm rounded border`}
          />
          <button className="text-sm hover:text-[#00ED64]">Access Manager</button>
          <button className="text-sm hover:text-[#00ED64]">Billing</button>
          <button className="text-sm hover:text-[#00ED64]">All Clusters</button>
          <button className="text-sm hover:text-[#00ED64]">Get Help</button>

          {/* Profile button */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className={`w-8 h-8 ${isDarkMode ? 'bg-teal-600' : 'bg-green-500'} rounded-full flex items-center justify-center text-white`}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2D3E50] border rounded-lg shadow-lg z-10">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium">{user?.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-400">{user?.email || 'No email'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
