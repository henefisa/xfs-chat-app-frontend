import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile } from 'src/services/userService';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    getUserProfile(dispatch);
  }, []);

  return (
    <div className="dashboard-page">
      <NavDashboard />
      <SidebarDashboard />
      <ChatUI />
    </div>
  );
};

export default Dashboard;
