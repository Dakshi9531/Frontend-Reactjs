/*import React from 'react';
import './App.css';

const teamRoles = {
  frontend: {
    id: 'frontend',
    name: 'Frontend Developer',
    rate: 1200
  },
  uiux: {
    id: 'uiux',
    name: 'UI/UX Designer',
    rate: 900
  },
  qa: {
    id: 'qa',
    name: 'QA Tester',
    rate: 700
  }
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [
        {
          id: crypto.randomUUID(),
          name: '',
          roleId: 'frontend',
          hours: ''
        }
      ]
    };
  }

  createEmptyTask = () => ({
    id: crypto.randomUUID(),
    name: '',
    roleId: 'frontend',
    hours: ''
  });

  addTask = () => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, this.createEmptyTask()]
    }));
  };

  handleTaskChange = (taskId, field, value) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId
          ? { ...task, [field]: value }
          : task
      )
    }));
  };

  deleteTask = (taskId) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId)
    }));
  };

  getTaskCost = (task) => {
    const role = teamRoles[task.roleId];
    return (Number(task.hours) || 0) * role.rate;
  };

  getTotalHours = () => {
    return this.state.tasks.reduce(
      (total, task) => total + (Number(task.hours) || 0),
      0
    );
  };

  getTotalCost = () => {
    return this.state.tasks.reduce(
      (total, task) => total + this.getTaskCost(task),
      0
    );
  };

  render() {
    const { tasks } = this.state;

    return (
      <div className="app">
        <div className="header">
          <div>
            <h1>Project Cost Planner</h1>
            <p>Build your project estimate for TechNova Solutions</p>
          </div>

          <button className="add-button" onClick={this.addTask}>
            + Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty">
            <h2>No tasks added</h2>
            <p>Add a task to start planning your project.</p>
          </div>
        ) : (
          <TaskTable
            tasks={tasks}
            roles={teamRoles}
            onTaskChange={this.handleTaskChange}
            onDelete={this.deleteTask}
            getTaskCost={this.getTaskCost}
          />
        )}

        <Summary
          totalTasks={tasks.length}
          totalHours={this.getTotalHours()}
          totalCost={this.getTotalCost()}
        />
      </div>
    );
  }
}

class TaskTable extends React.Component {
  render() {
    const {
      tasks,
      roles,
      onTaskChange,
      onDelete,
      getTaskCost
    } = this.props;

    return (
      <div className="table-container">
        <div className="table-header">
          <span>Project Task</span>
          <span>Team Role</span>
          <span>Hours</span>
          <span>Estimated Cost</span>
          <span>Action</span>
        </div>

        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            roles={roles}
            onTaskChange={onTaskChange}
            onDelete={onDelete}
            getTaskCost={getTaskCost}
          />
        ))}
      </div>
    );
  }
}

class TaskRow extends React.Component {
  render() {
    const {
      task,
      roles,
      onTaskChange,
      onDelete,
      getTaskCost
    } = this.props;

    return (
      <div className="task-row">
        <input
          type="text"
          placeholder="Enter project task"
          value={task.name}
          onChange={(e) =>
            onTaskChange(task.id, 'name', e.target.value)
          }
        />

        <select
          value={task.roleId}
          onChange={(e) =>
            onTaskChange(task.id, 'roleId', e.target.value)
          }
        >
          {Object.values(roles).map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="0"
          value={task.hours}
          onChange={(e) =>
            onTaskChange(task.id, 'hours', e.target.value)
          }
        />

        <div className="cost">
          {formatCurrency(getTaskCost(task))}
        </div>

        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
        >
          Remove
        </button>
      </div>
    );
  }
}

class Summary extends React.Component {
  render() {
    const {
      totalTasks,
      totalHours,
      totalCost
    } = this.props;

    return (
      <div className="summary">
        <div>
          <span>Total Project Tasks</span>
          <strong>{totalTasks}</strong>
        </div>

        <div>
          <span>Total Work Hours</span>
          <strong>{totalHours}</strong>
        </div>

        <div>
          <span>Estimated Project Cost</span>
          <strong>{formatCurrency(totalCost)}</strong>
        </div>
      </div>
    );
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export default App;*/
/*
import { useState } from 'react';
import './App.css';
import { useFetch } from './hooks/useFetch';
import { getProjects, getUsers } from './services/projectService';

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
    Planned: 'blue'
  };

  const style = statusStyles[status] || 'gray';

  return (
    <span className={`status-badge ${style}`}>
      {status}
    </span>
  );
}

function Detail({ label, value, clickable = false, onClick }) {
  return (
    <div className="detail">
      <span className="detail-label">{label}</span>
      {clickable ? (
        <button type="button" className="detail-link" onClick={onClick}>
          {value}
        </button>
      ) : (
        <span className="detail-value">{value}</span>
      )}
    </div>
  );
}

function ProjectCard({ project, user, onOpenUser }) {
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
          clickable={Boolean(user)}
          onClick={() => onOpenUser(user)}
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

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line large"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
    </div>
  );
}

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, isLoading, error, refetch } = useFetch(
    ({ signal }) =>
      Promise.all([
        getProjects({ signal }),
        getUsers({ signal })
      ]),
    []
  );

  if (isLoading) {
    return (
      <div className="app">
        <div className="header">
          <div>
            <h1>Projects</h1>
            <p>Projects loaded from server</p>
          </div>
        </div>

        <div className="project-list">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
          <button onClick={refetch}>Try Again</button>
        </div>
      </div>
    );
  }

  const projects = data?.[0] || [];
  const users = data?.[1] || [];

  if (projects.length === 0) {
    return (
      <div className="app">
        <div className="header">
          <div>
            <h1>Projects</h1>
            <p>Projects loaded from server</p>
          </div>
        </div>

        <div className="empty">
          <h2>No projects yet</h2>
          <p>Create your first project to start estimating.</p>
        </div>
      </div>
    );
  }

  const nameById = Object.fromEntries(
    users.map((user) => [user.id, user.name])
  );

  const projectsWithOwner = projects.map((project) => ({
    ...project,
    owner: nameById[project.ownerId] || 'Unknown'
  }));

  return (
    <>
      <div className="app">
        <div className="header">
          <div>
            <h1>Projects</h1>
            <p>Projects loaded from server</p>
          </div>
        </div>

        <div className="project-list">
          {projectsWithOwner.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              user={users.find((user) => user.id === project.ownerId) || null}
              onOpenUser={setSelectedUser}
            />
          ))}
        </div>
      </div>

      {selectedUser && (
        <div className="user-modal-backdrop" onClick={() => setSelectedUser(null)}>
          <div className="user-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-modal" onClick={() => setSelectedUser(null)}>
              ×
            </button>
            <h3>User Details</h3>
            <div className="user-detail-row">
              <span>ID</span>
              <strong>{selectedUser.id}</strong>
            </div>
            <div className="user-detail-row">
              <span>Name</span>
              <strong>{selectedUser.name}</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
*/
import AppRoutes from './routes';
import './App.css'

function App() {
  return <AppRoutes />;
}

export default App;