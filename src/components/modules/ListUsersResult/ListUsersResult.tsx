import * as React from 'react';
import clsx from 'clsx';
import { IUserItemResult } from 'src/models';

import UserItem from '@modules/UserItem/UserItem';
import Divider from '@common/Divider/Divider';

import './ListUsersResult.scss';

interface IListUsersResultProps {
  className?: string;
  listResult: IUserItemResult[];
}

const ListUsersResult: React.FC<IListUsersResultProps> = ({
  className,
  listResult,
}) => {
  return (
    <div className={clsx('list-result', className)}>
      {listResult.map((item, index) => (
        <React.Fragment key={item.id}>
          <UserItem user={item} />
          {index < listResult.length - 1 && <Divider className="separate" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListUsersResult;
