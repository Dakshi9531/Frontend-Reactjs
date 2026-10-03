function formatCurrency(amount) {
return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
}).format(amount);
}

function formatDate(date) {
return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
});
}

function StatusBadge({ status }) {
const statusStyles = {
    Completed: 'green',
    'In Progress': 'orange',
    Pending: 'gray',
    Planned: 'blue'
};

const style = statusStyles[status] || 'gray';

return (
    <span className={`status-badge ${style}`}>
    {status}
    </span>
);
}

function Detail({ label, value }) {
return (
    <div className="detail">
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value}</span>
    </div>
);
}

function ProjectCard({ project }) {
return (
    <div className="project-card">
    <div className="project-header">
        <div>
        <h2>{project.name}</h2>
        <p>{project.client}</p>
        </div>

        <StatusBadge status={project.status} />
    </div>

    <div className="project-details">
        <Detail
        label="Owner"
        value={project.owner}
        />

        <Detail
        label="Date Range"
        value={`${formatDate(project.startDate)} - ${formatDate(project.endDate)}`}
        />

        <Detail
        label="Total Hours"
        value={`${project.hours} hrs`}
        />

        <Detail
        label="Final Estimated Cost"
        value={formatCurrency(project.finalCost)}
        />
    </div>
    </div>
);
}

export default ProjectCard;