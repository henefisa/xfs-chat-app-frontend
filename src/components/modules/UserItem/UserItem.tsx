import * as React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { sendFriendRequest } from 'src/services/userService';

import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import { IUserItemResult } from '@modules/SidebarSearchUsers/SidebarSearchUsers';

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
        path={user.u_avatar || ''}
        username={
          user.u_full_name
            ? user.u_full_name.charAt(0).toUpperCase()
            : user.u_username.charAt(0).toUpperCase()
        }
        imgWidth={35.2}
        className="user-item__avtar"
      />
      <div className="user-item__info">
        <Title className="user-name" level={5}>
          {user.u_full_name ?? user.u_username}
        </Title>
        <Title className="user-location" level={5}>
          {user.u_location || ''}
        </Title>
      </div>
      <div className="user-item__action">
        {user.user_friends_status === 'REQUESTED' || isSend ? (
          <Button className="cancel-user-btn">{t('cancel')}</Button>
        ) : (
          <Button
            className="add-user-btn"
            onClick={() => handleAddFriend(user.u_id)}
          >
            {t('add')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserItem;
