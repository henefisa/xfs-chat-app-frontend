import { Loading3QuartersOutlined } from '@ant-design/icons';
import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Spin from '@common/Spin/Spin';
import Title from '@common/Title/Title';
import ListUsersResult from '@modules/ListUsersResult/ListUsersResult';
import clsx from 'clsx';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IUserItemResult } from 'src/models';
import { getUsers } from 'src/services/userService';
import { selectDarkLight } from 'src/store/darkLightSlice';
import { useAppSelector } from 'src/store/hooks';
import debounce from 'src/utils/debounce';

import './SidebarSearchUsers.scss';

interface ISidebarSearchUsersProps {}

const SidebarSearchUsers: React.FC<ISidebarSearchUsersProps> = () => {
  const { t } = useTranslation(['common', 'dashboard']);

  const isDark = useAppSelector(selectDarkLight);

  const [getUserLoading, setGetUserLoading] = React.useState(false);

  const [listResult, setListResult] = React.useState<IUserItemResult[]>([]);

  const handleGetUsers = async (keyword: string) => {
    setGetUserLoading(true);
    if (!keyword) {
      setGetUserLoading(false);
      return;
    }

    try {
      const result = await getUsers({ q: keyword }, t);
      setListResult(result.users);
      setGetUserLoading(false);
    } catch (err) {
      setGetUserLoading(false);
    }
  };

  const debounceGetUsers = React.useMemo(() => {
    return debounce(handleGetUsers, 700);
  }, []);

  return (
    <div className={clsx('sidebar-search', { 'dark-mode': isDark })}>
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
        {getUserLoading ? (
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
  );
};

export default SidebarSearchUsers;
