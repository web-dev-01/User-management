'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // ✅ added

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    name: '',
    identifier: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegistering ? '/api/auth/signup' : '/api/auth/signin';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          identifier: form.identifier,
          password: form.password
        }),
      });

      const data = await res.json();
      alert(data.message);

      if (!res.ok || !data.success) return;

      if (isRegistering) {
        setIsRegistering(false);
        setForm({
          name: '',
          identifier: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      }

    } catch (err) {
      console.error("Auth error:", err);
      alert("Something went wrong.");
    }
  };

  const isPasswordStrong = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const isPasswordMatch = isRegistering ? form.password === form.confirmPassword : true;
  const isFormValid = isPasswordStrong(form.password) && isPasswordMatch && form.identifier && (isRegistering ? form.name : true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A3C34] px-4 py-8 sm:py-12">
      <div className="bg-[#1E2A32] p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-4 sm:mb-6">
          <span className="text-[#00ED64] font-bold text-xl sm:text-2xl">🌐 Champion Semiconductor LLP</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
          {isRegistering ? 'Create an Account' : 'Sign In'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email or Phone</label>
            <input
              type="text"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
              placeholder="Enter your email or phone"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
            {!isPasswordStrong(form.password) && form.password && (
              <p className="text-xs text-red-400 mt-1">
                Password must be 8+ characters, include uppercase, lowercase, number & special character.
              </p>
            )}
          </div>
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
                placeholder="Confirm your password"
                required
              />
              {!isPasswordMatch && form.confirmPassword && (
                <p className="text-xs text-red-400 mt-1">Passwords do not match.</p>
              )}
            </div>
          )}
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-[#00ED64] text-[#1A3C34] py-2.5 rounded-lg font-semibold hover:bg-[#00CC55] transition-colors duration-200"
          >
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {!isRegistering && (
          <button
            onClick={handleGoogleSignIn}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-[#00ED64] text-[#1A3C34] py-2.5 rounded-lg font-semibold hover:bg-[#00CC55] transition-colors duration-200"
          >
            🔐 Sign in with Google
          </button>
        )}

        <p className="text-sm text-gray-400 text-center mt-4">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <button
                className="text-[#00ED64] hover:underline font-medium"
                onClick={() => setIsRegistering(false)}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <button
                className="text-[#00ED64] hover:underline font-medium"
                onClick={() => setIsRegistering(true)}
              >
                Create Account
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
