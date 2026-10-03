import { NavLink, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const isProjectSectionActive = location.pathname.startsWith('/projects');

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">ProjectsEstimi</div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={() =>
            isProjectSectionActive ? 'nav-link active' : 'nav-link'
          }
        >
          Projects
        </NavLink>

        <NavLink to="/projects/1" className="nav-link nested" end>
          Overview
        </NavLink>

        <NavLink to="/projects/1/estimate" className="nav-link nested">
          Estimate
        </NavLink>

        <NavLink to="/projects/1/team" className="nav-link nested">
          Team
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;