"use client";

import React, { useEffect, useState } from "react";

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchProfile = async () => {
            const res = await fetch("http://localhost:5000/api/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setUser(data.user);
        };

        fetchProfile();
    }, []);

    if (!user) return <p className="p-8">Loading Profile...</p>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>

            <div className="bg-white shadow-xl p-6 rounded-xl w-96">
                <p><b>Name:</b> {user.name}</p>
                <p><b>Email / Identifier:</b> {user.identifier}</p>
                <p><b>Role:</b> {user.role}</p>
                <p><b>Verified:</b> {user.isVerified ? "Yes" : "No"}</p>
                <p><b>Created At:</b> {new Date(user.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default UserProfile;
