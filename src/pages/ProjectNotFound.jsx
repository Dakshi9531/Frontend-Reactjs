import { Link } from 'react-router-dom';

import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../services/projectService';
import { useFetch } from '../hooks/useFetch';

function Projects() {
const {
    data: projects,
    isLoading,
    error,
    refetch
} = useFetch(getProjects);

if (isLoading) {
    return (
    <div className="page">
        <h1>Projects</h1>

        <div className="skeleton">
        Loading projects...
        </div>
    </div>
    );
}

if (error) {
    return (
    <div className="page">
        <h1>Projects</h1>

        <div className="error-box">
        <h2>Something went wrong</h2>
        <p>{error.message}</p>

        <button onClick={refetch}>
            Try Again
        </button>
        </div>
    </div>
    );
}

if (!projects || projects.length === 0) {
    return (
    <div className="page">
        <h1>Projects</h1>

        <div className="empty">
        <h2>No projects yet</h2>
        <p>
            Create your first project to start estimating.
        </p>
        </div>
    </div>
    );
}

return (
    <div className="page">
    <div className="page-header">
        <div>
        <h1>Projects</h1>
        <p>All your projects</p>
        </div>

        <Link
        to="/projects"
        className="primary-button"
        >
        Projects
        </Link>
    </div>

    <div className="project-list">
        {projects.map((project) => (
        <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="project-link"
        >
            <ProjectCard project={project} />
        </Link>
        ))}
    </div>
    </div>
);
}

export default Projects;