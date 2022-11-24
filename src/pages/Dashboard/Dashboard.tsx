import ChatOverlay from '@modules/ChatOverlay/ChatOverlay';
import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import * as React from 'react';
import SidebarSettings from 'src/components/modules/SidebarSettings/SidebarSettings';
import { SocketContext } from 'src/context/socket/context';
import ENavbar from 'src/interfaces/ENavbar';
import { useAppSelector } from 'src/store/hooks';
import { selectNavBar } from 'src/store/navbarSlice';
import EditProfile from '../EditProfile/EditProfile';
import { selectFriend } from 'src/store/friendSlice';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const navbarAction = useAppSelector(selectNavBar);

  const friendSelected = useAppSelector(selectFriend);

  React.useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    return () => {
      socket.close();
      socket.removeAllListeners();
    };
  }, []);

  return (
    <div className="dashboard-page">
      <NavDashboard />
      {navbarAction === ENavbar.SETTINGS ? (
        <SidebarSettings />
      ) : (
        <>
          <SidebarDashboard />
          <ChatUI />
        </>
      )}
      {friendSelected?.id ? <ChatUI /> : <ChatOverlay />}
    </div>
  );
};

export default Dashboard;
