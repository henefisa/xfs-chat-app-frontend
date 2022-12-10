import * as React from 'react';
import clsx from 'clsx';
import { useState } from 'react';
import ChatBottom from '@modules/ChatBottom/ChatBottom';
import ChatHeader from '@modules/ChatHeader/ChatHeader';
import ChatMain from '@modules/ChatMain/ChatMain';
import UserInfoChat from '@modules/UserInfoChat/UserInfoChat';

import './ChatUI.scss';

const ChatUI = () => {
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  return (
    <div className="chat-ui">
      <div
        className={clsx('chat-ui__main ', {
          [`chat-ui__main--active`]: isUserProfileOpen,
        })}
      >
        <ChatHeader setOpen={setIsUserProfileOpen} />
        <ChatMain />
        <ChatBottom />
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
