import ChatOverlay from '@modules/ChatOverlay/ChatOverlay';
import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import * as React from 'react';
import { SocketContext } from 'src/context/socket/context';
import { useAppSelector } from 'src/store/hooks';
import { selectFriend, selectParticipant } from 'src/store/userSlice';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const socket = React.useContext(SocketContext);

  const { selectedFriend } = useAppSelector(selectFriend);
  const { selectedParticipant } = useAppSelector(selectParticipant);

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
      <SidebarDashboard />

      {selectedFriend?.id || selectedParticipant?.id ? (
        <ChatUI />
      ) : (
        <ChatOverlay />
      )}
    </div>
  );
};

export default Dashboard;
