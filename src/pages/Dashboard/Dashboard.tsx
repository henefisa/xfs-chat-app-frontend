import * as React from 'react';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import ChatUI from '@modules/ChatUI/ChatUI';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <NavDashboard />
      <SidebarDashboard />
      <ChatUI />
    </div>
  );
};

export default Dashboard;
