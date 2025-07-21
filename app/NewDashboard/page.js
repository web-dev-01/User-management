"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NewDashboard = () => {
    const router = useRouter();
    const [role, setRole] = useState("");
    const [stats, setStats] = useState({
        totalUsers: 0,
        verifiedUsers: 0,
        admins: 0,
    });

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);

        // Fetch Stats only for owner or admin
        if (storedRole === "owner" || storedRole === "admin") {
            fetch("http://localhost:5000/api/admin/stats", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(data => setStats(data));
        }
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard ({role})</h1>

            {/* Show stats only for owner/admin */}
            {(role === "owner" || role === "admin") && (
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-500 text-white p-5 rounded-xl shadow-lg">Total Users: {stats.totalUsers}</div>
                    <div className="bg-green-500 text-white p-5 rounded-xl shadow-lg">Verified Users: {stats.verifiedUsers}</div>
                    <div className="bg-purple-500 text-white p-5 rounded-xl shadow-lg">Admins: {stats.admins}</div>
                </div>
            )}

            <div className="flex gap-4 flex-wrap">
                <button onClick={() => router.push("/NewDashboard/user-profile")} className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">Profile</button>

                {(role === "owner" || role === "admin") && (
                    <button onClick={() => router.push("/NewDashboard/manage-users")} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">Manage Users</button>
                )}

                {role === "owner" && (
                    <button onClick={() => router.push("/NewDashboard/assign-role")} className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">Assign Role</button>
                )}

                {(role === "owner" || role === "admin" || role === "subadmin") && (
                    <button onClick={() => router.push("/NewDashboard/employees")} className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600">Manage Employees</button>
                )}
            </div>
        </div>
    );
};

export default NewDashboard;
