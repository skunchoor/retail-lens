import React, { useState } from 'react';
import { Camera, Bell, Shield, Database, SlidersHorizontal, Plus } from 'lucide-react';
import './SystemSettings.css';

export default function SystemSettings({ showPlanogram, setShowPlanogram }) {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="settings-container">
      <div className="settings-sidebar glass-panel">
        <button 
          className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        ><SlidersHorizontal size={18} /> General</button>
        <button 
          className={`settings-tab ${activeTab === 'camera' ? 'active' : ''}`}
          onClick={() => setActiveTab('camera')}
        ><Camera size={18} /> Camera Zones</button>
        <button 
          className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        ><Bell size={18} /> Notifications</button>
        <button 
          className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        ><Shield size={18} /> Security & Roles</button>
        <button 
          className={`settings-tab ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        ><Database size={18} /> Data Integration</button>
      </div>

      <div className="settings-content glass-panel">
        {activeTab === 'general' && (
          <>
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
              <h3>System Preferences</h3>
              <p className="settings-desc">Global settings for the store dashboard.</p>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Dark Mode Theme</h4>
                  <p>Use the high-contrast dark theme across all Command Center displays.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </>
        )}

        {activeTab === 'camera' && (
          <div className="settings-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0 }}>Camera Zones Configuration</h3>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.25rem 0.75rem' }}>
                <Plus size={16} /> Add Camera
              </button>
            </div>
            <p className="settings-desc">Manage camera feeds and their physical locations within the store.</p>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Aisle 4 - Condiments (Cam 01)</h4>
                <p>Status: Active | Resolution: 4K | Model: AI-Vision-Pro</p>
              </div>
              <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>Configure</button>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Aisle 2 - Snacks (Cam 02)</h4>
                <p>Status: Active | Resolution: 1080p | Model: Standard-IP</p>
              </div>
              <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>Configure</button>
            </div>
            <div className="setting-item">
              <div className="setting-info" style={{ opacity: 0.5 }}>
                <h4>Produce Section (Cam 03)</h4>
                <p>Status: Offline | Resolution: 4K | Model: AI-Vision-Pro</p>
              </div>
              <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>Reconnect</button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
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

            <div className="setting-item">
              <div className="setting-info">
                <h4>Shift-End Summary Report</h4>
                <p>Email a daily summary of task completion rates and outstanding issues to management.</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="settings-section">
            <h3>Security & Roles</h3>
            <p className="settings-desc">Manage who has access to the Command Center and what they can see.</p>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Store Manager (Admin)</h4>
                <p>Full access to all settings, analytics, and camera configurations.</p>
              </div>
              <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>Manage Users</button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Shift Supervisor</h4>
                <p>Access to dashboard, inventory, and task assignments. Cannot change system settings.</p>
              </div>
              <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>Manage Users</button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Floor Associate</h4>
                <p>Mobile App access only. Can view and complete assigned tasks.</p>
              </div>
              <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>Manage Users</button>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="settings-section">
            <h3>Data Integration</h3>
            <p className="settings-desc">Connect Retail-Lens with your existing enterprise systems.</p>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Inventory POS Sync (SAP)</h4>
                <p>Sync physical detections with Point of Sale data to identify shrink and theft.</p>
              </div>
              <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem', color: 'var(--color-accent-success)', borderColor: 'var(--color-accent-success)' }}>Connected</button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h4>Workforce Management (Kronos)</h4>
                <p>Sync staff schedules to only assign tasks to employees currently on the clock.</p>
              </div>
              <button className="btn-secondary" style={{ padding: '0.25rem 0.75rem', color: 'var(--color-accent-success)', borderColor: 'var(--color-accent-success)' }}>Connected</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Cloud Video Archiving (AWS)</h4>
                <p>Automatically backup daily camera footage to secure cloud storage.</p>
              </div>
              <button className="btn-primary" style={{ padding: '0.25rem 0.75rem' }}>Connect</button>
            </div>
          </div>
        )}
        
        <div className="settings-actions">
          <button className="btn-secondary">Reset Defaults</button>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
