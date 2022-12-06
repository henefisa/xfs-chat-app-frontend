import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Title from '@common/Title/Title';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IFriendRequest } from 'src/models';
import {
  acceptRequestFriend,
  cancelFriendRequest,
} from 'src/services/userService';

import './RequestFriendItem.scss';

interface IRequestFriendItemProps {
  friend: IFriendRequest;
}

const RequestFriendItem: React.FC<IRequestFriendItemProps> = ({ friend }) => {
  const { t } = useTranslation(['common', 'dashboard']);
  const name = friend.owner.fullName ?? friend.owner.username;

  const [isCancelOrAccept, setIsCancelOrAccept] =
    React.useState<boolean>(false);
  const [isCancelLoading, setIsCancelLoading] = React.useState<boolean>(false);
  const [isAcceptLoading, setIsAcceptLoading] = React.useState<boolean>(false);

  const handleCancelRequest = async (id: string) => {
    setIsCancelLoading(true);

    try {
      await cancelFriendRequest(id, t);
      setIsCancelLoading(false);
      setIsCancelOrAccept(true);
    } catch (err) {
      setIsCancelLoading(false);
    }
  };

  const handleAcceptRequest = async (id: string) => {
    setIsAcceptLoading(true);

    try {
      await acceptRequestFriend(id, t);
      setIsAcceptLoading(false);
      setIsCancelOrAccept(true);
    } catch (err) {
      setIsAcceptLoading(false);
    }
  };

  return (
    <div className="friend-item">
      <Avatar
        path={friend.owner.avatar}
        username={name.charAt(0).toUpperCase()}
        imgWidth={35.2}
        className="friend-item__avatar"
      />
      <div className="friend-item__info">
        <Title className="friend-name" level={5}>
          {name}
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
              loading={isAcceptLoading}
              spinSize="small"
              onClick={() => handleAcceptRequest(friend.owner.id)}
            >
              {t('sidebar.search-user.accept', { ns: 'dashboard' })}
            </Button>
            <Button
              className="cancel-btn"
              loading={isCancelLoading}
              spinSize="small"
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
