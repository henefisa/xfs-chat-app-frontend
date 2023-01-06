import * as React from 'react';
import Avatar from '@common/Avatar/Avatar';
import AvatarGroup from '@common/Avatar/AvatarGroup';
import { IConversation } from 'src/models';

import './AvatarGroupChat.scss';

interface IAvatarGroupChatProps {
  conversation: IConversation | null;
  imgWidth: number;
}

const AvatarGroupChat: React.FC<IAvatarGroupChatProps> = ({
  conversation,
  imgWidth,
}) => {
  return (
    <AvatarGroup
      maxCount={conversation?.participants?.length === 4 ? 4 : 3}
      maxPopoverTrigger="click"
      className="conversation-avatar"
    >
      {conversation?.participants?.map((participant) => {
        const name = participant.user.fullName ?? participant.user.username;
        return (
          <Avatar
            key={participant?.id}
            path={participant?.user.avatar}
            username={name.charAt(0).toUpperCase()}
            imgWidth={imgWidth}
          />
        );
      })}
    </AvatarGroup>
  );
};

export default AvatarGroupChat;
