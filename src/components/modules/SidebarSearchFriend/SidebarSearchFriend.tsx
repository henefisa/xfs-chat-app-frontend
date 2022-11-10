import SearchSidebar from '@common/SearchSidebar/SearchSidebar';
import Title from '@common/Title/Title';
import ListFriendResult from '@modules/ListFriendResult/ListFriendResult';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IUser } from 'src/models';
import { getFriends } from 'src/services/userService';
import debounce from 'src/utils/debounce';

import './SidebarSearchFriend.scss';

interface ISidebarSearchFriendProps {}

export interface IListUser extends IUser {
  fullname: string;
  avatar: string;
  location: string;
}

const SidebarSearchFriend: React.FC<ISidebarSearchFriendProps> = () => {
  const { t } = useTranslation('common');

  const [listResult, setListResult] = React.useState<IListUser[]>([]);

  const handleGetFriends = async (keyword: string) => {
    if (!keyword) {
      setListResult([]);
      return;
    }

    const result = await getFriends(keyword, t);
    setListResult(result.users);
  };

  const debounceGetFriends = React.useMemo(() => {
    return debounce(handleGetFriends, 700);
  }, []);

  return (
    <div className="sidebar-search">
      <div className="header-search">
        <Title className="header-search__title" level={4}>
          Search Friend
        </Title>
        <SearchSidebar
          className="header-search__input"
          placeholder="Search friend..."
          onChange={debounceGetFriends}
        />
      </div>
      <div className="body-search">
        <Title level={5} className="body-search__title">
          Result
        </Title>
        {listResult.length > 0 && <ListFriendResult listResult={listResult} />}
      </div>
    </div>
  );
};

export default SidebarSearchFriend;
