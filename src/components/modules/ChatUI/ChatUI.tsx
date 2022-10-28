import React, { useState } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatBottom from '../ChatBottom/ChatBottom';
import ChatMain from '../ChatMain/ChatMain';
import UserInfoChat from '../UserInfoChat/UserInfoChat';

import './ChatUI.scss';


const ChatUI = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='chat-ui'>
      <div className={`chat-ui-main chat-ui-main--${open}`}>
        <ChatHeader setOpen={setOpen}/>
        <ChatMain />
        <ChatBottom />
      </div>
      {open &&
        <div className="chat-ui-profile">
          <UserInfoChat setClose={setOpen}/>
        </div>
      }

    </div>
  );
};

export default ChatUI;
