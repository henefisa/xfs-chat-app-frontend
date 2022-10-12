import * as React from 'react';
import NavDashboard from '@modules/NavDashboard/NavDashboard';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <NavDashboard />
      <div className="side-bar">Sidebar</div>
      <div className="chat-ui">Chat UI</div>
    </div>
  );
};

export default Dashboard;
