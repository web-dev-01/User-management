"use client";

import React, { useState } from "react";

const RoleAssign = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

    const handleAssign = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/admin/assign-role", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, role }),
        });

        const data = await res.json();
        alert(data.message);
        setEmail("");
        setRole("");
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Assign Role</h1>

            <form onSubmit={handleAssign} className="space-y-4">
                <input
                    type="email"
                    placeholder="User Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Role (e.g. admin)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Assign Role</button>
            </form>
        </div>
    );
};

export default RoleAssign;
