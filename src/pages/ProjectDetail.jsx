import {
    NavLink,
    Outlet,
    useNavigate,
    useParams
} from 'react-router-dom';

import { getProject } from '../services/projectService';
import { useFetch } from '../hooks/useFetch';

function ProjectDetail() {
const { projectId } = useParams();
const navigate = useNavigate();

const {
    data: project,
    isLoading,
    error
} = useFetch(
    ({ signal }) =>
        getProject(projectId, { signal }),
    [projectId]
);

if (isLoading) {
    return (
    <div className="page">
        <h1>Loading project...</h1>
    </div>
    );
}

if (error) {
    return (
    <div className="page">
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
    </div>
    );
}

if (!project) {
    return (
    <div className="page">
        <div className="not-found">
        <h1>Project not found</h1>
        <p>
            The project you are looking for does not exist.
        </p>
        </div>
    </div>
    );
}

return (
    <div className="page project-shell">
    <div className="project-toolbar">
        <button type="button" className="back-button" onClick={() => navigate('/projects')}>
            ← Back
        </button>
    </div>

    <div className="project-detail-header">
        <h1>{project.name}</h1>
        <p className="project-client">{project.client}</p>
    </div>

    <nav className="project-tabs">
        <NavLink
        end
        to={`/projects/${projectId}`}
        className={({ isActive }) =>
            isActive ? 'tab active' : 'tab'
        }
        >
        Overview
        </NavLink>

        <NavLink
        to={`/projects/${projectId}/estimate`}
        className={({ isActive }) =>
            isActive ? 'tab active' : 'tab'
        }
        >
        Estimate
        </NavLink>

        <NavLink
        to={`/projects/${projectId}/team`}
        className={({ isActive }) =>
            isActive ? 'tab active' : 'tab'
        }
        >
        Team
        </NavLink>
    </nav>

    <Outlet context={{ project }} />
    </div>
);
}

export default ProjectDetail