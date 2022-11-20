import * as React from 'react';
import Divider from '@common/Divider/Divider';
import { IListFriendRequest } from 'src/models';
import FriendItem from '../FriendItem/FriendItem';

import './ListRequestFriend.scss';

interface IListRequestFriendProps {
  friendList: IListFriendRequest[];
}

const ListRequestFriend: React.FC<IListRequestFriendProps> = ({
  friendList,
}) => {
  return (
    <div className="list-request">
      {friendList.map((item, index) => (
        <React.Fragment key={item.id}>
          <FriendItem friend={item} />
          {index < friendList.length - 1 && <Divider className="separate" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListRequestFriend;
