import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, reset } from '../features/projects/projectSlice';
import { Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { projects, isLoading, isError, message } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getProjects());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {user && (user.role === 'Admin' || user.role === 'Manager') && (
            <Link to="/projects/new" className="bg-green-500 text-white px-4 py-2 rounded">New Project</Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">
                <Link to={`/projects/${project.id}`} className="hover:underline">{project.title}</Link>
              </h2>
              <p className="text-gray-600 mb-2 truncate">{project.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className={`px-2 py-1 rounded ${project.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200'}`}>
                    {project.status}
                </span>
                <span>Progress: {project.progress}%</span>
              </div>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
