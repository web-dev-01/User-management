'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useMemo } from 'react';

export default function Navbar() {
  const [isNightMode, setIsNightMode] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // Configuration for navigation items
  const dropdownItems = useMemo(() => [
    {
      name: 'Products',
      href: '/products',
      hasDropdown: true,
      items: [
        { name: 'Semiconductors', href: '/products/semiconductors', description: 'High-performance semiconductor solutions' },
        { name: 'Integrated Circuits', href: '/products/ic', description: 'Custom IC design and manufacturing' },
        { name: 'Microprocessors', href: '/products/microprocessors', description: 'Advanced processing units' },
        { name: 'Memory Chips', href: '/products/memory', description: 'Reliable memory solutions' },
      ]
    },
    {
      name: 'Resources',
      href: '/resources',
      hasDropdown: true,
      items: [
        { name: 'Documentation', href: '/resources/docs', description: 'Technical documentation' },
        { name: 'Datasheets', href: '/resources/datasheets', description: 'Product specifications' },
        { name: 'Application Notes', href: '/resources/app-notes', description: 'Implementation guides' },
        { name: 'White Papers', href: '/resources/white-papers', description: 'Industry insights' },
      ]
    },
    {
      name: 'Solutions',
      href: '/solutions',
      hasDropdown: true,
      items: [
        { name: 'Automotive', href: '/solutions/automotive', description: 'Vehicle electronics' },
        { name: 'Industrial', href: '/solutions/industrial', description: 'Industrial automation' },
        { name: 'Consumer Electronics', href: '/solutions/consumer', description: 'Consumer devices' },
        { name: 'IoT', href: '/solutions/iot', description: 'Internet of Things' },
      ]
    },
    {
      name: 'Company',
      href: '/company',
      hasDropdown: true,
      items: [
        { name: 'About Us', href: '/company/about', description: 'Our story and mission' },
        { name: 'Leadership', href: '/company/leadership', description: 'Executive team' },
        { name: 'Careers', href: '/company/careers', description: 'Join our team' },
        { name: 'News', href: '/company/news', description: 'Latest updates' },
      ]
    },
    {
      name: 'Pricing',
      href: '/pricing',
      hasDropdown: false
    }
  ], []);

  // Initialize application state
  useEffect(() => {
    const initializeApp = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        const storedTheme = localStorage.getItem('darkMode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDarkMode = storedTheme !== null ? JSON.parse(storedTheme) : systemPrefersDark;
        setIsNightMode(isDarkMode);
        applyThemeToDocument(isDarkMode);
      } catch (error) {
        console.error('Failed to initialize application state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Apply theme styling to document
  const applyThemeToDocument = useCallback((isDark) => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    if (isDark) {
      htmlElement.classList.add('dark');
      bodyElement.classList.add('dark');
      bodyElement.style.backgroundColor = '#0f172a';
      bodyElement.style.color = '#f1f5f9';
    } else {
      htmlElement.classList.remove('dark');
      bodyElement.classList.remove('dark');
      bodyElement.style.backgroundColor = '#ffffff';
      bodyElement.style.color = '#1e293b';
    }
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDarkMode: isDark } }));
  }, []);

  // Persist theme changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('darkMode', JSON.stringify(isNightMode));
      applyThemeToDocument(isNightMode);
    }
  }, [isNightMode, isLoading, applyThemeToDocument]);

  // Handle user logout
  const handleLogout = useCallback(() => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      setShowLogoutPopup(false);
      window.location.href = '/signin';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  // Toggle theme mode
  const toggleTheme = useCallback(() => {
    setIsNightMode(prevMode => !prevMode);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
  }, []);

  // Handle dropdown interactions
  const handleDropdownToggle = useCallback((itemName) => {
    setActiveDropdown(prev => prev === itemName ? null : itemName);
  }, []);

  // Close mobile menu and dropdowns
  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenus();
        setShowLogoutPopup(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeMenus]);

  // Theme-based styling classes
  const themeClasses = useMemo(() => ({
    navbar: isNightMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200',
    navbarHover: isNightMode ? 'hover:bg-gray-800 hover:text-emerald-400' : 'hover:bg-gray-50 hover:text-emerald-600',
    dropdown: isNightMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    dropdownHover: isNightMode ? 'hover:bg-gray-700 hover:text-emerald-400' : 'hover:bg-gray-50 hover:text-emerald-600',
    mobileMenu: isNightMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
    button: isNightMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
    themeToggle: isNightMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200',
    atlasHeader: isNightMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
  }), [isNightMode]);

  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
            </div>
            <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className={`sticky top-0 z-50 shadow-sm border-b ${themeClasses.atlasHeader}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-200">
              <Image
                src="/logo.png"
                alt="Champion Semiconductors Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-lg font-bold text-emerald-600">Champion Semiconductors</span>
            </Link>
            <span className="text-sm">rahul's Org - 2025-07-08</span>
            <span className="text-sm">Project 0 ▾</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className={`p-2 rounded ${themeClasses.button}`} aria-label="Help">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className={`p-2 rounded ${themeClasses.button}`} aria-label="Billing">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className={`p-2 rounded ${themeClasses.button}`} aria-label="Notifications">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            {user && (
              <button
                onClick={() => setShowLogoutPopup(true)}
                className={`p-2 rounded ${themeClasses.button} flex items-center`}
                aria-label="User Profile"
              >
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>
            )}
            {!user && (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/signin" className={`px-3 py-2 rounded-lg text-sm font-medium ${themeClasses.navbarHover}`}>
                  Sign In
                </Link>
                <Link href="/get-started">
                  <button className="bg-emerald-600 text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
                    Get Started
                  </button>
                </Link>
              </div>
            )}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-200 ${themeClasses.themeToggle}`}
              aria-label={isNightMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isNightMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t ${themeClasses.mobileMenu}`}>
            {dropdownItems.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`flex-1 px-3 py-2 rounded-md text-base font-medium transition-colors ${themeClasses.navbarHover}`}
                    onClick={closeMenus}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`p-2 rounded-md transition-colors ${themeClasses.button}`}
                      aria-label={`Toggle ${item.name} submenu`}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="ml-4 space-y-1">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${themeClasses.dropdownHover}`}
                        onClick={closeMenus}
                      >
                        <div className="font-medium">{subItem.name}</div>
                        {subItem.description && (
                          <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className={`pt-4 mt-4 border-t ${isNightMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <Link
                href="/support"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${themeClasses.navbarHover}`}
                onClick={closeMenus}
              >
                Support
              </Link>
              {!user ? (
                <div className="space-y-2 px-3 py-2">
                  <Link
                    href="/signin"
                    className={`block w-full text-center py-2 rounded-md text-base font-medium transition-colors border ${
                      isNightMode ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={closeMenus}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/get-started"
                    className="block w-full text-center bg-emerald-600 text-white py-2 rounded-md text-base font-medium hover:bg-emerald-700 transition-colors"
                    onClick={closeMenus}
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-base font-medium">
                      {user.name.split(' ')[0]}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowLogoutPopup(true)}
                    className="block text-red-600 hover:text-red-700 text-base font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 ${themeClasses.atlasHeader}`}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Confirm Logout</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Are you sure you want to sign out?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}