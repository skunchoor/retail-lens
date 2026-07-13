import { useState } from 'react';
import { LayoutDashboard, Camera, Package, Settings, Bell } from 'lucide-react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Camera className="logo-icon" size={28} />
          Retail-Lens
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <Camera size={20} />
            Aisle Scan
          </button>
          <button 
            className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={20} />
            Inventory
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar glass-panel" style={{ border: 'none', borderBottom: '1px solid var(--color-surface-border)', borderRadius: 0 }}>
          <h1 className="topbar-title">
            {activeTab === 'dashboard' && 'Store Overview'}
            {activeTab === 'upload' && 'Manual Aisle Scan'}
            {activeTab === 'inventory' && 'Inventory Management'}
            {activeTab === 'settings' && 'System Settings'}
          </h1>
          <div className="topbar-actions">
            <button className="icon-btn" style={{ background: 'transparent', color: 'var(--color-text-secondary)' }}>
              <Bell size={20} />
            </button>
            <div className="user-profile">
              <div className="user-avatar">SM</div>
              <span>Store Manager</span>
            </div>
          </div>
        </header>

        <div className="page-container">
          <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </main>
    </div>
  );
}

export default App;
