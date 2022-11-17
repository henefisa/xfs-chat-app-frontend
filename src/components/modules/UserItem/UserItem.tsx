import clsx from 'clsx';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { EFriendStatus, IUserItemResult } from 'src/models';
import { sendFriendRequest } from 'src/services/userService';

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

  const [isSend, setIsSend] = React.useState<boolean>(false);

  const handleAddFriend = async (id: string) => {
    const isSendSuccess = await sendFriendRequest(id, t1);

    if (!isSendSuccess) return;
    setIsSend(true);
  };

  return (
    <div className={clsx('user-item', className)}>
      <Avatar
        path={user.avatar || ''}
        username={
          user.fullName
            ? user.fullName.charAt(0).toUpperCase()
            : user.username.charAt(0).toUpperCase()
        }
        imgWidth={35.2}
        className="user-item__avtar"
      />
      <div className="user-item__info">
        <Title className="user-name" level={5}>
          {user.fullName ?? user.username}
        </Title>
        <Title className="user-location" level={5}>
          {user.location || ''}
        </Title>
      </div>
      <div className="user-item__action">
        {user.friendStatus?.status === EFriendStatus.REQUESTED || isSend ? (
          <Button className="cancel-user-btn">{t('cancel')}</Button>
        ) : user.friendStatus?.status !== EFriendStatus.ACCEPTED ? (
          <Button
            className="add-user-btn"
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
