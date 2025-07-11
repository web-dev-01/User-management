'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import Navbar from '@/components/Dashboardafterlogin/Navbar';
import Footer from '@/components/Dashboardafterlogin/Footer';
import Sidebar from '@/components/Dashboardafterlogin/Sidebar';

// Admin imports (included as per your request, not used in JSX)
import AdminStatsCard from '@/components/cards/AdminDashboardCards/AdminStatsCard';
import AssignRoleCard from '@/components/cards/AdminDashboardCards/AssignRoleCard';
import UsersTable from '@/components/cards/AdminDashboardCards/UsersTable';
import ViewUserModal from '@/components/cards/AdminDashboardCards/ViewUserModal';
import EditUserModal from '@/components/cards/AdminDashboardCards/EditUserModal';
import DeleteUserModal from '@/components/cards/AdminDashboardCards/DeleteUserModal';

export default function UserDashboardPage() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    router.push('/auth');
  }, [router]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        handleLogout();
      }
    } else {
      router.push('/auth');
    }
    setLoading(false);
  }, [router, handleLogout]);

  const themeClasses = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    card: isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md border border-gray-200',
    navbar: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${themeClasses.background} ${themeClasses.text}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar
          user={user}
          handleLogout={handleLogout}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          themeClasses={themeClasses}
        />

        <main className="flex-1 p-6">
          <div className={`max-w-4xl mx-auto rounded-xl p-6 ${themeClasses.card} transition-all duration-300`}>
            <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'User'} 👋</h1>
            <p className="text-sm mb-2"><strong>Email:</strong> {user?.email}</p>
            <p className="text-sm mb-2"><strong>Role:</strong> {user?.role || 'Employee'}</p>
            <p className="text-sm mb-2"><strong>Status:</strong> Verified ✅</p>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              This is your personal dashboard. More features like editing your profile or uploading documents can be added later.
            </p>
          </div>
        </main>

        <Footer themeClasses={themeClasses} />
      </div>
    </div>
  );
}
