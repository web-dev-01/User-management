"use client";

import React, { useEffect, useState } from "react";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:5000/api/admin/users", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Are you sure?")) {
            await fetch(`http://localhost:5000/api/admin/delete-user/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchUsers();
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        await fetch(`http://localhost:5000/api/admin/update-user/${selectedUser._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedUser),
        });

        setShowEditModal(false);
        fetchUsers();
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Position</th>
                        <th className="border p-2">Department</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-100">
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2">{user.position || "N/A"}</td>
                            <td className="border p-2">{user.department || "N/A"}</td>
                            <td className="border p-2 space-x-2">
                                <button onClick={() => { setSelectedUser(user); setShowViewModal(true); }} className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
                                <button onClick={() => { setSelectedUser(user); setShowEditModal(true); }} className="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
                                <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* View Modal */}
            {showViewModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-xl font-bold mb-4">User Details</h2>
                        <p><b>Name:</b> {selectedUser.name}</p>
                        <p><b>Email:</b> {selectedUser.email}</p>
                        <p><b>Role:</b> {selectedUser.role}</p>
                        <p><b>Department:</b> {selectedUser.department || 'N/A'}</p>
                        <p><b>Position:</b> {selectedUser.position || 'N/A'}</p>
                        <button onClick={() => setShowViewModal(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>

                        <input value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} className="w-full mb-2 p-2 border rounded" placeholder="Name" />

                        <input value={selectedUser.role} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })} className="w-full mb-2 p-2 border rounded" placeholder="Role" />

                        <input value={selectedUser.position || ''} onChange={(e) => setSelectedUser({ ...selectedUser, position: e.target.value })} className="w-full mb-2 p-2 border rounded" placeholder="Position" />

                        <input value={selectedUser.department || ''} onChange={(e) => setSelectedUser({ ...selectedUser, department: e.target.value })} className="w-full mb-4 p-2 border rounded" placeholder="Department" />

                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
                        <button onClick={() => setShowEditModal(false)} type="button" className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
