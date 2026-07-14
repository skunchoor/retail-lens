import React, { useState, useMemo } from 'react';
import StoreLayout from './StoreLayout';
import InventoryTable from './InventoryTable';
import './Inventory.css';

const INITIAL_INVENTORY = [
  { id: '1', sku: 'SKU-001', name: 'Heinz Ketchup 20oz', aisleStock: 0, storageStock: 45, location: 'Aisle 4', status: 'out_of_stock' },
  { id: '2', sku: 'SKU-002', name: 'Heinz Mustard 14oz', aisleStock: 5, storageStock: 20, location: 'Aisle 4', status: 'low_stock' },
  { id: '3', sku: 'SKU-003', name: 'Doritos Family Size', aisleStock: 25, storageStock: 50, location: 'Aisle 2', status: 'in_stock' },
  { id: '4', sku: 'SKU-004', name: 'Lays Classic', aisleStock: 2, storageStock: 10, location: 'Aisle 2', status: 'low_stock' },
  { id: '5', sku: 'SKU-005', name: 'Coca Cola 12-Pack', aisleStock: 40, storageStock: 120, location: 'Aisle 1', status: 'in_stock' },
  { id: '6', sku: 'SKU-006', name: 'Sprite 12-Pack', aisleStock: 15, storageStock: 60, location: 'Aisle 1', status: 'in_stock' },
  { id: '7', sku: 'SKU-007', name: 'Gala Apples (Bag)', aisleStock: 18, storageStock: 0, location: 'Produce', status: 'in_stock' },
  { id: '8', sku: 'SKU-008', name: 'Bananas', aisleStock: 5, storageStock: 10, location: 'Produce', status: 'low_stock' },
  { id: '9', sku: 'SKU-009', name: 'Promo Energy Drink', aisleStock: 0, storageStock: 100, location: 'Promo Endcap', status: 'out_of_stock' },
  { id: '10', sku: 'SKU-010', name: 'Paper Towels 6-Roll', aisleStock: 30, storageStock: 80, location: 'Aisle 3', status: 'in_stock' },
];

export default function Inventory() {
  const [inventory] = useState(INITIAL_INVENTORY);
  const [selectedZone, setSelectedZone] = useState('All');

  const filteredInventory = useMemo(() => {
    if (selectedZone === 'All') return inventory;
    return inventory.filter(item => item.location === selectedZone);
  }, [inventory, selectedZone]);

  // Calculate zone health for the store map
  const zoneHealth = useMemo(() => {
    const health = {};
    inventory.forEach(item => {
      if (!health[item.location]) {
        health[item.location] = { status: 'in_stock', count: 0, outOfStock: 0, lowStock: 0 };
      }
      health[item.location].count++;
      if (item.status === 'out_of_stock') {
        health[item.location].outOfStock++;
        health[item.location].status = 'out_of_stock'; // highest severity
      } else if (item.status === 'low_stock' && health[item.location].status !== 'out_of_stock') {
        health[item.location].lowStock++;
        health[item.location].status = 'low_stock';
      }
    });
    return health;
  }, [inventory]);

  return (
    <div className="inventory-container">
      <div className="inventory-map-pane glass-panel">
        <StoreLayout 
          selectedZone={selectedZone} 
          onSelectZone={setSelectedZone} 
          zoneHealth={zoneHealth} 
        />
      </div>
      <div className="inventory-table-pane glass-panel">
        <InventoryTable 
          inventory={filteredInventory} 
          selectedZone={selectedZone} 
        />
      </div>
    </div>
  );
}
