'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AssignRoleCard({ isDarkMode, themeClasses }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleAssignRole = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/assign-role`,
        { email, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMessage('Role assigned successfully ✅');
      } else {
        setMessage('Failed to assign role ❌');
      }
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong ❌');
    }
  };

  return (
    <div className={`p-6 rounded-xl ${themeClasses.card}`}>
      <h2 className="text-xl font-semibold mb-4">Assign Role to User</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">User Email</label>
          <input
            type="email"
            placeholder="Enter user's email"
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Select Role</label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-emerald-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Select Role --</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>
        </div>

        <button
          onClick={handleAssignRole}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Assign Role
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </div>
  );
}
