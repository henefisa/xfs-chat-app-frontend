import * as React from 'react';
import clsx from 'clsx';
import { useState } from 'react';
import ChatBottom from '../ChatBottom/ChatBottom';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatMain from '../ChatMain/ChatMain';
import UserInfoChat from '../UserInfoChat/UserInfoChat';

import './ChatUI.scss';

const ChatUI = () => {
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [messages, setMessages] = useState(['']);

  return (
    <div className="chat-ui">
      <div
        className={clsx('chat-ui__main ', {
          [`chat-ui__main--active`]: isUserProfileOpen,
        })}
      >
        <ChatHeader setOpen={setIsUserProfileOpen} />
        <ChatMain messages={messages} />
        <ChatBottom setMessagesUser={setMessages} />
      </div>
      {isUserProfileOpen && (
        <div className="chat-ui__profile">
          <UserInfoChat setClose={setIsUserProfileOpen} />
        </div>
      )}
    </div>
  );
};

export default ChatUI;
