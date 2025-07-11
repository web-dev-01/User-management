'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Mail, Bot } from 'lucide-react';

export default function Footer() {
  return (
    <>
      {/* Footer with Sidebar Offset */}
      <footer className="ml-64 w-[calc(100%-16rem)] bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 shadow-lg border-t border-gray-200 z-40">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left: Company Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              Champion Semiconductor LLP
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              © 2025 All rights reserved.
            </p>
          </div>

          {/* Center: Nav Links */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs">
            <Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400">About</Link>
            <Link href="/products" className="hover:text-emerald-600 dark:hover:text-emerald-400">Products</Link>
            <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400">Contact</Link>
            <Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400">Privacy</Link>
          </div>

          {/* Right: Social Icons */}
          <div className="flex space-x-3">
            <a href="https://twitter.com" target="_blank" className="p-1 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900">
              <Twitter className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-emerald-600" />
            </a>
            <a href="https://linkedin.com" target="_blank" className="p-1 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900">
              <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-emerald-600" />
            </a>
            <a href="mailto:info@championsemiconductor.com" className="p-1 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900">
              <Mail className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-emerald-600" />
            </a>
          </div>
        </div>
      </footer>

      {/* Chatbot Floating Button (Right corner aligned to main content) */}
      <div className="fixed bottom-6 right-6 z-50 ml-64">
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          onClick={() => alert('Chatbot coming soon...')}
        >
          <Bot className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
