import { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, PackageX, CheckCircle, UploadCloud, Video, ChevronRight } from 'lucide-react';
import './Dashboard.css';

const initialMetrics = {
  outOfStock: 12,
  priceDiscrepancies: 5,
  complianceScore: 92,
  itemsScanned: 1420
};

export default function Dashboard({ activeTab, setActiveTab }) {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [recentAnomalies, setRecentAnomalies] = useState([
    { id: 1, product: 'Organic Almond Milk 1L', issue: 'Out of Stock', aisle: 'A3', priority: 'High' },
    { id: 2, product: 'Whole Wheat Bread', issue: 'Price Mismatch ($3.49 vs $3.99)', aisle: 'B2', priority: 'Medium' }
  ]);

  const handleSimulateUpload = () => {
    setIsProcessing(true);
    // Simulate AI processing video of aisle
    setTimeout(() => {
      setIsProcessing(false);
      setUploadComplete(true);
      // Update metrics based on new scan
      setMetrics(prev => ({
        ...prev,
        outOfStock: prev.outOfStock + 3,
        itemsScanned: prev.itemsScanned + 350
      }));
      // Add new anomalies
      setRecentAnomalies(prev => [
        { id: 3, product: 'Sparkling Water 12-pack', issue: 'Out of Stock', aisle: 'C4', priority: 'High' },
        { id: 4, product: 'Cheddar Cheese Block', issue: 'Misplaced Item', aisle: 'D1', priority: 'Low' },
        ...prev
      ]);
    }, 3000);
  };

  if (activeTab === 'upload') {
    return (
      <div className="upload-container glass-panel">
        {!isProcessing && !uploadComplete && (
          <>
            <div className="upload-dropzone" onClick={handleSimulateUpload}>
              <UploadCloud size={64} className="upload-icon" />
              <div>
                <h3 className="upload-title">Upload Aisle Scan Video</h3>
                <p className="upload-subtitle">Drag and drop your MP4/MOV file here, or click to browse.</p>
              </div>
            </div>
            <p className="text-muted" style={{ color: 'var(--color-text-muted)' }}>
              For this demo, clicking the box will simulate a video upload and AI processing.
            </p>
          </>
        )}

        {isProcessing && (
          <div className="processing-state">
            <div className="spinner"></div>
            <h3>Azure AI Vision Processing...</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Analyzing planogram compliance and detecting inventory anomalies.</p>
          </div>
        )}

        {uploadComplete && (
          <div className="processing-state" style={{ padding: '40px' }}>
            <CheckCircle size={64} color="var(--color-accent-success)" />
            <h3>Scan Complete!</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>Processed 350 items in Aisle C4 & D1.</p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <button className="btn-primary" onClick={() => setActiveTab('dashboard')}>
                View Updated Dashboard
              </button>
              <button 
                className="btn-primary" 
                style={{ background: 'transparent', border: '1px solid var(--color-surface-border)' }}
                onClick={() => setUploadComplete(false)}
              >
                Scan Another Aisle
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default 'dashboard' view
  return (
    <>
      <div className="dashboard-grid">
        <div className="metric-card danger glass-panel">
          <div className="metric-header">
            <span>Out of Stock Items</span>
            <PackageX size={20} color="var(--color-accent-danger)" />
          </div>
          <div className="metric-value">{metrics.outOfStock}</div>
          <div className="metric-trend up">
            <TrendingUp size={16} />
            <span>+3 from yesterday</span>
          </div>
        </div>

        <div className="metric-card warning glass-panel">
          <div className="metric-header">
            <span>Price Discrepancies</span>
            <AlertTriangle size={20} color="var(--color-accent-warning)" />
          </div>
          <div className="metric-value">{metrics.priceDiscrepancies}</div>
          <div className="metric-trend down">
            <TrendingDown size={16} />
            <span>-2 from yesterday</span>
          </div>
        </div>

        <div className="metric-card success glass-panel">
          <div className="metric-header">
            <span>Planogram Compliance</span>
            <CheckCircle size={20} color="var(--color-accent-success)" />
          </div>
          <div className="metric-value">{metrics.complianceScore}%</div>
          <div className="metric-trend up" style={{ color: 'var(--color-accent-success)' }}>
            <TrendingUp size={16} />
            <span>+1.2%</span>
          </div>
        </div>

        <div className="metric-card primary glass-panel">
          <div className="metric-header">
            <span>Items Scanned Today</span>
            <Video size={20} color="var(--color-accent-primary)" />
          </div>
          <div className="metric-value">{metrics.itemsScanned}</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Action Required: Recent Anomalies</h2>
          <button style={{ color: 'var(--color-accent-primary)', background: 'transparent', display: 'flex', alignItems: 'center' }}>
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="results-list">
          {recentAnomalies.map(anomaly => (
            <div key={anomaly.id} className={`result-item ${anomaly.issue === 'Out of Stock' ? 'out-of-stock' : ''}`}>
              <div>
                <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>{anomaly.product}</h4>
                <div style={{ display: 'flex', gap: '16px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                  <span><strong style={{ color: 'var(--color-text-primary)' }}>Issue:</strong> {anomaly.issue}</span>
                  <span><strong style={{ color: 'var(--color-text-primary)' }}>Aisle:</strong> {anomaly.aisle}</span>
                </div>
              </div>
              <div>
                <span style={{ 
                  padding: '4px 12px', 
                  borderRadius: '12px', 
                  fontSize: '12px', 
                  fontWeight: '600',
                  background: anomaly.priority === 'High' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  color: anomaly.priority === 'High' ? 'var(--color-accent-danger)' : 'var(--color-accent-warning)'
                }}>
                  {anomaly.priority} Priority
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
