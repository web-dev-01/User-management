// components/Layout.jsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize dark mode from localStorage or system preference
    const storedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme !== null) {
      setIsDarkMode(JSON.parse(storedTheme));
    } else {
      setIsDarkMode(prefersDark);
    }

    // Listen for dark mode changes from Navbar
    const handleDarkModeChange = (event) => {
      setIsDarkMode(event.detail.isDark);
    };

    window.addEventListener('darkModeChange', handleDarkModeChange);

    return () => {
      window.removeEventListener('darkModeChange', handleDarkModeChange);
    };
  }, []);

  // Apply dark mode styles to the entire layout
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    if (isDarkMode) {
      html.classList.add('dark');
      body.classList.add('dark');
      body.style.backgroundColor = '#0f172a';
      body.style.color = '#f1f5f9';
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#1e293b';
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-white text-slate-900'
    }`}>
      <Navbar />
      <main className={`transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'
      }`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}