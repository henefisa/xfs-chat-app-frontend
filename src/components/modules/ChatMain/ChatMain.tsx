import React, { useContext, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SocketContext } from 'src/context/socket/context';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import {
  selectMessages,
  selectUserProfile,
  updateListMessage,
} from 'src/store/userSlice';

import ChatDayTitle from '../ChatDayTitle/ChatDayTitle';
import MessagesTable from '../MessagesTable/MessagesTable';

import './ChatMain.scss';
import { ESocketEvent } from 'src/models/socket';

interface IChatMain {
  messages: string[];
}

const ChatMain: React.FC<IChatMain> = ({ messages }) => {
  const socket = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const useProfileStore = useAppSelector(selectUserProfile);
  const { listMessage } = useAppSelector(selectMessages);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages, listMessage]);

  useEffect(() => {
    socket.on(ESocketEvent.GET_MESSAGE, ({ user, message }) => {
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
  }, []);

  return (
    <div className="chatmain">
      <ChatDayTitle day="Today" />
      {listMessage.map((messageObj) => {
        if (!useProfileStore) return null;

        if (messageObj.sender.id === useProfileStore.id) {
          return (
            <div key={messageObj.id} ref={scrollRef}>
              <MessagesTable
                sender={messageObj.sender}
                position="right"
                time={messageObj.createdAt}
                messages={messageObj.message}
              />
            </div>
          );
        }

        return (
          <div key={messageObj.id} ref={scrollRef}>
            <MessagesTable
              sender={messageObj.sender}
              position="left"
              time={messageObj.createdAt}
              messages={messageObj.message}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChatMain;
