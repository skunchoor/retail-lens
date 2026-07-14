import React from 'react';
import { ClipboardList, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import './TaskDispatch.css';

export default function TaskDispatch({ tasks, onAssignTask }) {
  const getIcon = (priority) => {
    switch (priority) {
      case 'high': return <XCircle size={16} className="text-danger" />;
      case 'medium': return <AlertTriangle size={16} className="text-warning" />;
      default: return <CheckCircle2 size={16} className="text-success" />;
    }
  };

  return (
    <div className="task-dispatch glass-panel">
      <div className="task-header">
        <ClipboardList size={18} className="text-accent-secondary" />
        <h3>Automated Task Dispatch</h3>
        <span className="task-count">{tasks.length} Active</span>
      </div>
      <div className="task-content">
        {tasks.length === 0 ? (
          <div className="empty-state">No pending tasks for staff</div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className={`task-card priority-${task.priority}`}>
                <div className="task-card-header">
                  <div className="task-title-group">
                    {getIcon(task.priority)}
                    <h4>{task.title}</h4>
                  </div>
                  <span className="task-location">{task.location}</span>
                </div>
                <p className="task-desc">{task.description}</p>
                <div className="task-actions">
                  <button className="btn-assign" onClick={() => onAssignTask && onAssignTask(task)}>Assign Staff</button>
                  <button className="btn-dismiss">Dismiss</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
