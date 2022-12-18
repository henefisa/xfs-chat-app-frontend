import * as React from 'react';
import Title from '@common/Title/Title';
import { useAppSelector } from 'src/store/hooks';
import { selectNotification } from 'src/store/notificationSlice';
import { EFriendStatus, IUserItemResult } from 'src/models';
import Button from '@common/Button/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { getUsers } from 'src/services/userService';
import ListRequestFriend from '@modules/ListRequestFriend/ListRequestFriend';

import './Notification.scss';

const Notification: React.FC = () => {
  const { t } = useTranslation(['common', 'dashboard', 'popup-notification']);

  const notification = useAppSelector(selectNotification);
  const [active, setActive] = React.useState(true);

  const [listFriendRequest, setListFriendRequest] = React.useState<
    IUserItemResult[]
  >([]);

  React.useEffect(() => {
    const getListRequestFriend = async () => {
      try {
        const result = await getUsers(
          { friendStatus: EFriendStatus.REQUESTED },
          t
        );
        setListFriendRequest(result.users);
      } catch (err) {
        console.log(err);
      }
    };

    getListRequestFriend();
  }, []);

  return (
    <div
      className={clsx('notification', { 'notification--active': notification })}
    >
      <Title className="notification__header" level={3}>
        {t('header', { ns: 'popup-notification' })}
      </Title>
      <div className="notification__btn">
        <Button
          className={clsx('btn-all', active && 'btn-all--active')}
          onClick={React.useCallback(() => setActive(true), [active])}
        >
          {t('btn-all', { ns: 'popup-notification' })}
        </Button>
        <Button
          className={clsx('btn-unread', !active && 'btn-unread--active')}
          onClick={React.useCallback(() => setActive(false), [active])}
        >
          {t('btn-unread', { ns: 'popup-notification' })}
        </Button>
      </div>
      {listFriendRequest.length > 0 && (
        <>
          <Title className="invitation-list__title" level={4}>
            {t('invitation-title', { ns: 'popup-notification' })}
          </Title>
          <ListRequestFriend friendList={listFriendRequest} />
        </>
      )}
    </div>
  );
};

export default Notification;
