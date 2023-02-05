import React, { useEffect } from 'react';
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
import { IMessage } from 'src/models';

import './ChatMain.scss';

const ChatMain: React.FC = () => {
  const socket = React.useContext(SocketContext);
  const dispatch = useAppDispatch();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { listMessage } = useAppSelector(selectMessages);

  const { selectedConversation } = useAppSelector(selectConversation);
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [listMessage]);

  function pushNewMessage(listMessage: IMessage[], newMessage: IMessage) {
    const newListMessage = [...listMessage];

    if (!listMessage.length) {
      newListMessage.push(newMessage);
      return newListMessage;
    }

    const lastListMessage = newListMessage[newListMessage.length - 1];

    const isUpdateOwnMessage =
      lastListMessage.sender.id === newMessage.sender.id;

    if (isUpdateOwnMessage) {
      newListMessage[newListMessage.length - 1] = Object.assign(
        {},
        lastListMessage,
        {
          isLastOne: false,
        }
      );
    }

    newListMessage.push(newMessage);
    return newListMessage;
  }

  React.useEffect(() => {
    socket.off(ESocketEvent.GET_MESSAGE);
    socket.on(ESocketEvent.GET_MESSAGE, ({ user, message }) => {
      if (message.conversation === selectedConversation?.id) {
        const newMessage = {
          ...message,
          sender: user,
          isLastOne: true,
        };
        const newListMessage = pushNewMessage(listMessage, newMessage);
        dispatch(updateListMessage(newListMessage));
      }
    });
  }, [listMessage]);

  return (
    <div className="chatmain">
      <ChatDayTitle day="Today" />
      <ListMessage listMessage={listMessage} />
    </div>
  );
};

export default ChatMain;
