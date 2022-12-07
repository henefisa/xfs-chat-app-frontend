import * as React from 'react';
import Divider from '@common/Divider/Divider';
import { IUserItemResult } from 'src/models';
import RequestFriendItem from '../RequestFriendItem/RequestFriendItem';

import './ListRequestFriend.scss';

interface IListRequestFriendProps {
  friendList: IUserItemResult[];
}

const ListRequestFriend: React.FC<IListRequestFriendProps> = ({
  friendList,
}) => {
  return (
    <div className="list-request">
      {friendList.map((item, index) => (
        <React.Fragment key={item.id}>
          <RequestFriendItem friend={item} />
          {index < friendList.length - 1 && <Divider className="separate" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListRequestFriend;
