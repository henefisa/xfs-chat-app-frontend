import React, { useRef, useEffect } from 'react';

import MessagesTable from '@modules/MessagesTable/MessagesTable';
import ChatDayTitle from '@modules/ChatDayTitle/ChatDayTitle';

import './ChatMain.scss';

interface IChatMain {
  messages: string[];
}
const ChatMain: React.FC<IChatMain> = ({ messages }) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);
  return (
    <div className="chatmain">
      <ChatDayTitle day="Today" />
      {messages.map((messages: string, index: number) => {
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
