import React from 'react';
import CameraFeed from './CameraFeed';
import EventTicker from './EventTicker';
import TaskDispatch from './TaskDispatch';
import './CommandCenter.css';

export default function CommandCenter({ cameras, events, tasks, onAssignTask, showPlanogram }) {
  return (
    <div className="command-center">
      <div className="camera-grid">
        {cameras.map(cam => (
          <CameraFeed key={cam.id} {...cam} showPlanogram={showPlanogram} />
        ))}
      </div>
      <div className="side-panel">
        <div className="panel-section">
          <TaskDispatch tasks={tasks} onAssignTask={onAssignTask} />
        </div>
        <div className="panel-section">
          <EventTicker events={events} />
        </div>
      </div>
    </div>
  );
}
