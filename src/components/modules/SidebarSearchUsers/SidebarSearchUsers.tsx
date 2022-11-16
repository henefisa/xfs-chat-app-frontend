import { Loading3QuartersOutlined } from '@ant-design/icons';
import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Spin from '@common/Spin/Spin';
import Title from '@common/Title/Title';
import ListUsersResult from '@modules/ListUsersResult/ListUsersResult';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IUser } from 'src/models';
import { getUsers } from 'src/services/userService';
import debounce from 'src/utils/debounce';

import './SidebarSearchUsers.scss';

interface ISidebarSearchUsersProps {}

interface IFriendStatusState extends IUser {
  status: 'REQUESTED' | 'ACCEPTED';
  owner: {
    id: string;
  };
  userTarget: {
    id: string;
  };
}

export interface IUserItemResult extends IUser {
  email: string;
  fullName: null | string;
  avatar: null | string;
  phone: null | string;
  description: null | string;
  location: null | string;
  status: 'ACTIVE';
  role: 'USER' | 'ADMIN';
  friendStatus: null | IFriendStatusState;
}

const SidebarSearchUsers: React.FC<ISidebarSearchUsersProps> = () => {
  const { t } = useTranslation(['common', 'dashboard']);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [listResult, setListResult] = React.useState<IUserItemResult[]>([]);

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
        <Title level={5} className="body-search__title">
          {t('sidebar.search-user.result-title', { ns: 'dashboard' })}
        </Title>
        {loading ? (
          <Spin
            className="body-search__loading"
            spinIcon={
              <Loading3QuartersOutlined className="loading-icon" spin />
            }
          />
        ) : (
          listResult.length > 0 && <ListUsersResult listResult={listResult} />
        )}
      </div>
    </div>
  );
};

export default SidebarSearchUsers;
