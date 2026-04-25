import React from 'react';
import { Link } from 'react-router-dom';
import { Map, BookOpen, MessageCircle } from 'lucide-react';


const Dashboard = () => {
  return (
    <div>
      <div className="page-header">
        <h2>Welcome back, Alex!</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Your accessible learning dashboard is ready. Navigate campus, access materials, and communicate with ease.
        </p>
      </div>

      <div className="quick-actions">
        <QuickActionCard
          to="/navigation"
          icon={<Map size={32} />}
          title="Campus Navigation"
          description="Get voice or text directions to any campus location."
        />
        <QuickActionCard
          to="/materials"
          icon={<BookOpen size={32} />}
          title="Study Materials"
          description="Access course materials with TTS and captioning."
        />
        <QuickActionCard
          to="/communication"
          icon={<MessageCircle size={32} />}
          title="Live Communication"
          description="Join lectures with real-time captions and messaging."
        />
      </div>
    </div>
  );
};

export default Dashboard;