import React from 'react';
import { Camera, Bell, Shield, Database, SlidersHorizontal } from 'lucide-react';
import './SystemSettings.css';

export default function SystemSettings({ showPlanogram, setShowPlanogram }) {
  return (
    <div className="settings-container">
      <div className="settings-sidebar glass-panel">
        <button className="settings-tab active"><SlidersHorizontal size={18} /> General</button>
        <button className="settings-tab"><Camera size={18} /> Camera Zones</button>
        <button className="settings-tab"><Bell size={18} /> Notifications</button>
        <button className="settings-tab"><Shield size={18} /> Security & Roles</button>
        <button className="settings-tab"><Database size={18} /> Data Integration</button>
      </div>

      <div className="settings-content glass-panel">
        <div className="settings-section">
          <h3>Computer Vision AI Settings</h3>
          <p className="settings-desc">Configure how the AI analyzes the store camera feeds.</p>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4>Planogram Compliance Overlay</h4>
              <p>Display intended shelf layouts over live camera feeds to detect misplaced items.</p>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={showPlanogram} 
                onChange={(e) => setShowPlanogram(e.target.checked)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>Low Stock Alert Threshold</h4>
              <p>Trigger a task when an item drops below this percentage of maximum shelf capacity.</p>
            </div>
            <div className="range-control">
              <span>15%</span>
              <input type="range" min="5" max="50" defaultValue="15" className="range-slider" />
            </div>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4>Facial Blurring (Privacy Mode)</h4>
              <p>Automatically detect and blur faces in the Command Center video feeds.</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Notification Routing</h3>
          <p className="settings-desc">Manage how alerts are dispatched to staff.</p>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4>Auto-Assign Tasks</h4>
              <p>Automatically dispatch tasks to the nearest available associate's mobile device.</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4>Manager Escalation</h4>
              <p>Send an SMS to the Store Manager if a High Priority task is unresolved for more than 15 mins.</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="settings-actions">
          <button className="btn-secondary">Reset to Defaults</button>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
