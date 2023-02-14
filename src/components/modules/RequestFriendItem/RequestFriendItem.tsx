import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Title from '@common/Title/Title';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { socket } from 'src/context/socket/config';
import { IFriendRequest } from 'src/models';
import { ESocketEvent } from 'src/models/socket';
import {
  acceptRequestFriend,
  cancelFriendRequest,
} from 'src/services/userService';
import { useAppSelector } from 'src/store/hooks';
import { selectUserProfile } from 'src/store/userSlice';
import debounce from 'src/utils/debounce';

import './RequestFriendItem.scss';

interface IRequestFriendItemProps {
  friend: IFriendRequest;
}

const RequestFriendItem: React.FC<IRequestFriendItemProps> = ({ friend }) => {
  const { t } = useTranslation(['common', 'dashboard']);

  const [isCancelOrAccept, setIsCancelOrAccept] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const userProfileStore = useAppSelector(selectUserProfile);

  const name = friend.owner.fullName ?? friend.owner.username;

  const setStateAndEmitEventSocket = () => {
    setIsLoading(false);
    setIsCancelOrAccept(true);
    socket.emit(ESocketEvent.CANCEL_OR_ACCEPT_FRIEND_REQUEST, {
      userId: userProfileStore?.id,
    });
  };

  const handleCancelRequest = async (id: string) => {
    setIsLoading(true);
    try {
      await cancelFriendRequest(id, t);
      setStateAndEmitEventSocket();
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async (id: string) => {
    setIsLoading(true);
    try {
      await acceptRequestFriend(id, t);
      setStateAndEmitEventSocket();
    } catch (err) {
      setIsLoading(false);
    }
  };

  const debounceCancelRequest = React.useMemo(() => {
    return debounce(handleCancelRequest, 500);
  }, []);

  const debounceAcceptRequest = React.useMemo(() => {
    return debounce(handleAcceptRequest, 500);
  }, []);

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
              loading={isLoading}
              spinSize="small"
              onClick={() => debounceAcceptRequest(friend.owner.id)}
            >
              {t('sidebar.search-user.accept', { ns: 'dashboard' })}
            </Button>
            <Button
              className="cancel-btn"
              loading={isLoading}
              spinSize="small"
              onClick={() => debounceCancelRequest(friend.owner.id)}
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
