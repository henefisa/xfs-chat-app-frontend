import ChatOverlay from '@modules/ChatOverlay/ChatOverlay';
import ChatUI from '@modules/ChatUI/ChatUI';
import NavDashboard from '@modules/NavDashboard/NavDashboard';
import SidebarDashboard from '@modules/SidebarDashboard/SidebarDashboard';
import { useEffect, useContext, useState, useCallback } from 'react';
import type { FC } from 'react';
import SidebarSettings from '@modules/SidebarSettings/SidebarSettings';
import { SocketContext } from 'src/context/socket/contextSocket';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectNavBar } from 'src/store/navbarSlice';
import ENavbar from 'src/interfaces/ENavbar';
import { selectFriend, selectUserProfile } from 'src/store/userSlice';
import {
  selectConversation,
  updateListConversation,
} from 'src/store/conversationSlice';
import { getConversation } from 'src/services/conversationService';
import { ESocketEvent } from 'src/models/socket';
import { useTranslation } from 'react-i18next';

import './Dashboard.scss';
import { PeerContext } from 'src/context/peer';
import type { MediaConnection, DataConnection } from 'peerjs';
import ChatCall from 'src/components/modules/ChatCall/ChatCall';

const Dashboard: FC = () => {
  const socket = useContext(SocketContext);
  const { t } = useTranslation('common');
  const { selectedFriend } = useAppSelector(selectFriend);
  const dispatch = useAppDispatch();

  const { selectedConversation, listConversation } =
    useAppSelector(selectConversation);
  const userProfileStore = useAppSelector(selectUserProfile);
  const navbarAction = useAppSelector(selectNavBar);
  const [peer] = useContext(PeerContext);
  const [receivingCall, setReceivingCall] = useState<MediaConnection>();
  const [remoteConnection, setRemoteConnection] = useState<DataConnection>();
  const [callModalOpen, setCallModalOpen] = useState(false);

  const handleClose = useCallback(() => {
    // close connection from callee
    remoteConnection?.close();
    setCallModalOpen(false);
  }, [remoteConnection]);

  useEffect(() => {
    socket.connect();
    socket.on(ESocketEvent.CONNECT, () => {
      console.log('connected');
    });

    socket.on(ESocketEvent.DISCONNECT, () => {
      console.log('disconnected');
    });

    return () => {
      socket.close();
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (!userProfileStore) return;
    if (listConversation.length === 0 || !userProfileStore) return;
    listConversation.forEach((conversation) => {
      socket.emit(ESocketEvent.SUBSCRIBE, {
        conversationId: conversation.id,
        userId: userProfileStore.id,
      });
    });
  }, [userProfileStore, listConversation]);

  useEffect(() => {
    const handleGetListConversation = async () => {
      try {
        const result = await getConversation(t);
        dispatch(updateListConversation(result.conversations));
      } catch (err) {
        dispatch(updateListConversation([]));
      }
    };

    handleGetListConversation();
  }, [dispatch, t]);

  useEffect(() => {
    // listen for connection being created from the caller
    peer?.on('connection', (con) => {
      setRemoteConnection(con);
    });

    // listen for call event coming from the caller
    peer?.on('call', (call) => {
      setReceivingCall(call);
      setCallModalOpen(true);
    });
  }, [peer]);

  useEffect(() => {
    remoteConnection?.on('close', () => {
      handleClose();
    });
  }, [handleClose, remoteConnection]);

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
      {callModalOpen && (
        <ChatCall
          isOpen={true}
          title="Call"
          receivingCall={receivingCall}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Dashboard;
