import React from 'react';
import './StoreLayout.css';

const ZONES = [
  { id: 'Aisle 1', label: 'Aisle 1 (Beverages)', type: 'aisle' },
  { id: 'Aisle 2', label: 'Aisle 2 (Snacks)', type: 'aisle' },
  { id: 'Aisle 3', label: 'Aisle 3 (Household)', type: 'aisle' },
  { id: 'Aisle 4', label: 'Aisle 4 (Condiments)', type: 'aisle' },
  { id: 'Produce', label: 'Fresh Produce', type: 'specialty' },
  { id: 'Promo Endcap', label: 'Promo Endcap', type: 'promo' },
];

export default function StoreLayout({ selectedZone, onSelectZone, zoneHealth }) {
  const getHealthClass = (zoneId) => {
    const health = zoneHealth[zoneId];
    if (!health) return 'health-unknown';
    return `health-${health.status}`;
  };

  return (
    <div className="store-layout-container">
      <div className="layout-header">
        <h3>Interactive Store Map</h3>
        <button 
          className={`btn-clear ${selectedZone === 'All' ? 'active' : ''}`}
          onClick={() => onSelectZone('All')}
        >
          View All Inventory
        </button>
      </div>
      
      <div className="map-legend">
        <span className="legend-item"><div className="legend-box health-in_stock"></div> Healthy</span>
        <span className="legend-item"><div className="legend-box health-low_stock"></div> Low Stock</span>
        <span className="legend-item"><div className="legend-box health-out_of_stock"></div> Action Required</span>
      </div>

      <div className="store-map">
        <div className="map-grid">
          {ZONES.map(zone => (
            <div 
              key={zone.id}
              className={`map-zone zone-${zone.type} ${getHealthClass(zone.id)} ${selectedZone === zone.id ? 'selected' : ''}`}
              onClick={() => onSelectZone(zone.id)}
            >
              <span className="zone-label">{zone.label}</span>
              {zoneHealth[zone.id] && zoneHealth[zone.id].status === 'out_of_stock' && (
                <div className="alert-ping"></div>
              )}
            </div>
          ))}
          
          <div className="map-zone zone-backroom" onClick={() => onSelectZone('Backroom')}>
            <span className="zone-label">Backroom Storage</span>
          </div>
          
          <div className="map-entrance">Entrance</div>
        </div>
      </div>
    </div>
  );
}
