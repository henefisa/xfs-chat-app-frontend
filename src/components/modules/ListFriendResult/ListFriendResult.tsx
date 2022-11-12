import * as React from 'react';
import clsx from 'clsx';

import FriendItem from '@modules/FriendItem/FriendItem';
import Divider from '@common/Divider/Divider';
import { IListUser } from '../SidebarSearchUsers/SidebarSearchUsers';

import './ListFriendResult.scss';

interface IListFriendResultProps {
  className?: string;
  listResult: IListUser[];
}

const ListFriendResult: React.FC<IListFriendResultProps> = ({
  className,
  listResult,
}) => {
  return (
    <div className={clsx('list-result', className)}>
      {listResult.map((item, index) => (
        <React.Fragment key={item.id}>
          <FriendItem
            friendname={item.fullname || item.username}
            path={item.avatar || ''}
            location={item.location || ''}
          />
          {index < listResult.length - 1 && <Divider className="separate" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListFriendResult;
