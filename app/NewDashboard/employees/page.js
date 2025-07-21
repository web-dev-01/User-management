'use client';

import { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Filter, Download, X, User, Mail, Building, Shield } from 'lucide-react';

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', role: 'Admin', department: 'IT', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Sahil Khan', email: 'sahil@example.com', role: 'User', department: 'HR', status: 'Active', joinDate: '2023-03-20' },
    { id: 3, name: 'Anjali Sharma', email: 'anjali@example.com', role: 'User', department: 'Finance', status: 'Active', joinDate: '2023-02-10' },
    { id: 4, name: 'Priya Patel', email: 'priya@example.com', role: 'Manager', department: 'Marketing', status: 'Active', joinDate: '2022-11-05' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', role: 'User', department: 'IT', status: 'Inactive', joinDate: '2023-05-12' },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const departments = [...new Set(employees.map(emp => emp.department))];
  const roles = [...new Set(employees.map(emp => emp.role))];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !filterDepartment || emp.department === filterDepartment;
    const matchesRole = !filterRole || emp.role === filterRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const handleDelete = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
    setIsDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleEdit = (updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Manager': return 'bg-blue-100 text-blue-800';
      case 'User': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-[#1A3C34] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-[#1E2A32] rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Employee Management</h1>
              <p className="text-gray-300 mt-1">Manage your team members and their roles</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-white">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#00ED64] text-[#1A3C34] rounded-lg hover:bg-[#00CC55] transition-colors">
                <Plus className="w-4 h-4" />
                Add Employee
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#1E2A32] rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white placeholder-gray-400"
              />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white"
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-[#1E2A32] rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2D3E50] border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-[#1E2A32] divide-y divide-gray-600">
                {filteredEmployees.map(emp => (
                  <tr key={emp.id} className="hover:bg-[#2D3E50] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{emp.name}</div>
                          <div className="text-sm text-gray-400">{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(emp.role)}`}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{emp.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(emp.status)}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{emp.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setSelectedEmployee(emp); setIsViewModalOpen(true); }}
                          className="text-blue-400 hover:text-blue-600 p-1 rounded-lg hover:bg-blue-900 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setSelectedEmployee(emp); setIsEditModalOpen(true); }}
                          className="text-green-400 hover:text-green-600 p-1 rounded-lg hover:bg-green-900 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(emp)}
                          className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-900 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Modal */}
        {isViewModalOpen && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E2A32] rounded-lg w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-600">
                <h2 className="text-xl font-semibold text-white">Employee Details</h2>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="font-medium text-white">{selectedEmployee.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium text-white">{selectedEmployee.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Role</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(selectedEmployee.role)}`}>
                      {selectedEmployee.role}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Department</p>
                    <p className="font-medium text-white">{selectedEmployee.department}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && selectedEmployee && (
          <EditEmployeeModal
            employee={selectedEmployee}
            onSave={handleEdit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E2A32] rounded-lg w-full max-w-md">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Confirm Delete</h3>
                <p className="text-gray-400 mb-4">
                  Are you sure you want to delete {selectedEmployee.name}? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 text-gray-400 bg-[#2D3E50] rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EditEmployeeModal({ employee, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    role: employee.role,
    department: employee.department,
    status: employee.status
  });

  const handleSubmit = () => {
    onSave({ ...employee, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1E2A32] rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <h2 className="text-xl font-semibold text-white">Edit Employee</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white"
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 bg-[#2D3E50] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00ED64] text-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-gray-400 bg-[#2D3E50] rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-[#00ED64] text-[#1A3C34] rounded-lg hover:bg-[#00CC55] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}