import React from 'react';
import { TrendingUp, Clock, CheckCircle2, AlertTriangle, Users } from 'lucide-react';
import './Analytics.css';

export default function Analytics() {
  return (
    <div className="analytics-container">
      <div className="kpi-grid">
        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <span className="kpi-title">Avg Task Resolution</span>
            <Clock size={20} className="text-accent-secondary" />
          </div>
          <div className="kpi-value">4m 12s</div>
          <div className="kpi-trend positive">
            <TrendingUp size={16} />
            <span>12% faster this week</span>
          </div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <span className="kpi-title">Planogram Compliance</span>
            <CheckCircle2 size={20} className="text-success" />
          </div>
          <div className="kpi-value">94.2%</div>
          <div className="kpi-trend positive">
            <TrendingUp size={16} />
            <span>2.1% improvement</span>
          </div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <span className="kpi-title">Critical Stockouts</span>
            <AlertTriangle size={20} className="text-danger" />
          </div>
          <div className="kpi-value">12</div>
          <div className="kpi-trend negative">
            <TrendingUp size={16} style={{ transform: 'scaleY(-1)' }} />
            <span>3 more than yesterday</span>
          </div>
        </div>

        <div className="kpi-card glass-panel">
          <div className="kpi-header">
            <span className="kpi-title">Active Staff</span>
            <Users size={20} className="text-accent-primary" />
          </div>
          <div className="kpi-value">8</div>
          <div className="kpi-trend neutral">
            <span>On shift currently</span>
          </div>
        </div>
      </div>

      <div className="analytics-main-grid">
        <div className="glass-panel heatmap-panel">
          <h3>Store Heatmap: High Incident Areas</h3>
          <p className="text-muted">Aisles with the most out-of-stock and misplaced item alerts this week.</p>
          
          <div className="heatmap-grid">
            {/* Using a simple CSS grid block layout to simulate a heatmap */}
            <div className="heat-zone heat-low">Aisle 1 (Beverages)</div>
            <div className="heat-zone heat-med">Aisle 2 (Snacks)</div>
            <div className="heat-zone heat-low">Aisle 3 (Cereal)</div>
            <div className="heat-zone heat-high">Aisle 4 (Condiments)</div>
            <div className="heat-zone heat-med">Aisle 5 (Baking)</div>
            <div className="heat-zone heat-low">Aisle 6 (Pasta)</div>
            <div className="heat-zone heat-critical">Promo Endcap (Front)</div>
            <div className="heat-zone heat-low">Produce (Fresh)</div>
            <div className="heat-zone heat-low">Dairy (Back)</div>
          </div>
          
          <div className="heatmap-legend">
            <span>Low Incidents</span>
            <div className="gradient-bar"></div>
            <span>High Incidents</span>
          </div>
        </div>
        
        <div className="glass-panel chart-panel">
          <h3>Alert Types Breakdown</h3>
          <div className="bar-chart">
            <div className="bar-row">
              <div className="bar-label">Out of Stock</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '65%', background: 'var(--color-accent-danger)' }}></div>
              </div>
              <div className="bar-value">65%</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Misplaced Item</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '20%', background: 'var(--color-accent-warning)' }}></div>
              </div>
              <div className="bar-value">20%</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Price Mismatch</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '10%', background: 'var(--color-accent-secondary)' }}></div>
              </div>
              <div className="bar-value">10%</div>
            </div>
            <div className="bar-row">
              <div className="bar-label">Spill / Hazard</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: '5%', background: '#a1a1aa' }}></div>
              </div>
              <div className="bar-value">5%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
