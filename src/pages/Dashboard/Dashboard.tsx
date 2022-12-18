import ChatOverlay from '@modules/ChatOverlay/ChatOverlay';
import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import * as React from 'react';
import SidebarSettings from '@modules/SidebarSettings/SidebarSettings';
import { SocketContext } from 'src/context/socket/context';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectNavBar } from 'src/store/navbarSlice';
import ENavbar from 'src/interfaces/ENavbar';
import { selectFriend, selectUserProfile } from 'src/store/userSlice';
import {
  selectConversation,
  updateListConversation,
} from 'src/store/conversationSlice';
import { IConversation } from 'src/models';
import { getConversation } from 'src/services/conversationService';
import { ESocketEvent } from 'src/models/socket';
import { useTranslation } from 'react-i18next';
import Notification from '@modules/Notification/Notification';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const { t } = useTranslation('common');
  const { selectedFriend } = useAppSelector(selectFriend);
  const dispatch = useAppDispatch();

  const { selectedConversation } = useAppSelector(selectConversation);
  const userProfileStore = useAppSelector(selectUserProfile);
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

  React.useEffect(() => {
    if (!userProfileStore) return;

    const handleSubscribeAllConversation = (list: IConversation[]) => {
      if (list.length === 0 || !userProfileStore) return;

      list.forEach((conversation) => {
        socket.emit(ESocketEvent.SUBSCRIBE, {
          conversationId: conversation.id,
          userId: userProfileStore.id,
        });
      });
    };

    const handleGetListConversation = async () => {
      try {
        const result = await getConversation(t);
        dispatch(updateListConversation(result.conversations));
        handleSubscribeAllConversation(result.conversations);
      } catch (err) {
        dispatch(updateListConversation([]));
      }
    };

    handleGetListConversation();
  }, [userProfileStore]);

  return (
    <div className="dashboard-page">
      <NavDashboard />
      <Notification />
      {navbarAction === ENavbar.SETTINGS ? (
        <SidebarSettings />
      ) : (
        <>
          <SidebarDashboard />
          {selectedFriend?.id || selectedConversation?.id ? (
            <ChatUI />
          ) : (
            <ChatOverlay />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
