import * as React from 'react';
import Title from '@common/Title/Title';
import { EFriendStatus, IUserItemResult } from 'src/models';
import Button from '@common/Button/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { getUsers } from 'src/services/userService';
import ListRequestFriend from '@modules/ListRequestFriend/ListRequestFriend';

import './Notification.scss';
import { socket } from 'src/context/socket/config';
import { ESocketEvent } from 'src/models/socket';
import { useAppSelector } from 'src/store/hooks';
import { selectFriendRequest } from 'src/store/socketFriendRequestSlice';

const Notification: React.FC = () => {
  // const friendRequest = useAppSelector(selectFriendRequest);

  const { t } = useTranslation(['common', 'dashboard', 'popup-notification']);

  const [active, setActive] = React.useState(true);

  const [frq, setfrq] = React.useState();

  const [listFriendRequest, setListFriendRequest] = React.useState<
    IUserItemResult[]
  >([]);

  console.log(listFriendRequest);

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
  }, [frq]);

  React.useEffect(() => {
    socket
      .off(ESocketEvent.GET_FRIEND_REQUEST)
      .on(ESocketEvent.GET_FRIEND_REQUEST, ({ user }) => {
        // setListFriendRequest((prev) => [...prev, user]);
        setfrq(user);
      });
  });

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
