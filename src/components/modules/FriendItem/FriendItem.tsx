import * as React from 'react';
import Avatar from '@common/Avatar/Avatar';
import { IListFriendRequest } from 'src/models';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';

import './FriendItem.scss';

interface IFriendItemProps {
  friend: IListFriendRequest;
}

const FriendItem: React.FC<IFriendItemProps> = ({ friend }) => {
  return (
    <div className="friend-item">
      <Avatar
        path={friend.owner.avatar ?? ''}
        username={
          friend.owner.fullName?.charAt(0).toUpperCase() ??
          friend.owner.username.charAt(0).toUpperCase()
        }
        imgWidth={35.2}
        className="friend-item__avatar"
      />
      <div className="friend-item__info">
        <Title className="friend-name" level={5}>
          {friend.owner.fullName ?? friend.owner.username}
        </Title>
        <Title className="friend-location" level={5}>
          {friend.owner.location || 'Some Where'}
        </Title>
      </div>
      <div className="friend-item__actions">
        <Button className="accept-btn">Accept</Button>
        <Button className="cancel-btn">Cancel</Button>
      </div>
    </div>
  );
};

export default FriendItem;
