import { Loading3QuartersOutlined } from '@ant-design/icons';
import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Spin from '@common/Spin/Spin';
import Title from '@common/Title/Title';
import ListUsersResult from '@modules/ListUsersResult/ListUsersResult';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IListFriendRequest, IUserItemResult } from 'src/models';
import { getRequestFriend, getUsers } from 'src/services/userService';
import debounce from 'src/utils/debounce';
import ListRequestFriend from '../ListRequestFriend/ListRequestFriend';

import './SidebarSearchUsers.scss';

interface ISidebarSearchUsersProps {}

const SidebarSearchUsers: React.FC<ISidebarSearchUsersProps> = () => {
  const { t } = useTranslation(['common', 'dashboard']);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [listResult, setListResult] = React.useState<IUserItemResult[]>([]);
  const [listFriendRequest, setListFriendRequest] = React.useState<
    IListFriendRequest[]
  >([]);

  React.useEffect(() => {
    const getListRequestFriend = async () => {
      const result = await getRequestFriend(t);

      if (!result) return;

      setListFriendRequest(result.friends);
    };

    getListRequestFriend();
  }, []);

  const handleGetUsers = async (keyword: string) => {
    setLoading(true);
    if (!keyword) {
      setListResult([]);
      setLoading(false);
      return;
    }

    const result = await getUsers(keyword, t);
    setLoading(false);

    if (!result) return;
    setListResult(result.users);
  };

  const debounceGetUsers = React.useMemo(() => {
    return debounce(handleGetUsers, 700);
  }, []);

  return (
    <>
      <div className="invitation-list">
        {listFriendRequest.length > 0 && (
          <>
            <Title className="invitation-list__title" level={4}>
              {t('sidebar.search-user.invitation-title', {
                ns: 'dashboard',
              })}
            </Title>
            <ListRequestFriend friendList={listFriendRequest} />
          </>
        )}
      </div>
      <div className="sidebar-search">
        <div className="header-search">
          <Title className="header-search__title" level={4}>
            {t('sidebar.search-user.title', { ns: 'dashboard' })}
          </Title>
          <SearchSidebar
            className="header-search__input"
            placeholder={t('sidebar.search-user.search-placeholder', {
              ns: 'dashboard',
            })}
            onChange={debounceGetUsers}
          />
        </div>
        <div className="body-search">
          {loading ? (
            <Spin
              className="body-search__loading"
              spinIcon={
                <Loading3QuartersOutlined className="loading-icon" spin />
              }
            />
          ) : (
            listResult.length > 0 && (
              <>
                <Title level={5} className="body-search__title">
                  {t('sidebar.search-user.result-title', { ns: 'dashboard' })}
                </Title>
                <ListUsersResult listResult={listResult} />
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarSearchUsers;
