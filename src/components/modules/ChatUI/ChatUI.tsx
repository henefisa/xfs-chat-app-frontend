import React from 'react';

import ChatHeader from '../ChatHeader/ChatHeader';
import ChatBottom from '../ChatBottom/ChatBottom';
import ChatMain from '../ChatMain/ChatMain';

import './ChatUI.scss';

const ChatUI = () => {
  return (
    <div className='chat-ui'>
      <ChatHeader/>
      <ChatMain />
      <ChatBottom/>
    </div>
  )
}

export default ChatUI;