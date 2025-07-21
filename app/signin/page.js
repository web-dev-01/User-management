'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const [form, setForm] = useState({
    name: '',
    identifier: '',
    password: '',
    confirmPassword: '',
    role: '',
    adminKey: ''
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/NewDashboard' });
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
          password: form.password,
          role: form.role,
          adminKey: form.adminKey
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message);
        return;
      }

      if (isRegistering) {
        alert("Account Created Successfully!");
        setIsRegistering(false);
        setForm({
          name: '',
          identifier: '',
          password: '',
          confirmPassword: '',
          role: '',
          adminKey: ''
        });
      } else {
        const userRole = data.user.role;

        // Save data in localStorage
        localStorage.setItem('role', userRole);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to NewDashboard for all roles
        router.push('/NewDashboard');
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

  const isFormValid = isPasswordStrong(form.password) &&
    isPasswordMatch &&
    form.identifier &&
    (isRegistering
      ? form.name &&
        form.role &&
        ((form.role === 'admin' || form.role === 'owner') ? form.adminKey : true)
      : true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#112A2A] to-[#1E2A32] px-4 py-10">
      <div className="bg-[#1E2A2A] p-8 rounded-xl shadow-2xl w-full max-w-md border border-[#00ED64]/20">
        <div className="flex justify-center mb-6">
          <span className="text-[#00ED64] font-bold text-2xl tracking-wide">🌐 Champion Semiconductor</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
          {isRegistering ? 'Create Account' : 'Sign In'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {isRegistering && (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
                placeholder="Full Name"
                required
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white"
                required
              >
                <option value="">Select Role</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="subadmin">Sub-Admin</option>
                <option value="user">User</option>
              </select>

              {(form.role === 'admin' || form.role === 'owner') && (
                <input
                  type="text"
                  name="adminKey"
                  value={form.adminKey}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
                  placeholder="Enter Secret Key"
                  required
                />
              )}
            </>
          )}

          <input
            type="text"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
            placeholder="Email or Phone"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
            placeholder="Password"
            required
          />

          {!isPasswordStrong(form.password) && form.password && (
            <p className="text-xs text-red-400 mt-1">
              Password must be 8+ chars with uppercase, lowercase, number & special character.
            </p>
          )}

          {isRegistering && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
                placeholder="Confirm Password"
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
            className="w-full bg-[#00ED64] text-[#1A3C34] py-3 rounded-lg font-semibold hover:bg-[#00CC55] transition-colors duration-200"
          >
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>

        </form>

        {!isRegistering && (
          <>
            <button
              onClick={handleGoogleSignIn}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-[#00ED64] text-[#1A3C34] py-3 rounded-lg font-semibold hover:bg-[#00CC55] transition-colors duration-200"
            >
              🔐 Sign in with Google
            </button>

            <div className="mt-4 text-center text-sm text-gray-400">
              <a href="/forgot-password" className="text-[#00ED64] hover:underline">Forgot Password?</a>
              <span className="mx-2">|</span>
              <a href="/change-password" className="text-[#00ED64] hover:underline">Change Password</a>
            </div>
          </>
        )}

        <p className="text-sm text-gray-400 text-center mt-6">
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
