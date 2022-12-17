import React, { useRef, useEffect, useContext } from 'react';
import { SocketContext } from 'src/context/socket/context';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectUserProfile } from 'src/store/userSlice';
import MessagesTable from '@modules/MessagesTable/MessagesTable';
import ChatDayTitle from '@modules/ChatDayTitle/ChatDayTitle';
import { ESocketEvent } from 'src/models/socket';
import {
  selectMessages,
  updateListMessage,
  selectConversation,
} from 'src/store/conversationSlice';

import './ChatMain.scss';

const ChatMain: React.FC = () => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const useProfileStore = useAppSelector(selectUserProfile);
  const { listMessage } = useAppSelector(selectMessages);
  const { selectedConversation } = useAppSelector(selectConversation);
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [listMessage]);
  useEffect(() => {
    socket.on(ESocketEvent.GET_MESSAGE, ({ user, message }) => {
      if (message.conversation === selectedConversation?.id) {
        const newMessage = { ...message, sender: user };
        dispatch(updateListMessage(newMessage));
      }
    });

    return () => {
      socket.removeListener('GET_MESSAGE');
    };
  }, [selectedConversation]);
  return (
    <div className="chatmain">
      <ChatDayTitle day="Today" />
      {listMessage.map((message) => {
        if (!useProfileStore) return null;
        if (message.sender.id === useProfileStore.id) {
          return (
            <div key={message.id} ref={scrollRef}>
              <MessagesTable
                sender={message.sender}
                position="right"
                time={message.createdAt}
                messages={message.message}
              />
            </div>
          );
        }
        return (
          <div key={message.id} ref={scrollRef}>
            <MessagesTable
              sender={message.sender}
              position="left"
              time={message.createdAt}
              messages={message.message}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChatMain;
