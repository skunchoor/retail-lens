import React from 'react';
import { Package, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import './InventoryTable.css';

export default function InventoryTable({ inventory, selectedZone }) {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'in_stock': return <CheckCircle2 size={16} className="text-success" />;
      case 'low_stock': return <AlertTriangle size={16} className="text-warning" />;
      case 'out_of_stock': return <AlertCircle size={16} className="text-danger" />;
      default: return null;
    }
  };

  const getStatusText = (status) => {
    return status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="inventory-table-container">
      <div className="table-header">
        <h3>
          {selectedZone === 'All' ? 'All Inventory' : `${selectedZone} Inventory`}
        </h3>
        <span className="item-count">{inventory.length} Items Found</span>
      </div>
      
      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Location</th>
              <th className="number-col">Aisle Stock</th>
              <th className="number-col">Storage Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-state-cell">
                  <Package size={48} className="empty-icon" />
                  <p>No items found for this zone.</p>
                </td>
              </tr>
            ) : (
              inventory.map(item => (
                <tr key={item.id} className={`status-row-${item.status}`}>
                  <td className="product-name">{item.name}</td>
                  <td className="sku-cell">{item.sku}</td>
                  <td><span className="location-badge">{item.location}</span></td>
                  <td className={`number-col ${item.aisleStock === 0 ? 'stock-zero' : ''}`}>
                    {item.aisleStock}
                  </td>
                  <td className="number-col">
                    {item.storageStock}
                  </td>
                  <td>
                    <div className="status-cell">
                      {getStatusIcon(item.status)}
                      <span>{getStatusText(item.status)}</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
