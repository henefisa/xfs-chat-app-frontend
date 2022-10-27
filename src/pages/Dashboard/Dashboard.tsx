import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import { notification } from 'antd';
import * as React from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLogin } from 'src/store/loginLogoutSlice';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const loginStore = useSelector(selectLogin);
  const navigate = useNavigate();

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let notifyTimeoutId: NodeJS.Timeout;

    if (!(loginStore.currentAccessToken && loginStore.isLoggedIn)) {
      notifyTimeoutId = setTimeout(() => {
        notification.warning({
          message: 'Warning',
          description: 'Xin hãy đăng nhập!',
          duration: 2,
        });
      }, 0);

      timeoutId = setTimeout(() => {
        navigate('/login');
      }, 1500);
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(notifyTimeoutId);
    };
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
