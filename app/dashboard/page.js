'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Dashboardafterlogin/Navbar';
import Sidebar from '@/components/Dashboardafterlogin/Sidebar';
import Footer from '@/components/Dashboardafterlogin/Footer';

import ClusterCard from '@/components/cards/ClusterCard';
import ToolbarCard from '@/components/cards/ToolbarCard';
import ApplicationDevCard from '@/components/cards/ApplicationDevCard';
import DataServicesCard from '@/components/cards/DataServicesCard';

import { X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/overview', label: 'Overview', active: true, category: null },
  { href: '/database/clusters', label: 'Clusters', active: false, category: 'DATABASE' },
  { href: '/services/atlas-search', label: 'Atlas Search', active: false, category: 'SERVICES' },
  { href: '/services/stream-processing', label: 'Stream Processing', active: false, category: 'SERVICES' },
  { href: '/services/triggers', label: 'Triggers', active: false, category: 'SERVICES' },
  { href: '/services/migration', label: 'Migration', active: false, category: 'SERVICES' },
  { href: '/services/data-federation', label: 'Data Federation', active: false, category: 'SERVICES' },
  { href: '/security', label: 'Security', active: false, category: 'SECURITY' },
  { href: '/quickstart', label: 'Quickstart', active: false, category: 'QUICKSTART' },
  { href: '/backup', label: 'Backup', active: false, category: 'BACKUP' },
  { href: '/database-access', label: 'Database Access', active: false, category: 'DATABASE_ACCESS' },
  { href: '/network-access', label: 'Network Access', active: false, category: 'NETWORK_ACCESS' },
  { href: '/advanced', label: 'Advanced', active: false, category: 'ADVANCED' },
  { href: '/new-on-atlas', label: 'New On Atlas', active: false, category: 'NEW_ON_ATLAS', badge: '6' },
  { href: '/goto', label: 'Goto', active: false, category: 'GOTO' },
];

export default function UserDashboardPage() {
  const [user, setUser] = useState({ name: 'rahul kumar', identifier: 'rahul kumar...', email: 'rahul@example.com' });
  const [showNotification, setShowNotification] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    router.push('/auth');
  }, [router]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        handleLogout();
      }
    } else {
      router.push('/auth');
    }
  }, [router, handleLogout]);

  const themeClasses = {
    background: isDarkMode ? 'bg-[#1A3C34]' : 'bg-[#F5F7FA]',
    text: isDarkMode ? 'text-white' : 'text-[#1A3C34]',
    card: isDarkMode ? 'bg-[#2D3E50] border-gray-700' : 'bg-white shadow-md border border-gray-200',
    navbar: isDarkMode ? 'bg-[#1E2A32] border-gray-700' : 'bg-white border-gray-200',
    notification: isDarkMode ? 'bg-yellow-900/50 text-yellow-200' : 'bg-yellow-100 text-yellow-800',
    link: isDarkMode ? 'text-gray-300 hover:text-[#00ED64]' : 'text-gray-700 hover:text-[#00ED64]',
    sidebar: isDarkMode ? 'bg-[#1E2A32] border-r border-gray-700' : 'bg-[#F0F2F5] border-r border-gray-200',
    sidebarItem: isDarkMode ? 'text-gray-300 hover:bg-[#2D3E50] hover:text-[#00ED64]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#00ED64]',
    activeItem: isDarkMode ? 'bg-[#2D3E50] text-[#00ED64] border-l-4 border-teal-500' : 'bg-[#E6F0FA] text-[#00ED64] border-l-4 border-teal-500',
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.background} ${themeClasses.text}`}>
      <Navbar user={user} handleLogout={handleLogout} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} themeClasses={themeClasses} />
      <div className="flex flex-1">
        <Sidebar themeClasses={themeClasses} navLinks={NAV_LINKS} />
        <main className="flex-1 p-6 pb-24">
          <div className="max-w-7xl mx-auto">
            {/* Notification */}
            {showNotification && (
              <div className={`${themeClasses.notification} border ${isDarkMode ? 'border-yellow-800' : 'border-yellow-200'} rounded-lg p-4 mb-6 flex items-start justify-between`}>
                <div className="flex">
                  <div className={`w-5 h-5 ${isDarkMode ? 'bg-yellow-800' : 'bg-yellow-400'} rounded-full flex items-center justify-center mr-3 mt-0.5`}>
                    <span className="text-white text-xs">!</span>
                  </div>
                  <div>
                    <p className={isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}>
                      Add an Atlas Security Contact in <button className="underline font-medium">Organization Settings</button>
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowNotification(false)} className={isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-800'}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ClusterCard isDarkMode={isDarkMode} themeClasses={themeClasses} />
              </div>
              <ToolbarCard isDarkMode={isDarkMode} themeClasses={themeClasses} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <ApplicationDevCard isDarkMode={isDarkMode} themeClasses={themeClasses} />
              <DataServicesCard isDarkMode={isDarkMode} themeClasses={themeClasses} />
            </div>
          </div>
        </main>
      </div>
      <Footer themeClasses={themeClasses} />
    </div>
  );
}
