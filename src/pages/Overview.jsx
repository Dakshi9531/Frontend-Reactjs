import { useOutletContext } from 'react-router-dom';

function Overview() {
const { project } = useOutletContext();

return (
    <div className="detail-content">
    <h2>Overview</h2>

    <div className="info-grid">
        <div>
        <span>Client</span>
        <strong>{project.client}</strong>
        </div>

        <div>
        <span>Status</span>
        <strong>{project.status}</strong>
        </div>

        <div>
        <span>Hours</span>
        <strong>{project.hours} hrs</strong>
        </div>

        <div>
        <span>Cost</span>
        <strong>₹{project.finalCost}</strong>
        </div>
    </div>
    </div>
);
}

export default Overview;