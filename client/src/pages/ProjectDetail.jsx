import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectById } from '../features/projects/projectSlice';
import { updateTask } from '../features/tasks/taskSlice';

function ProjectDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentProject: project, isLoading } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [id, dispatch]);

  if (isLoading || !project) return <div>Loading...</div>;

  const handleStatusChange = (taskId, newStatus) => {
      dispatch(updateTask({ id: taskId, taskData: { status: newStatus } }))
        .then(() => dispatch(getProjectById(id))); // Refresh
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded shadow mb-6">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-700 mb-4">{project.description}</p>
        <div className="flex gap-4 mb-4">
            <span className="font-semibold">Status: {project.status}</span>
            <span className="font-semibold">Progress: {project.progress}%</span>
        </div>

        {(user.role === 'Admin' || user.role === 'Manager') && (
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => navigate(`/projects/${id}/add-task`)}>
                Add Task
            </button>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {project.tasks && project.tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                <div className="text-sm mb-2">
                    <span className="font-semibold">Priority:</span> {task.priority}
                </div>
                <div className="text-sm mb-2">
                    <span className="font-semibold">Assignee:</span> {task.assignee ? task.assignee.username : 'Unassigned'}
                </div>

                <div className="mt-2">
                    {user.role !== 'Viewer' ? (
                        <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                            className="border rounded p-1 w-full"
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Review">Review</option>
                            <option value="Done">Done</option>
                        </select>
                    ) : (
                        <div className="border rounded p-1 w-full bg-gray-100 text-gray-700">
                            {task.status}
                        </div>
                    )}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectDetail;
