import ChatOverlay from '@modules/ChatOverlay/ChatOverlay';
import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import SidebarSettings from '@modules/SidebarSettings/SidebarSettings';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SocketContext } from 'src/context/socket/context';
import ENavbar from 'src/interfaces/ENavbar';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectNavBar } from 'src/store/navbarSlice';
import { IConversation } from 'src/models';
import { getListConversation } from 'src/services/userService';
import {
  selectConversation,
  selectFriend,
  selectUserProfile,
  updateListConversation,
} from 'src/store/userSlice';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const { selectedFriend } = useAppSelector(selectFriend);
  const { selectedConversation } = useAppSelector(selectConversation);
  const userProfileStore = useAppSelector(selectUserProfile);

  const navbarAction = useAppSelector(selectNavBar);

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
    if (!userProfileStore) return;

    const handleSubscribeAllConversation = (list: IConversation[]) => {
      if (list.length === 0 || !userProfileStore) return;

      list.forEach((conversation) => {
        // subscribe all conversation

        socket.emit(
          'SUBSCRIBE',
          {
            conversationId: conversation.id,
            userId: userProfileStore.id,
          },
          () => {
            // do something
          }
        );
      });
    };

    const handleGetListConversation = async () => {
      try {
        const result = await getListConversation({}, t);

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
      {navbarAction === ENavbar.SETTINGS ? (
        <SidebarSettings />
      ) : (
        <>
          <SidebarDashboard />
          {selectedConversation ?? selectedFriend ? (
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
