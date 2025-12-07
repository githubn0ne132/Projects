import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject } from '../features/projects/projectSlice';
import { useNavigate } from 'react-router-dom';

function ProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject({ title, description }))
        .then(() => navigate('/dashboard'));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
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
        <button className="bg-green-500 text-white px-4 py-2 rounded">Create Project</button>
      </form>
    </div>
  );
}

export default ProjectForm;
