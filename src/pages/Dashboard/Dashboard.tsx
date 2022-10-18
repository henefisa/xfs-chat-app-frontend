import * as React from 'react';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <NavDashboard />
      <SidebarDashboard />
      <div className="chat-ui">Chat UI</div>
    </div>
  );
};

export default Dashboard;
