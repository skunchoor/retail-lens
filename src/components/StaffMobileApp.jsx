import React, { useState } from 'react';
import { Smartphone, CheckCircle2, ListTodo, Package, User } from 'lucide-react';
import './StaffMobileApp.css';

export default function StaffMobileApp({ assignedTasks, onCompleteTask }) {
  const [activeTab, setActiveTab] = useState('tasks');

  // We keep it always visible on screen for demo purposes, 
  // normally it would only appear if a flag is set.
  return (
    <div className="mobile-app-wrapper">
      <div className="mobile-device">
        {/* Device Header */}
        <div className="device-header">
          <div className="notch"></div>
          <div className="status-bar">
            <span>9:41</span>
            <div className="status-icons">
              <span style={{ fontSize: '10px' }}>5G</span>
              <div className="battery"></div>
            </div>
          </div>
        </div>

        {/* App Content */}
        <div className="app-main">
          <header className="app-header">
            <h2>Staff Portal</h2>
            <div className="app-avatar">
              <User size={16} />
            </div>
          </header>

          <div className="app-scroll-area">
            {activeTab === 'tasks' && (
              <div className="mobile-tasks">
                <h3>My Tasks</h3>
                {assignedTasks.length === 0 ? (
                  <div className="empty-tasks">
                    <CheckCircle2 size={40} className="text-muted" />
                    <p>All caught up! No active tasks.</p>
                  </div>
                ) : (
                  <div className="task-list-mobile">
                    {assignedTasks.map(task => (
                      <div key={task.id} className={`mobile-task-card priority-${task.priority}`}>
                        <div className="mobile-task-header">
                          <h4>{task.title}</h4>
                          <span className="mobile-location">{task.location}</span>
                        </div>
                        <p>{task.description}</p>
                        <button 
                          className="btn-complete-task"
                          onClick={() => onCompleteTask(task)}
                        >
                          <CheckCircle2 size={16} />
                          Mark Complete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'inventory' && (
              <div className="mobile-inventory">
                <h3>Quick Inventory</h3>
                <div className="empty-tasks">
                  <Package size={40} className="text-muted" />
                  <p>Scan barcode to check stock</p>
                  <button className="btn-scan">Open Camera</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Nav */}
        <nav className="device-bottom-nav">
          <button 
            className={`mobile-nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <div className="icon-wrapper">
              <ListTodo size={20} />
              {assignedTasks.length > 0 && <span className="badge">{assignedTasks.length}</span>}
            </div>
            <span>Tasks</span>
          </button>
          <button 
            className={`mobile-nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={20} />
            <span>Stock</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
