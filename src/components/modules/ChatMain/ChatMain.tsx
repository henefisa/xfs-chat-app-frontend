import React from 'react';
import { SocketContext } from 'src/context/socket/contextSocket';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import ChatDayTitle from '@modules/ChatDayTitle/ChatDayTitle';
import { ESocketEvent } from 'src/models/socket';
import {
  selectMessages,
  updateListMessage,
  selectConversation,
} from 'src/store/conversationSlice';
import ListMessage from './ListMessage';

import './ChatMain.scss';

const ChatMain: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { listMessage } = useAppSelector(selectMessages);
  const { selectedConversation } = useAppSelector(selectConversation);
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [listMessage]);
  React.useEffect(() => {
    socket.off(ESocketEvent.GET_MESSAGE);
    socket.on(ESocketEvent.GET_MESSAGE, ({ user, message }) => {
      if (message.conversation === selectedConversation?.id) {
        const newMessage = { ...message, sender: user };
        dispatch(updateListMessage(newMessage));
      }
    });
  });

  return (
    <div className="chatmain">
      <ChatDayTitle day="Today" />
      <ListMessage listMessage={listMessage} />
    </div>
  );
};

export default ChatMain;
