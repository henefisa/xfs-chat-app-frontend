import React, { useRef, useEffect } from 'react';

import MessagesTable from '../MessagesTable/MessagesTable';
import ChatDayTitle from '../ChatDayTitle/ChatDayTitle';

import './ChatMain.scss';

interface IChatMain {
  Messages: string[];
}
const ChatMain: React.FC<IChatMain> = ({ Messages }) => {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Messages]);
  return (
    <div className="chatmain">
      <ChatDayTitle day="Today" />
      {Messages.map((mess: string, index: React.Key | null | undefined) => {
        if (mess != '')
          return (
            <div ref={scrollRef}>
              <MessagesTable key={index} position="right" Messages={mess} />
            </div>
          );
      })}
    </div>
  );
};

export default ChatMain;
