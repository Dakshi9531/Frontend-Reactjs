import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getProjects, getUsers } from '../services/projectService';

function formatCurrency(amount) {
  if (amount === 0 || amount === null || amount === undefined) {
    return 'Not estimated';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}


const emptyProjectForm = {
  name: '',
  client: '',
  status: 'Pending',
  ownerId: 1,
  startDate: '',
  endDate: '',
  hours: '',
  finalCost: ''
};

function Projects() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch(
    ({ signal }) =>
      Promise.all([
        getProjects({ signal }),
        getUsers({ signal })
      ]),
    []
  );

  const [projectList, setProjectList] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    ...emptyProjectForm,
    ownerId: ''
  });

  const projectsToRender = projectList.length > 0 ? projectList : (data?.[0] ?? []);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      ...emptyProjectForm,
      ownerId: ''
    });
    setIsCreateOpen(false);
  };

  const handleCreateProject = (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedClient = formData.client.trim();

    if (!trimmedName || !trimmedClient) {
      return;
    }

    const ownerName = String(formData.ownerId || '').trim();

    const newProject = {
      id: Date.now(),
      name: trimmedName,
      client: trimmedClient,
      status: formData.status,
      ownerId: ownerName ? ownerName : 'Unknown',
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      endDate: formData.endDate || '',
      hours: Number(formData.hours) || 0,
      finalCost: Number(formData.finalCost) || 0
    };

    setProjectList((prev) => [newProject, ...prev]);
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="page project-shell">
        <div className="project-detail-header">
          <h1>Projects</h1>
        </div>
        <div className="detail-content">
          <h2>Loading projects...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page project-shell">
        <div className="project-detail-header">
          <h1>Projects</h1>
        </div>
        <div className="detail-content">
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  const users = data?.[1] || [];
  const userMap = Object.fromEntries(users.map((user) => [user.id, user.name]));

  return (
    <div className="page project-shell">
      <div className="project-detail-header">
        <h1>Projects</h1>

        <div className="header-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => setIsCreateOpen(true)}
          >
            + New Project
          </button>
        </div>
      </div>

      <div className="project-list-grid">
        {projectsToRender.map((project) => (
          <div
            key={project.id}
            className="project-summary-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/projects/${project.id}`)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigate(`/projects/${project.id}`);
              }
            }}
          >
            <div className="project-summary-top">
              <div>
                <h3>{project.name}</h3>
                <p>{project.client}</p>
              </div>
              <span className={`status-badge ${project.status === 'Completed' ? 'green' : project.status === 'In Progress' ? 'orange' : 'gray'}`}>
                {project.status}
              </span>
            </div>

            <div className="project-summary-meta">
              <div>
                <span>Owner</span>
                <Link
                  to={`/users/${project.ownerId}`}
                  className="owner-link"
                  onClick={(event) => event.stopPropagation()}
                >
                  {userMap[project.ownerId] || 'Unknown'}
                </Link>
              </div>
              <div>
                <span>Hours</span>
                <strong>{project.hours} hrs</strong>
              </div>
              <div>
                <span>Cost</span>
                <strong>{formatCurrency(project.finalCost)}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isCreateOpen && (
        <div className="modal-backdrop" onClick={resetForm}>
          <div className="create-project-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-kicker">Create project</span>
                <h2>New Project</h2>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={resetForm}
                aria-label="Close new project form"
              >
                ×
              </button>
            </div>

            <form className="create-project-form" onSubmit={handleCreateProject}>
              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="name">Project name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    placeholder="Enter project name"
                    onChange={handleFieldChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="client">Client</label>
                  <input
                    id="client"
                    name="client"
                    type="text"
                    value={formData.client}
                    placeholder="Enter client name"
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleFieldChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="ownerId">Owner</label>
                  <input
                    id="ownerId"
                    name="ownerId"
                    type="text"
                    value={formData.ownerId}
                    placeholder="Type owner name"
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="startDate">Start date</label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleFieldChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="endDate">End date</label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="hours">Hours</label>
                  <input
                    id="hours"
                    name="hours"
                    type="number"
                    min="0"
                    value={formData.hours}
                    placeholder="0"
                    onChange={handleFieldChange}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="finalCost">Estimated cost</label>
                  <input
                    id="finalCost"
                    name="finalCost"
                    type="number"
                    min="0"
                    value={formData.finalCost}
                    placeholder="0"
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;