import * as React from 'react';
import Divider from '@common/Divider/Divider';
import { IFriendRequest } from 'src/models';
import RequestFriendItem from '@modules/RequestFriendItem/RequestFriendItem';

import './ListRequestFriend.scss';

interface IListRequestFriendProps {
  friendList: IFriendRequest[];
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
