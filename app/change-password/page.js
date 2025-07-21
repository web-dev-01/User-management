"use client";
import { useState } from "react";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1A3C34]">
      <form onSubmit={handleSubmit} className="bg-[#1E2A32] p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Change Password</h2>
        <input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required className="w-full p-3 rounded-lg bg-[#2D3E50] border border-gray-600 text-white mb-4"/>
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full p-3 rounded-lg bg-[#2D3E50] border border-gray-600 text-white mb-4"/>
        <button type="submit" className="w-full bg-[#00ED64] text-[#1A3C34] py-3 rounded-lg font-semibold hover:bg-[#00CC55]">Update Password</button>
      </form>
    </div>
  );
}
