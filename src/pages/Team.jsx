import { useOutletContext } from 'react-router-dom';

function Team() {
const { project } = useOutletContext();

return (
    <div className="detail-content">
    <h2>Team</h2>

    <p>
        Team information for {project.name}
    </p>
    </div>
);
}

export default Team;