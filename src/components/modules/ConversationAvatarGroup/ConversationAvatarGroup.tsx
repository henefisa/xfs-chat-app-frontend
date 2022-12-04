import * as React from 'react';
import Avatar from '@common/Avatar/Avatar';
import AvatarGroup from '@common/Avatar/AvatarGroup';
import { IConversation } from 'src/models';

import './ConversationAvatarGroup.scss';

interface IConversationAvatarGroupProps {
  conversation: IConversation;
}

const ConversationAvatarGroup: React.FC<IConversationAvatarGroupProps> = ({
  conversation,
}) => {
  return (
    <AvatarGroup
      maxCount={conversation.participants.length === 4 ? 4 : 3}
      maxPopoverTrigger="click"
      className="conversation-avatar"
    >
      {conversation.participants.map((participant) => {
        const name = participant.user.fullName ?? participant.user.username;

        return (
          <Avatar
            key={participant.id}
            path={participant.user.avatar}
            username={name.charAt(0).toUpperCase()}
            imgWidth={26}
          />
        );
      })}
    </AvatarGroup>
  );
};

export default ConversationAvatarGroup;
