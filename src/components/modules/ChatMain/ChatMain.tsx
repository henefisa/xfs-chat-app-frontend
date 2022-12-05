import React, { useRef, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SocketContext } from 'src/context/socket/context';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectMessages,
  selectUserProfile,
  updateListMessage,
} from 'src/store/userSlice';
import MessagesTable from '../MessagesTable/MessagesTable';
import ChatDayTitle from '../ChatDayTitle/ChatDayTitle';
import { ESocketEvent } from 'src/models/socket';

import './ChatMain.scss';

const ChatMain: React.FC = () => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const useProfileStore = useAppSelector(selectUserProfile);
  const { listMessage } = useAppSelector(selectMessages);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [listMessage]);

  useEffect(() => {
    socket.on(ESocketEvent.GET_MESSAGE, ({ user, message }) => {
      // do something
      dispatch(
        updateListMessage({
          id: uuidv4(),
          updatedAt: new Date().toString(),
          createdAt: new Date().toString(),
          attachment: null,
          isPin: false,
          isTick: false,
          message: message,
          sender: user,
        })
      );
    });

    return () => {
      socket.removeListener('GET_MESSAGE');
    };
  }, []);
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
