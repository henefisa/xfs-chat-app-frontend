import React from 'react';

import './ChatDayTitle.scss';

interface IChatDayTitle {
  day: string;
}

const ChatDayTitle: React.FC<IChatDayTitle> = ({ day }) => {
  return (
    <div className="chat-day-title">
      <div className="chat-day-title__title">{day}</div>
    </div>
  );
};

export default ChatDayTitle;
