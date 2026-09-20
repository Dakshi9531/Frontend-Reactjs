import React from 'react'; 
import './app.css';
class App extends React.Component { 
  constructor() { 
    super(); 
    this.state = { 
      data: [ 
        { name: 'Dakshi' }, 
        { name: 'sam' }, 
        { name: 'sindu' } 
      ] 
    }; 
  } 

  render() { 
    return ( 
      <div> 
        <StudentName /> 
        <ul> 
          {this.state.data.map((item, index) => ( 
            <List key={index} data={item} /> 
          ))} 
        </ul>

        <div className="app">
          <h1>Projects</h1>

          <div className="project-list">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </div>
      </div> 
    ); 
  } 
} 

class StudentName extends React.Component { 
  render() { 
    return ( 
      <div> 
        <h1>Student Name Detail</h1> 
      </div> 
    ); 
  } 
} 

class List extends React.Component { 
  render() { 
    return <li>{this.props.data.name}</li>; 
  } 
}

const projects = [
  {
    id: 1,
    name: 'SMART ESTIMATION',
    client: 'TDR Technologies',
    status: 'In Progress',
    owner: 'Dakshi',
    startDate: '2025-09-01',
    endDate: '2026-05-30',
    hours: 200,
    finalCost: 524332
  },
  {
    id: 2,
    name: 'Networking Application',
    client: 'Networks company',
    status: 'Completed',
    owner: 'sindu',
    startDate: '2026-08-14',
    endDate: '2026-08-18',
    hours: 310,
    finalCost: 680000
  },
  {
    id: 3,
    name: 'Mobile Application',
    client: 'Tech Solutions',
    status: 'Planned',
    owner: 'sam',
    startDate: '2026-10-10',
    endDate: '2026-12-30',
    hours: 190,
    finalCost: 0
  }
];

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
    Planned: 'yellow'
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

export default App;