import { useState } from 'react';
import { LayoutDashboard, Camera, Package, Settings, Bell } from 'lucide-react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="app-wrapper">
      {/* Development Banner */}
      <div className="dev-banner">
        🚧 This application is currently in development. Features shown are simulated for demo purposes.
      </div>
      {/* Global Top Navbar */}
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
      </header>

      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
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
          <header className="topbar">
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
    </div>
  );
}

export default App;
