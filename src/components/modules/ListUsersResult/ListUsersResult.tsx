import * as React from 'react';
import clsx from 'clsx';

import UserItem from '@modules/UserItem/UserItem';
import Divider from '@common/Divider/Divider';
import { IListUser } from '../SidebarSearchUsers/SidebarSearchUsers';

import './ListUsersResult.scss';

interface IListUsersResultProps {
  className?: string;
  listResult: IListUser[];
}

const ListUsersResult: React.FC<IListUsersResultProps> = ({
  className,
  listResult,
}) => {
  return (
    <div className={clsx('list-result', className)}>
      {listResult.map((item, index) => (
        <React.Fragment key={item.u_id}>
          <UserItem
            username={item.u_full_name || item.u_username}
            path={item.u_avatar || ''}
            location={item.u_location || ''}
          />
          {index < listResult.length - 1 && <Divider className="separate" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListUsersResult;
