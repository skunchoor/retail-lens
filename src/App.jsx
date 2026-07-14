import { useState, useEffect } from 'react';
import { LayoutDashboard, Camera, Package, Settings, Bell, Menu, BarChart3, Smartphone } from 'lucide-react';
import CommandCenter from './components/CommandCenter';
import Inventory from './components/Inventory';
import Analytics from './components/Analytics';
import SystemSettings from './components/SystemSettings';
import StaffMobileApp from './components/StaffMobileApp';
import './App.css';

// Initial Mock Data
const INITIAL_CAMERAS = [
  {
    id: 'cam1',
    name: 'Aisle 4 - Condiments',
    location: 'North Wing',
    imageUrl: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&q=80&w=800',
    detections: [
      { id: 'd1', type: 'success', x: 10, y: 30, width: 20, height: 40, label: 'Ketchup (Stocked)' },
      { id: 'd2', type: 'danger', x: 35, y: 30, width: 20, height: 40, label: 'Mustard (Out of Stock)', isPulsing: true },
      { id: 'd3', type: 'success', x: 60, y: 30, width: 30, height: 40, label: 'Mayo (Stocked)' }
    ]
  },
  {
    id: 'cam2',
    name: 'Aisle 2 - Snacks',
    location: 'Central',
    imageUrl: 'https://images.unsplash.com/photo-1587596041162-4318c50c184c?auto=format&fit=crop&q=80&w=800',
    detections: [
      { id: 'd4', type: 'success', x: 5, y: 20, width: 40, height: 60, label: 'Chips (Stocked)' },
      { id: 'd5', type: 'warning', x: 50, y: 20, width: 40, height: 60, label: 'Price Mismatch', isPulsing: true }
    ]
  },
  {
    id: 'cam3',
    name: 'Endcap Promo',
    location: 'Front Store',
    imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800',
    detections: [
      { id: 'd6', type: 'success', x: 20, y: 10, width: 60, height: 80, label: 'Promo Items (Healthy)' }
    ]
  },
  {
    id: 'cam4',
    name: 'Produce - Apples',
    location: 'Fresh Market',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    detections: [
      { id: 'd7', type: 'success', x: 10, y: 10, width: 80, height: 80, label: 'Apples (Good Quality)' }
    ]
  }
];

const INITIAL_EVENTS = [
  { id: 1, time: '10:41 AM', source: 'Cam 1', type: 'danger', message: 'Out-of-stock detected for Heinz Mustard.' },
  { id: 2, time: '10:43 AM', source: 'Cam 2', type: 'warning', message: 'Price tag mismatch on Doritos Family Size.' },
  { id: 3, time: '10:45 AM', source: 'Cam 4', type: 'success', message: 'Produce levels healthy.' }
];

const INITIAL_TASKS = [
  { id: 't1', title: 'Restock Mustard', location: 'Aisle 4', description: 'Heinz Mustard is out of stock. Replenish from backroom.', priority: 'high' },
  { id: 't2', title: 'Fix Price Tag', location: 'Aisle 2', description: 'Doritos Family Size showing $4.99, system price is $5.49.', priority: 'medium' }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Shared State
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [showPlanogram, setShowPlanogram] = useState(false);
  const [showMobileApp, setShowMobileApp] = useState(true);

  // Simulate incoming live data
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const r = Math.random();
      if (r < 0.3) {
        setEvents(prev => [{ id: Date.now(), time: now, source: 'Sys', type: 'info', message: 'Periodic full store scan completed.' }, ...prev].slice(0, 15));
      } else if (r < 0.6) {
        setEvents(prev => [{ id: Date.now(), time: now, source: 'Cam 3', type: 'warning', message: 'Low stock on promo endcap.' }, ...prev].slice(0, 15));
        setTasks(prev => [{
          id: `t_${Date.now()}`,
          title: 'Check Promo Endcap',
          location: 'Front Store',
          description: 'Promo items are running low. Verify backstock.',
          priority: 'medium'
        }, ...prev]);
        
        setCameras(prev => prev.map(cam => {
          if (cam.id === 'cam3') {
            return {
              ...cam,
              detections: [{ id: 'd6', type: 'warning', x: 20, y: 10, width: 60, height: 80, label: 'Promo Items (Low Stock)', isPulsing: true }]
            };
          }
          return cam;
        }));
      }
    }, 8000); // Slower simulation to not overwhelm

    return () => clearInterval(interval);
  }, []);

  const handleAssignTask = (task) => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
    setAssignedTasks(prev => [task, ...prev]);
    
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEvents(prev => [{ id: Date.now(), time: now, source: 'System', type: 'info', message: `Task "${task.title}" assigned to staff.` }, ...prev].slice(0, 15));
  };

  const handleCompleteTask = (task) => {
    setAssignedTasks(prev => prev.filter(t => t.id !== task.id));
    
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEvents(prev => [{ id: Date.now(), time: now, source: 'Staff', type: 'success', message: `Task "${task.title}" completed.` }, ...prev].slice(0, 15));

    // Cleanup camera view if it was mustard
    if (task.id === 't1') {
      setCameras(cPrev => cPrev.map(cam => {
        if (cam.id === 'cam1') {
          return {
            ...cam,
            detections: [
              { id: 'd1', type: 'success', x: 10, y: 30, width: 20, height: 40, label: 'Ketchup (Stocked)' },
              { id: 'd2', type: 'success', x: 35, y: 30, width: 20, height: 40, label: 'Mustard (Stocked)', isPulsing: false },
              { id: 'd3', type: 'success', x: 60, y: 30, width: 30, height: 40, label: 'Mayo (Stocked)' }
            ]
          };
        }
        return cam;
      }));
    }
  };

  return (
    <div className="app-wrapper">
      <div className="dev-banner">
        🚧 This application is currently in development. Features shown are simulated for demo purposes.
      </div>
      <header className="global-navbar glass-panel">
        <div className="global-navbar-brand">
          <a href="https://skunchoor.github.io" className="breadcrumb-link" title="Back to AI Playground">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            <span className="breadcrumb-text">AI Playground</span>
          </a>
          <span className="breadcrumb-separator">/</span>
          <div className="breadcrumb-current">
            <img src="/retail-lens/favicon.svg" alt="Logo" width="20" height="20" />
            <span>Retail-Lens</span>
          </div>
        </div>

        <div className="topbar-actions">
          <button 
            className="icon-btn" 
            onClick={() => setShowMobileApp(!showMobileApp)}
            title="Toggle Staff Mobile App"
            style={{ background: showMobileApp ? 'rgba(255,255,255,0.1)' : 'transparent', color: showMobileApp ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)' }}
          >
            <Smartphone size={20} />
          </button>
          <button className="icon-btn" style={{ background: 'transparent', color: 'var(--color-text-secondary)' }}>
            <Bell size={20} />
          </button>
          <div className="user-profile">
            <div className="user-avatar">SM</div>
            <span>Store Manager</span>
          </div>
        </div>
      </header>

      <div className="app-container">
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <nav className="sidebar-nav">
            <button 
              className="nav-item sidebar-toggle"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title="Toggle Sidebar"
            >
              <Menu size={20} />
              {!isSidebarCollapsed && <span>Collapse</span>}
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              title="Command Center"
            >
              <LayoutDashboard size={20} />
              {!isSidebarCollapsed && <span>Command Center</span>}
            </button>
            <button 
              className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
              title="Inventory"
            >
              <Package size={20} />
              {!isSidebarCollapsed && <span>Inventory</span>}
            </button>
            <button 
              className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
              title="Analytics"
            >
              <BarChart3 size={20} />
              {!isSidebarCollapsed && <span>Analytics</span>}
            </button>
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
              title="Settings"
            >
              <Settings size={20} />
              {!isSidebarCollapsed && <span>Settings</span>}
            </button>
          </nav>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <h1 className="topbar-title">
              {activeTab === 'dashboard' && 'Smart Store Command Center'}
              {activeTab === 'inventory' && 'Inventory Management'}
              {activeTab === 'analytics' && 'Store Analytics'}
              {activeTab === 'settings' && 'System Settings'}
            </h1>
          </header>

          <div className="page-container">
            {activeTab === 'dashboard' && <CommandCenter cameras={cameras} events={events} tasks={tasks} onAssignTask={handleAssignTask} showPlanogram={showPlanogram} />}
            {activeTab === 'inventory' && <Inventory />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'settings' && <SystemSettings showPlanogram={showPlanogram} setShowPlanogram={setShowPlanogram} />}
          </div>
        </main>
        
        {/* Floating Mobile UI for Staff */}
        {showMobileApp && (
          <StaffMobileApp assignedTasks={assignedTasks} onCompleteTask={handleCompleteTask} />
        )}
      </div>
    </div>
  );
}

export default App;
