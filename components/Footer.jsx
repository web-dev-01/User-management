// components/Footer.jsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme !== null) {
      setIsNightMode(JSON.parse(storedTheme));
    } else {
      setIsNightMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    const handleDarkModeChange = (event) => {
      setIsNightMode(event.detail.isDark);
    };

    window.addEventListener('darkModeChange', handleDarkModeChange);
    return () => window.removeEventListener('darkModeChange', handleDarkModeChange);
  }, []);

  const footerLinks = [
    {
      title: 'Products',
      items: [
        { name: 'Semiconductors', href: '/products/semiconductors' },
        { name: 'Integrated Circuits', href: '/products/ic' },
        { name: 'Microprocessors', href: '/products/microprocessors' },
        { name: 'Memory Chips', href: '/products/memory' },
      ],
    },
    {
      title: 'Resources',
      items: [
        { name: 'Documentation', href: '/resources/docs' },
        { name: 'Datasheets', href: '/resources/datasheets' },
        { name: 'Application Notes', href: '/resources/app-notes' },
        { name: 'White Papers', href: '/resources/white-papers' },
      ],
    },
    {
      title: 'Company',
      items: [
        { name: 'About Us', href: '/company/about' },
        { name: 'Leadership', href: '/company/leadership' },
        { name: 'Careers', href: '/company/careers' },
        { name: 'News', href: '/company/news' },
      ],
    },
    {
      title: 'Support',
      items: [
        { name: 'Contact', href: '/support' },
        { name: 'FAQ', href: '/support/faq' },
        { name: 'Pricing', href: '/pricing' },
      ],
    },
  ];

  return (
    <footer className={`bg-[#1A3C34] dark:bg-[#1A3C34] text-white py-8 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Champion Semiconductor LLP</h3>
          <p className="text-sm text-gray-300">
            Innovating semiconductor and geolocation solutions for a connected world.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-gray-300 hover:text-[#00ED64] transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="text-gray-300 hover:text-[#00ED64] transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3.007a9.94 9.94 0 01-2.83.775 4.947 4.947 0 002.17-2.728 9.858 9.858 0 01-3.14 1.2 4.95 4.95 0 00-8.42 4.51A14.005 14.005 0 011.66 2.55a4.947 4.947 0 001.535 6.59 4.92 4.92 0 01-2.24-.62v.06a4.953 4.953 0 003.95 4.85 4.95 4.95 0 01-2.24.085 4.954 4.954 0 004.61 3.44A9.88 9.88 0 010 19.54a13.957 13.957 0 007.55 2.21c9.06 0 14.01-7.5 14.01-14.01 0-.21 0-.43-.015-.64A9.983 9.983 0 0023 3.007z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" className="text-gray-300 hover:text-[#00ED64] transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.026-3.06-1.866-3.06-1.867 0-2.154 1.455-2.154 2.964v5.7h-3v-11h2.828v1.528h.04c.39-.74 1.344-1.522 2.766-1.522 2.954 0 3.508 1.943 3.508 4.472v6.522z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-200">{section.title}</h4>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-[#00ED64] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact and Newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-200">Contact Us</h4>
          <p className="text-sm text-gray-400">Email: support@championsemi.com</p>
          <p className="text-sm text-gray-400">Phone: +1-800-555-1234</p>
          <div>
            <h4 className="text-sm font-semibold text-gray-200">Newsletter</h4>
            <form className="mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-md text-[#1A3C34] focus:outline-none focus:ring-2 focus:ring-[#00ED64]"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-[#00ED64] text-[#1A3C34] font-semibold py-2 rounded-md hover:bg-[#00CC55] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Champion Semiconductor LLP. All rights reserved.
      </div>
    </footer>
  );
}