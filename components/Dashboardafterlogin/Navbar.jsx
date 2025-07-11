'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  MdHelp,
  MdSettings,
  MdNotifications,
  MdMoreHoriz,
  MdLogout,
  MdClose,
  MdSearch,
  MdApps,
  MdBookmark,
  MdStorage,
  MdCloud,
  MdSecurity,
  MdAnalytics,
  MdDashboard,
  MdCode,
  MdBuild,
  MdMenu,
  MdPerson,
} from 'react-icons/md';

export default function Navbar() {
  // State for user data, menu, and popup visibility
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showAppsPopup, setShowAppsPopup] = useState(false);

  // Effect to simulate user data loading on mount
  useEffect(() => {
    setMounted(true);
    setUser({
      name: 'rahul kumar',
      email: 'officialrahul211067@gmail.com',
      organization: 'My Organization'
    });
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    setUser(null);
    setShowProfilePopup(false);
    // Add navigation logic here, e.g., window.location.href = '/signin';
    console.log('Logged out');
  };

  // Handle Manage Account button click
  const handleManageAccount = () => {
    // Add navigation or modal logic here, e.g., window.location.href = '/account';
    console.log('Manage Account clicked');
  };

  // Handle Send Feedback button click
  const handleSendFeedback = () => {
    // Add navigation or modal logic here, e.g., window.location.href = '/feedback';
    console.log('Send Feedback clicked');
  };

  // Prevent rendering until mounted to avoid hydration issues
  if (!mounted) return null;

  return (
    <>
      {/* Main navigation bar - template remains unchanged */}
      <nav className="sticky top-0 z-50 w-full border-b bg-gray-50 border-gray-200">
        <div className="flex items-center justify-between px-2 py-2 w-full">
          {/* Left: Logo Section */}
          <div className="flex items-center ml-0">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Champion LLP Logo"
                    width={150}
                    height={122}
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-gray-800">
                  Champion LLP
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Navigation Icons - dark mode icon removed */}
          <div className="flex items-center space-x-0 mr-0">
            {/* Search Button */}
            <button className="p-1.5 rounded-md transition-colors hover:bg-gray-200 text-gray-600">
              <MdSearch className="w-4 h-4" />
            </button>

            {/* Apps Menu Button and Popup */}
            <div className="relative">
              <button
                onClick={() => setShowAppsPopup(!showAppsPopup)}
                className="p-1.5 rounded-md transition-colors hover:bg-gray-200 text-gray-600"
              >
                <MdApps className="w-4 h-4" />
              </button>
              {showAppsPopup && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Database Services
                  </div>
                  <Link href="/atlas" className="flex items-center px-3 py-2 text-sm hover:bg-gray-100">
                    <MdCloud className="w-4 h-4 mr-3 text-green-600" />
                    Atlas
                  </Link>
                  <Link href="/compass" className="flex items-center px-3 py-2 text-sm hover:bg-gray-100">
                    <MdDashboard className="w-4 h-4 mr-3 text-blue-600" />
                    Compass
                  </Link>
                  <Link href="/charts" className="flex items-center px-3 py-2 text-sm hover:bg-gray-100">
                    <MdAnalytics className="w-4 h-4 mr-3 text-purple-600" />
                    Charts
                  </Link>
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Developer Tools
                    </div>
                    <Link href="/stitch" className="flex items-center px-3 py-2 text-sm hover:bg-gray-100">
                      <MdCode className="w-4 h-4 mr-3 text-orange-600" />
                      Realm
                    </Link>
                    <Link href="/tools" className="flex items-center px-3 py-2 text-sm hover:bg-gray-100">
                      <MdBuild className="w-4 h-4 mr-3 text-gray-600" />
                      Tools
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Bookmarks Button */}
            <button className="p-1.5 rounded-md transition-colors hover:bg-gray-200 text-gray-600">
              <MdBookmark className="w-4 h-4" />
            </button>

            {/* Help Button */}
            <button className="p-1.5 rounded-md transition-colors hover:bg-gray-200 text-gray-600">
              <MdHelp className="w-4 h-4" />
            </button>

            {/* Security Button */}
            <button className="p-1.5 rounded-md transition-colors hover:bg-gray-200 text-gray-600">
              <MdSecurity className="w-4 h-4" />
            </button>

            {/* Settings Button */}
            <button className="p-1.5 rounded-md transition-colors hover:bg-gray-200 text-gray-600">
              <MdSettings className="w-4 h-4" />
            </button>

            {/* Notifications Button with Badge */}
            <button className="p-1.5 rounded-md transition-colors relative hover:bg-gray-200 text-gray-600">
              <MdNotifications className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center text-[10px]">
                3
              </span>
            </button>

            {/* User Profile Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfilePopup(!showProfilePopup)}
                  className="p-1 rounded-full transition-colors hover:bg-gray-200"
                >
                  <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
              </div>
            ) : (
              <>
                <Link href="/signin" className="text-sm font-medium hover:text-green-600 hidden sm:block">
                  Sign In
                </Link>
                <Link href="/try-free">
                  <button className="bg-green-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-green-700 transition-colors">
                    Try Free
                  </button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 rounded-md transition-colors hover:bg-gray-200 text-gray-600"
            >
              <MdMenu className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden border-t px-4 py-3 bg-white border-gray-200 text-gray-800">
            <Link href="/atlas" className="block py-2 text-sm font-medium hover:text-green-600">Atlas</Link>
            <Link href="/compass" className="block py-2 text-sm font-medium hover:text-green-600">Compass</Link>
            <Link href="/charts" className="block py-2 text-sm font-medium hover:text-green-600">Charts</Link>
            <Link href="/realm" className="block py-2 text-sm font-medium hover:text-green-600">Realm</Link>
            <Link href="/docs" className="block py-2 text-sm font-medium hover:text-green-600">Documentation</Link>
            <Link href="/support" className="block py-2 text-sm font-medium hover:text-green-600">Support</Link>
          </div>
        )}
      </nav>

      {/* MongoDB-Style Profile Popup Card */}
      {showProfilePopup && (
        <div className="fixed top-14 right-4 z-50">
          <div className="bg-gray-50 rounded-lg shadow-xl border border-gray-200 w-72 overflow-hidden">
            
            {/* Profile Header Section */}
            <div className="p-4 text-center bg-white">
              {/* User Avatar */}
              <div className="w-16 h-16 bg-gray-400 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-3">
                <MdPerson className="w-8 h-8" />
              </div>
              
              {/* User Information */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{user?.name.toLowerCase()}</h3>
              <p className="text-sm text-gray-600 mb-4">{user?.email}</p>
              
              {/* Manage Account Button */}
              <button
                onClick={handleManageAccount}
                className="w-full border border-gray-300 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Manage your MongoDB Account
              </button>
            </div>
            
            {/* Menu Items Section */}
            <div className="py-1">
              {/* Organizations */}
              <Link href="/organizations" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium">
                Organizations
              </Link>

              {/* All Clusters */}
              <Link href="/clusters" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium">
                All Clusters
              </Link>

              {/* Invitations */}
              <Link href="/invitations" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium">
                Invitations
              </Link>

              {/* Send Feedback */}
              <button
                onClick={handleSendFeedback}
                className="flex items-center px-4 py-2.5 text-sm text-blue-600 hover:bg-gray-100 transition-colors font-medium"
              >
                Send Feedback
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium text-left"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to Close Popups When Clicking Outside */}
      {(showProfilePopup || showAppsPopup) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowProfilePopup(false);
            setShowAppsPopup(false);
          }}
        />
      )}
    </>
  );
}