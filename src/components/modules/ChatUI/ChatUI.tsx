import React, { useState } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatBottom from '../ChatBottom/ChatBottom';
import ChatMain from '../ChatMain/ChatMain';
import UserInfoChat from '../UserInfoChat/UserInfoChat';

import './ChatUI.scss';
import clsx from 'clsx';

const ChatUI = () => {
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  return (
    <div className="chat-ui">
      <div
        className={clsx(
          'chat-ui__main ',
          `chat-ui__main--${isUserProfileOpen}`
        )}
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
