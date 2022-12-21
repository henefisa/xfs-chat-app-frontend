import { Loading3QuartersOutlined } from '@ant-design/icons';
import Spin from '@common/Spin/Spin';
import Title from '@common/Title/Title';
import ListRequestFriend from '@modules/ListRequestFriend/ListRequestFriend';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { EFriendStatus, IUserItemResult } from 'src/models';
import { getUsers } from 'src/services/userService';

import './InvitationList.scss';

interface IInvitationListProps {}

const InvitationList: React.FC<IInvitationListProps> = () => {
  const { t } = useTranslation(['common', 'dashboard']);

  const [getListRequestLoading, setGetListRequestLoading] =
    React.useState(false);
  const [listFriendRequest, setListFriendRequest] = React.useState<
    IUserItemResult[]
  >([]);

  React.useEffect(() => {
    const getListRequestFriend = async () => {
      setGetListRequestLoading(true);

      try {
        const result = await getUsers(
          { friendStatus: EFriendStatus.REQUESTED },
          t
        );

        setListFriendRequest(result.users);
        setGetListRequestLoading(false);
      } catch (err) {
        setGetListRequestLoading(false);
      }
    };

    getListRequestFriend();
  }, []);

  return (
    <div className="invitation-list">
      {getListRequestLoading ? (
        <Spin
          className="invitation-list__loading"
          spinIcon={<Loading3QuartersOutlined className="loading-icon" spin />}
        />
      ) : (
        <>
          {listFriendRequest.length > 0 && (
            <>
              <Title className="invitation-list__title" level={4}>
                {t('sidebar.invitation.invitation-title', {
                  ns: 'dashboard',
                })}
              </Title>
              <ListRequestFriend friendList={listFriendRequest} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default InvitationList;
