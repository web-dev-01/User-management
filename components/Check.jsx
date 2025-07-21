'use client';

import { useState } from 'react';
import { HomeIcon, UsersIcon, UserIcon, CogIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

export default function Dashboard() {
  const [view, setView] = useState('table'); // Toggle between table and card view for admins
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle
  const isAdmin = true; // Set to false to simulate normal user (Rahul)

  // Sample user data
  const users = [
    { id: 1, name: 'John Doe', role: 'Admin', email: 'john@champion.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Employee', email: 'jane@champion.com', status: 'Active' },
    { id: 3, name: 'Rahul Sharma', role: 'Employee', email: 'rahul@champion.com', status: 'Active' },
    { id: 4, name: 'Mike Johnson', role: 'Employee', email: 'mike@champion.com', status: 'Inactive' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 w-64 bg-[#00471B] shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 z-50`}
      >
        <div className="p-4 border-b border-[#13AA52]">
          <h1 className="text-xl font-bold text-white">Champion Semiconductor</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {[
              { name: 'Dashboard', icon: HomeIcon },
              { name: 'Manage Users', icon: UsersIcon },
              { name: 'Profile', icon: UserIcon },
              { name: 'Settings', icon: CogIcon },
              { name: 'Logout', icon: ArrowRightOnRectangleIcon },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-gray-100 hover:bg-[#13AA52] hover:text-white"
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-800 ml-2">Dashboard</h2>
          </div>
          <button className="bg-[#13AA52] text-white px-4 py-2 rounded hover:bg-[#00471B]">
            Logout
          </button>
        </header>

        {/* Main Section */}
        <main className="p-6">
          {/* Welcome Message */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#00471B]">Welcome, Rahul!</h3>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {[
              { title: 'Total Users', value: users.length, color: 'bg-[#13AA52]' },
              { title: 'Admins', value: users.filter((u) => u.role === 'Admin').length, color: 'bg-[#00471B]' },
              { title: 'Employees', value: users.filter((u) => u.role === 'Employee').length, color: 'bg-[#2ECC71]' },
            ].map((stat) => (
              <div key={stat.title} className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-gray-600">{stat.title}</h4>
                <p className={`text-2xl font-bold ${stat.color} text-white p-2 rounded mt-2 text-center`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Manage Users Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-[#00471B]">
                {isAdmin ? 'Manage Users' : 'Your Profile'}
              </h4>
              {isAdmin && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setView('table')}
                    className={`px-4 py-2 rounded ${view === 'table' ? 'bg-[#13AA52] text-white' : 'bg-gray-200'}`}
                  >
                    Table View
                  </button>
                  <button
                    onClick={() => setView('card')}
                    className={`px-4 py-2 rounded ${view === 'card' ? 'bg-[#13AA52] text-white' : 'bg-gray-200'}`}
                  >
                    Card View
                  </button>
                </div>
              )}
            </div>

            {/* Table View (Admins only) */}
            {isAdmin && view === 'table' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3">Name</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.role}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              user.status === 'Active' ? 'bg-[#13AA52]' : 'bg-red-500'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button className="text-[#13AA52] hover:underline mr-2">Edit</button>
                          <button className="text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Card View (Admins or Normal Users) */}
            {(isAdmin ? view === 'card' : true) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(isAdmin ? users : users.filter((user) => user.name === 'Rahul Sharma')).map((user) => (
                  <div key={user.id} className="bg-gray-50 p-4 rounded-lg shadow">
                    <h5 className="text-lg font-semibold">{user.name}</h5>
                    <p className="text-gray-600">Role: {user.role}</p>
                    <p className="text-gray-600">Email: {user.email}</p>
                    <p className="text-gray-600">
                      Status: <span className={user.status === 'Active' ? 'text-[#13AA52]' : 'text-red-500'}>{user.status}</span>
                    </p>
                    {isAdmin && (
                      <div className="mt-2">
                        <button className="text-[#13AA52] hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}