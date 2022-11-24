import ChatOverlay from '@modules/ChatOverlay/ChatOverlay';
import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import * as React from 'react';
import SidebarSettings from '@modules/SidebarSettings/SidebarSettings';
import { SocketContext } from 'src/context/socket/context';
import { selectFriend } from 'src/store/friendSlice';
import { useAppSelector } from 'src/store/hooks';
import { selectNavBar } from 'src/store/navbarSlice';

import './Dashboard.scss';
import ENavbar from 'src/interfaces/ENavbar';

const Dashboard: React.FC = () => {
  const socket = React.useContext(SocketContext);

  const friendSelected = useAppSelector(selectFriend);

  const navbarAction = useAppSelector(selectNavBar);

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
          {friendSelected?.id ? <ChatUI /> : <ChatOverlay />}
        </>
      )}
    </div>
  );
};

export default Dashboard;
