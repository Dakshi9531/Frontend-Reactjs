import React from 'react';
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

export default App;
