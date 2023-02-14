import * as React from 'react';
import Title from '@common/Title/Title';
import { EFriendStatus, IFriendRequest, IUserItemResult } from 'src/models';
import Button from '@common/Button/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { getFriends } from 'src/services/userService';
import ListRequestFriend from '@modules/ListRequestFriend/ListRequestFriend';
import { socket } from 'src/context/socket/config';
import { ESocketEvent } from 'src/models/socket';

import './Notification.scss';

const Notification: React.FC = () => {
  const { t } = useTranslation(['common', 'dashboard', 'popup-notification']);

  const [active, setActive] = React.useState(true);
  const [newFriendRequest, setNewFriendRequest] =
    React.useState<IUserItemResult>();

  const [listFriendRequest, setListFriendRequest] = React.useState<
    IFriendRequest[]
  >([]);

  React.useEffect(() => {
    const getListRequestFriend = async () => {
      try {
        const result = await getFriends({ status: EFriendStatus.REQUESTED }, t);
        setListFriendRequest(result.friends);
        console.log(result.friends);
      } catch (err) {
        console.log(err);
      }
    };
    getListRequestFriend();
  }, [newFriendRequest]);

  React.useEffect(() => {
    socket.on(ESocketEvent.GET_FRIEND_REQUEST, ({ user }) => {
      setNewFriendRequest(user);
    });
  }, []);

  const handleBtnAllActive = React.useCallback(() => {
    setActive(true);
  }, [active]);

  const handleBtnUnreadActive = React.useCallback(() => {
    setActive(false);
  }, [active]);

  return (
    <div className={clsx('notification')}>
      <Title className="notification__header" level={3}>
        {t('header', { ns: 'popup-notification' })}
      </Title>
      <div className="notification__btn">
        <Button
          className={clsx('btn-all', { ['btn-all--active']: active })}
          onClick={handleBtnAllActive}
        >
          {t('btn-all', { ns: 'popup-notification' })}
        </Button>
        <Button
          className={clsx('btn-unread', { ['btn-unread--active']: !active })}
          onClick={handleBtnUnreadActive}
        >
          {t('btn-unread', { ns: 'popup-notification' })}
        </Button>
      </div>
      {listFriendRequest?.length > 0 && (
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
