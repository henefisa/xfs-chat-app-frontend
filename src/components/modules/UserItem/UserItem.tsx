import * as React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';

import './UserItem.scss';

interface IUserItem {
  path?: string;
  username: string;
  location?: string;
  className?: string;
}

const UserItem: React.FC<IUserItem> = ({
  path,
  username,
  location,
  className,
}) => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'sidebar.search-user',
  });

  return (
    <div className={clsx('user-item', className)}>
      <Avatar
        path={path}
        username={username.charAt(0).toUpperCase()}
        imgWidth={35.2}
        className="user-item__avtar"
      />
      <div className="user-item__info">
        <Title className="user-name" level={5}>
          {username}
        </Title>
        <Title className="user-location" level={5}>
          {location}
        </Title>
      </div>
      <div className="user-item__action">
        <Button className="add-user-btn">{t('add')}</Button>
        {/* <Button className="cancel-user-btn">Cancel</Button> */}
      </div>
    </div>
  );
};

export default UserItem;
