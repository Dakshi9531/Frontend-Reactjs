import { useFetch } from '../hooks/useFetch';
import { getProjects } from '../services/projectService';

function Dashboard() {
  const { data, isLoading, error } = useFetch(
    ({ signal }) => getProjects({ signal }),
    []
  );

  if (isLoading) {
    return (
      <div className="page project-shell">
        <div className="project-detail-header">
          <h1>Dashboard</h1>
        </div>
        <div className="detail-content">
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page project-shell">
        <div className="project-detail-header">
          <h1>Dashboard</h1>
        </div>
        <div className="detail-content">
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  const projects = data || [];
  const statusCounts = {
    'In Progress': projects.filter((project) => project.status === 'In Progress').length,
    Completed: projects.filter((project) => project.status === 'Completed').length,
    Pending: projects.filter((project) => project.status === 'Pending').length
  };

  return (
    <div className="page project-shell">
      <div className="project-detail-header">
        <h1>Dashboard</h1>
      </div>

      <div className="detail-content">
        <h2>Welcome to ProjectHub.</h2>
        <p>Select a project from the sidebar to view project details.</p>

        <div className="status-summary-grid" style={{ marginTop: '24px' }}>
          {Object.entries(statusCounts).map(([label, count]) => (
            <div key={label} className="status-summary-card">
              <span>{label}</span>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
