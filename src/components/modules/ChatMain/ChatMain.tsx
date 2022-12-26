import React from 'react';
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
import { IMessages } from 'src/models';

import './ChatMain.scss';

const ChatMain: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const useProfileStore = useAppSelector(selectUserProfile);
  const { listMessage } = useAppSelector(selectMessages);
  const { selectedConversation } = useAppSelector(selectConversation);
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [listMessage]);
  React.useEffect(() => {
    socket.on(ESocketEvent.GET_MESSAGE, ({ user, message }) => {
      if (message.conversation === selectedConversation?.id) {
        const newMessage = { ...message, sender: user };
        dispatch(updateListMessage(newMessage));
      }
    });
  }, [listMessage]);

  const renderMessages = React.useCallback(
    (message: IMessages, position: string) => {
      return (
        <div key={message.id} ref={scrollRef}>
          <MessagesTable
            sender={message.sender}
            position={position}
            time={message.createdAt}
            messages={message.message}
          />
        </div>
      );
    },
    [listMessage]
  );
  const renderListMessages = React.useCallback(() => {
    {
      return (
        <>
          {listMessage.map((message) => {
            if (!useProfileStore) return null;
            if (message.sender.id === useProfileStore.id) {
              return renderMessages(message, 'right');
            }
            return renderMessages(message, 'left');
          })}
        </>
      );
    }
  }, [listMessage]);
  return (
    <div className="chatmain">
      <ChatDayTitle day="Today" />
      <>{renderListMessages()}</>
    </div>
  );
};

export default ChatMain;
