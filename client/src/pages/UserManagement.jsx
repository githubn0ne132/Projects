import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        const res = await axios.get('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
    } catch (error) {
        console.error(error);
    }
  };

  const deleteUser = async (id) => {
      if(!window.confirm("Are you sure?")) return;
      try {
          const token = JSON.parse(localStorage.getItem('user'))?.token;
          await axios.delete(`http://localhost:5000/api/users/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
          });
          fetchUsers();
      } catch (error) {
          alert('Failed to delete user');
      }
  };

  const updateUser = async (e) => {
      e.preventDefault();
      try {
          const token = JSON.parse(localStorage.getItem('user'))?.token;
          await axios.put(`http://localhost:5000/api/users/${editingUser.id}`, editingUser, {
              headers: { Authorization: `Bearer ${token}` }
          });
          setEditingUser(null);
          fetchUsers();
      } catch (error) {
          alert('Failed to update user');
      }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {editingUser && (
          <div className="bg-white p-4 mb-4 shadow rounded">
              <h2 className="text-xl font-bold mb-2">Edit User</h2>
              <form onSubmit={updateUser}>
                  <div className="mb-2">
                      <label className="block">Username</label>
                      <input
                        className="border p-1 w-full"
                        value={editingUser.username}
                        onChange={e => setEditingUser({...editingUser, username: e.target.value})}
                      />
                  </div>
                  <div className="mb-2">
                      <label className="block">Email</label>
                      <input
                        className="border p-1 w-full"
                        value={editingUser.email}
                        onChange={e => setEditingUser({...editingUser, email: e.target.value})}
                      />
                  </div>
                  <div className="mb-2">
                      <label className="block">Role</label>
                      <select
                        className="border p-1 w-full"
                        value={editingUser.role}
                        onChange={e => setEditingUser({...editingUser, role: e.target.value})}
                      >
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Contributor">Contributor</option>
                          <option value="Viewer">Viewer</option>
                      </select>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Update</button>
                  <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
              </form>
          </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full">
              <thead className="bg-gray-100">
                  <tr>
                      <th className="p-2 text-left">ID</th>
                      <th className="p-2 text-left">Username</th>
                      <th className="p-2 text-left">Email</th>
                      <th className="p-2 text-left">Role</th>
                      <th className="p-2 text-left">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map(u => (
                      <tr key={u.id} className="border-b">
                          <td className="p-2">{u.id}</td>
                          <td className="p-2">{u.username}</td>
                          <td className="p-2">{u.email}</td>
                          <td className="p-2">{u.role}</td>
                          <td className="p-2">
                              {currentUser && currentUser.role === 'Admin' && (
                                  <>
                                    <button onClick={() => setEditingUser(u)} className="text-blue-500 hover:underline mr-2">Edit</button>
                                    <button onClick={() => deleteUser(u.id)} className="text-red-500 hover:underline">Delete</button>
                                  </>
                              )}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
}

export default UserManagement;
