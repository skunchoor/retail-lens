import React from 'react';
import './CameraFeed.css';

export default function CameraFeed({ name, location, imageUrl, detections, showPlanogram }) {
  return (
    <div className="camera-feed glass-panel">
      <div className="camera-header">
        <div className="camera-info">
          <span className="live-indicator"></span>
          <span className="camera-name">{name}</span>
        </div>
        <span className="camera-location">{location}</span>
      </div>
      <div className="camera-view">
        <img src={imageUrl} alt={name} className="camera-image" />
        <div className="detections-overlay">
          {showPlanogram && detections.map((det) => (
            <div
              key={`plano-${det.id}`}
              className="planogram-box"
              style={{
                left: `${det.x - 1}%`,
                top: `${det.y - 2}%`,
                width: `${det.width + 2}%`,
                height: `${det.height + 4}%`,
              }}
            >
              <div className="planogram-label">Planogram Match</div>
            </div>
          ))}
          
          {detections.map((det) => (
            <div
              key={det.id}
              className={`bounding-box type-${det.type} ${det.isPulsing ? 'pulse' : ''}`}
              style={{
                left: `${det.x}%`,
                top: `${det.y}%`,
                width: `${det.width}%`,
                height: `${det.height}%`,
              }}
            >
              {det.label && (
                <div className="box-label">
                  {det.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
