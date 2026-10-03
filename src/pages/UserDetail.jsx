import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getProjects, getUsers } from '../services/projectService';

function UserDetail() {
  const { userId } = useParams();

  const { data, isLoading, error } = useFetch(
    ({ signal }) =>
      Promise.all([
        getProjects({ signal }),
        getUsers({ signal })
      ]),
    [userId]
  );

  if (isLoading) {
    return (
      <div className="page project-shell">
        <div className="detail-content">
          <h2>Loading user...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page project-shell">
        <div className="detail-content">
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  const projects = data?.[0] || [];
  const users = data?.[1] || [];
  const user = users.find((item) => String(item.id) === String(userId));
  const userProjects = projects.filter((project) => Number(project.ownerId) === Number(userId));

  if (!user) {
    return (
      <div className="page project-shell">
        <div className="detail-content">
          <h2>User not found</h2>
          <p>The user you are looking for does not exist.</p>
          <Link to="/projects" className="primary-button" style={{ display: 'inline-block', marginTop: '16px' }}>
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page project-shell">
      <div className="project-toolbar">
        <Link to="/projects" className="back-button">
          ← Back
        </Link>
      </div>

      <div className="project-detail-header">
        <h1>User Details</h1>
      </div>

      <div className="detail-content">
        <div className="info-grid">
          <div>
            <span>ID</span>
            <strong>{user.id}</strong>
          </div>

          <div>
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>
        </div>

        <div className="user-projects-block">
          <h3>Projects assigned to {user.name}</h3>

          {userProjects.length > 0 ? (
            <ul className="user-project-list">
              {userProjects.map((project) => (
                <li key={project.id}>
                  <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-projects">No projects found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
