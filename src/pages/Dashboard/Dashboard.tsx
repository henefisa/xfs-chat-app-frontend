import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import { notification } from 'antd';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile } from 'src/services/userService';
import getAccessTokenFromStorage from 'src/utils/getAccessToken';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const accessToken = getAccessTokenFromStorage();

  React.useEffect(() => {
    if (!accessToken) {
      notification.warning({
        message: 'Warning',
        description: 'Xin hãy đăng nhập!',
        duration: 1.5,
      });
    } else {
      getUserProfile(dispatch);
    }
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
