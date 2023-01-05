import React from 'react';
import { IMessage } from 'src/models';
import { selectMessages } from 'src/store/conversationSlice';
import { useAppSelector } from 'src/store/hooks';
import MessagesTable from '../MessagesTable/MessagesTable';

interface IBubbleMessage {
  message: IMessage;
  position: string;
}

const BubbleMessage: React.FC<IBubbleMessage> = ({ message, position }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { listMessage } = useAppSelector(selectMessages);
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [listMessage]);
  return (
    <div ref={scrollRef}>
      <MessagesTable
        sender={message.sender}
        position={position}
        time={message.createdAt}
        message={message.message}
      />
    </div>
  );
};

export default BubbleMessage;
