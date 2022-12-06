import clsx from 'clsx';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { EFriendStatus, IFriendStatusState, IUserItemResult } from 'src/models';
import {
  cancelFriendRequest,
  sendFriendRequest,
} from 'src/services/userService';

import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Title from '@common/Title/Title';

import './UserItem.scss';

interface IUserItem {
  user: IUserItemResult;
  className?: string;
}

const UserItem: React.FC<IUserItem> = ({ user, className }) => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'sidebar.search-user',
  });
  const { t: t1 } = useTranslation('common');

  const name = user.fullName || user.username;

  const [isCancel, setIsCancel] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [friendStatus, setFriendStatus] =
    React.useState<IFriendStatusState | null>(null);

  const handleAddFriend = async (id: string) => {
    setIsLoading(true);

    try {
      const result = await sendFriendRequest(id, t1);
      setFriendStatus(result);
      setIsLoading(false);
      setIsCancel(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleCancelRequest = async (id: string) => {
    setIsLoading(true);

    try {
      await cancelFriendRequest(id, t1);
      setFriendStatus(null);
      setIsLoading(false);
      setIsCancel(true);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx('user-item', className)}>
      <Avatar
        path={user.avatar}
        username={name.charAt(0).toUpperCase()}
        imgWidth={35.2}
        className="user-item__avtar"
      />
      <div className="user-item__info">
        <Title className="user-name" level={5}>
          {name}
        </Title>
        <Title className="user-location" level={5}>
          {user.location || 'Some Where'}
        </Title>
      </div>
      <div className="user-item__action">
        {friendStatus?.status === EFriendStatus.REQUESTED ||
        (user.friendStatus?.status === EFriendStatus.REQUESTED && !isCancel) ? (
          <Button
            className="cancel-user-btn"
            loading={isLoading}
            spinSize="small"
            onClick={() => handleCancelRequest(user.id)}
          >
            {t('cancel')}
          </Button>
        ) : user.friendStatus?.status !== EFriendStatus.ACCEPTED ? (
          <Button
            className="add-user-btn"
            loading={isLoading}
            spinSize="small"
            onClick={() => handleAddFriend(user.id)}
          >
            {t('add')}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default UserItem;
