import React, { useRef, useEffect } from 'react';

import MessagesTable from '../MessagesTable/MessagesTable';
import ChatDayTitle from '../ChatDayTitle/ChatDayTitle';

import './ChatMain.scss';

interface IChatMain {
  messages: string[];
}
const ChatMain: React.FC<IChatMain> = ({ messages }) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);
  return (
    <div className="chatmain">
      <ChatDayTitle day="Today" />
      {messages.map((messages: string, index: React.Key | null | undefined) => {
        if (messages != '')
          return (
            <div key={index} ref={scrollRef}>
              <MessagesTable position="right" messages={messages} />
            </div>
          );
      })}
    </div>
  );
};

export default ChatMain;
