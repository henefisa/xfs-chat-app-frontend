import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Title from '@common/Title/Title';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IListFriendRequest } from 'src/models';
import {
  acceptRequestFriend,
  cancelFriendRequest,
} from 'src/services/userService';

import './RequestFriendItem.scss';

interface IRequestFriendItemProps {
  friend: IListFriendRequest;
}

const RequestFriendItem: React.FC<IRequestFriendItemProps> = ({ friend }) => {
  const { t } = useTranslation(['common', 'dashboard']);
  const [isCancelOrAccept, setIsCancelOrAccept] =
    React.useState<boolean>(false);

  const handleCancelRequest = async (id: string) => {
    const result = await cancelFriendRequest(id, t);

    if (!result) return;
    setIsCancelOrAccept(true);
  };

  const handleAcceptRequest = async (id: string) => {
    const isSuccess = await acceptRequestFriend(id, t);

    if (!isSuccess) return;
    setIsCancelOrAccept(true);
  };

  return (
    <div className="friend-item">
      <Avatar
        path={friend.owner.avatar}
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
        {isCancelOrAccept ? null : (
          <>
            <Button
              className="accept-btn"
              onClick={() => handleAcceptRequest(friend.owner.id)}
            >
              {t('sidebar.search-user.accept', { ns: 'dashboard' })}
            </Button>
            <Button
              className="cancel-btn"
              onClick={() => handleCancelRequest(friend.owner.id)}
            >
              {t('sidebar.search-user.cancel', { ns: 'dashboard' })}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestFriendItem;
