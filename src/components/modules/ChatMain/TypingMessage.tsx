import React from 'react';
import MessagesTable from '@modules/MessagesTable/MessagesTable';
import { useAppSelector } from 'src/store/hooks';
import { TUserProfile } from 'src/models';
import { selectUserProfile } from 'src/store/userSlice';
import { SocketContext } from 'src/context/socket/contextSocket';
import { ESocketEvent } from 'src/models/socket';
import { selectConversation } from 'src/store/conversationSlice';

const TypingMessage = () => {
  const socket = React.useContext(SocketContext);
  const [typing, setTyping] = React.useState(false);
  const [userTyping, setUserTyping] = React.useState<TUserProfile | null>(null);
  const useProfileStore = useAppSelector(selectUserProfile);
  const { selectedConversation } = useAppSelector(selectConversation);
  React.useEffect(() => {
    socket.on(ESocketEvent.TYPING, ({ user, conversationId }) => {
      setTyping(true);
      setUserTyping(user);
      if (conversationId !== selectedConversation?.id) {
        setTyping(false);
        setUserTyping(null);
      }
    });
  }, [typing, userTyping, selectedConversation]);
  React.useEffect(() => {
    socket.on(ESocketEvent.STOP_TYPING, ({ conversationId }) => {
      if (conversationId === selectedConversation?.id) {
        setTyping(false);
        setUserTyping(null);
      }
    });
  }, [typing, userTyping, selectedConversation]);
  if (userTyping?.id === useProfileStore?.id) return null;
  return (
    <div>
      {userTyping && (
        <MessagesTable position="left" sender={userTyping} typing={typing} />
      )}
    </div>
  );
};

export default TypingMessage;
