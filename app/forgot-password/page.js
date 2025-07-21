'use client';

import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A3C34] px-4 py-8">
      <div className="bg-[#1E2A32] p-6 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4 text-center">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full bg-[#00ED64] text-[#1A3C34] py-2.5 rounded-lg font-semibold hover:bg-[#00CC55] transition-colors duration-200"
          >
            Send Reset Link
          </button>
        </form>

        {message && <p className="text-center text-sm text-gray-300 mt-4">{message}</p>}
      </div>
    </div>
  );
}
