'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    if (!token) {
      setMessage('Invalid or missing token.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setIsSubmitting(false);
    setMessage(data.message);

    if (data.success) {
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A3C34] px-4">
      <div className="bg-[#1E2A32] p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4 text-center">Reset Password</h2>

        {message && <p className="text-center text-sm text-red-400 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#00ED64] text-[#1A3C34] py-2 rounded-lg font-semibold hover:bg-[#00CC55]"
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
