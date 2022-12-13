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
import {
  selectConversation,
  selectFriend,
  selectUserProfile,
  updateListConversation,
} from 'src/store/userSlice';
import { IConversation } from 'src/models';
import { getListConversation } from 'src/services/userService';
import { ESocketEvent } from 'src/models/socket';
import { useTranslation } from 'react-i18next';

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
        // subscribe all conversation

        socket.emit(ESocketEvent.SUBSCRIBE, {
          conversationId: conversation.id,
          userId: userProfileStore.id,
        });

        // get participants of all conversation -> do after
      });
    };

    const handleGetListConversation = async () => {
      try {
        const result = await getListConversation(t);
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
