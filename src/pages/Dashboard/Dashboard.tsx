import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import { notification } from 'antd';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from 'src/services/getUserProfileService';
import { selectLoginStore } from 'src/store/authSlice';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const loginStore = useSelector(selectLoginStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    } else {
      getUserProfile(dispatch, navigate);
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
