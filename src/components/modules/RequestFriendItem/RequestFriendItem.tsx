import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Title from '@common/Title/Title';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IUserItemResult } from 'src/models';
import {
  acceptRequestFriend,
  cancelFriendRequest,
} from 'src/services/userService';
import debounce from 'src/utils/debounce';

import './RequestFriendItem.scss';

interface IRequestFriendItemProps {
  friend: IUserItemResult;
}

const RequestFriendItem: React.FC<IRequestFriendItemProps> = ({ friend }) => {
  const { t } = useTranslation(['common', 'dashboard']);

  const [isCancelOrAccept, setIsCancelOrAccept] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const name = friend.fullName ?? friend.username;

  const handleCancelRequest = async (id: string) => {
    setIsLoading(true);

    try {
      await cancelFriendRequest(id, t);
      setIsLoading(false);
      setIsCancelOrAccept(true);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async (id: string) => {
    setIsLoading(true);

    try {
      await acceptRequestFriend(id, t);
      setIsLoading(false);
      setIsCancelOrAccept(true);
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
        path={friend.avatar}
        username={name.charAt(0).toUpperCase()}
        imgWidth={35.2}
        className="friend-item__avatar"
      />
      <div className="friend-item__info">
        <Title className="friend-name" level={5}>
          {name}
        </Title>
        <Title className="friend-location" level={5}>
          {friend.location || 'Some Where'}
        </Title>
      </div>
      <div className="friend-item__actions">
        {isCancelOrAccept ? null : (
          <>
            <Button
              className="accept-btn"
              loading={isLoading}
              spinSize="small"
              onClick={() => debounceAcceptRequest(friend.id)}
            >
              {t('sidebar.search-user.accept', { ns: 'dashboard' })}
            </Button>
            <Button
              className="cancel-btn"
              loading={isLoading}
              spinSize="small"
              onClick={() => debounceCancelRequest(friend.id)}
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
