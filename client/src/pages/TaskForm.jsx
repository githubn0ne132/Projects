import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function TaskForm() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assigneeId, setAssigneeId] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users to assign
  useEffect(() => {
     // Ideally create a user slice, but direct axios call for simplicity here
     const fetchUsers = async () => {
         const token = JSON.parse(localStorage.getItem('user'))?.token;
         if(token) {
             const res = await axios.get('http://localhost:5000/api/users', {
                 headers: { Authorization: `Bearer ${token}` }
             });
             setUsers(res.data);
         }
     };
     fetchUsers();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({
        title,
        description,
        priority,
        project_id: projectId,
        assignee_id: assigneeId || null
    })).then(() => navigate(`/projects/${projectId}`));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Task to Project</h1>
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Assignee</label>
            <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="">Select User</option>
                {users.map(u => (
                    <option key={u.id} value={u.id}>{u.username} ({u.role})</option>
                ))}
            </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
