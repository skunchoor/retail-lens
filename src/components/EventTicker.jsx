import React from 'react';
import { Terminal } from 'lucide-react';
import './EventTicker.css';

export default function EventTicker({ events }) {
  return (
    <div className="event-ticker glass-panel">
      <div className="ticker-header">
        <Terminal size={18} className="text-accent-primary" />
        <h3>System Event Log</h3>
      </div>
      <div className="ticker-content">
        {events.length === 0 ? (
          <div className="empty-state">No recent events</div>
        ) : (
          <div className="event-list">
            {events.map((event) => (
              <div key={event.id} className={`event-item type-${event.type}`}>
                <span className="event-time">{event.time}</span>
                <span className="event-source">[{event.source}]</span>
                <span className="event-message">{event.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
