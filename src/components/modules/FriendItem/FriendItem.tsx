import * as React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import Avatar from '@common/Avatar/Avatar';
import Title from '@common/Title/Title';
import Button from '@common/Button/Button';

import './FriendItem.scss';

interface FriendItem {
  path?: string;
  friendname: string;
  location?: string;
  className?: string;
}

const FriendItem: React.FC<FriendItem> = ({
  path,
  friendname,
  location,
  className,
}) => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'sidebar.search-friend',
  });

  return (
    <div className={clsx('friend-item', className)}>
      <Avatar
        path={path}
        username={friendname.charAt(0).toUpperCase()}
        imgWidth={35.2}
        className="friend-item__avtar"
      />
      <div className="friend-item__info">
        <Title className="friend-name" level={5}>
          {friendname}
        </Title>
        <Title className="friend-location" level={5}>
          {location}
        </Title>
      </div>
      <div className="friend-item__action">
        <Button className="add-friend-btn">{t('add')}</Button>
        {/* <Button className="cancel-friend-btn">Cancel</Button> */}
      </div>
    </div>
  );
};

export default FriendItem;
