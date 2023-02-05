import React from 'react';
import { IMessage } from 'src/models';
import { useAppSelector } from 'src/store/hooks';
import { selectUserProfile } from 'src/store/userSlice';
import BubbleMessage from './BubbleMessage';

interface IListMessage {
  listMessage: IMessage[];
}

const ListMessage: React.FC<IListMessage> = ({ listMessage }) => {
  const useProfileStore = useAppSelector(selectUserProfile);
  return (
    <div>
      {listMessage.map((message) => {
        if (!useProfileStore) return null;
        if (message.sender.id === useProfileStore.id) {
          return (
            <BubbleMessage
              key={message.id}
              message={message}
              position={'right'}
              isLastOne={message.isLastOne}
            />
          );
        }
        return (
          <BubbleMessage
            key={message.id}
            message={message}
            position={'left'}
            isLastOne={message.isLastOne}
          />
        );
      })}
    </div>
  );
};

export default ListMessage;
