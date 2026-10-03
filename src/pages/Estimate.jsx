import { useOutletContext } from 'react-router-dom';

function Estimate() {
const { project } = useOutletContext();

return (
    <div className="detail-content">
    <h2>Estimate</h2>

    <p>
        Estimated hours: {project.hours} hrs
    </p>

    <p>
        Estimated cost: ₹{project.finalCost}
    </p>
    </div>
);
}

export default Estimate;