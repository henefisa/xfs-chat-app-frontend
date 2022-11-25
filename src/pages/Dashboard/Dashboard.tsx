import ChatOverlay from '@modules/ChatOverlay/ChatOverlay';
import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SocketContext } from 'src/context/socket/context';
import { getListConversation } from 'src/services/userService';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectFriend, updateListConversation } from 'src/store/userSlice';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const { selectedFriend } = useAppSelector(selectFriend);

  React.useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('socket connected');
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });

    return () => {
      socket.close();
      socket.removeAllListeners();
    };
  }, []);

  React.useEffect(() => {
    const handleGetListConversation = async () => {
      try {
        const result = await getListConversation({}, t);
        dispatch(updateListConversation(result.conversations));
      } catch (err) {
        dispatch(updateListConversation([]));
      }
    };

    handleGetListConversation();
  }, []);

  return (
    <div className="dashboard-page">
      <NavDashboard />
      <SidebarDashboard />

      {selectedFriend?.id ? <ChatUI /> : <ChatOverlay />}
    </div>
  );
};

export default Dashboard;
