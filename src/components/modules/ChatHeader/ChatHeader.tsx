import * as React from 'react';
import {
  SearchOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  UserOutlined,
  EllipsisOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';

import ActionsChatMenu from '../ActionsChatMenu/ActionsChatMenu';
import Tooltip from '@common/Tooltip/Tooltip';
import Avatar from '@common/Avatar/Avatar';
import Dropdown from '@common/Dropdown/Dropdown';
import Title from '@common/Title/Title';
import { Button } from 'antd';
import ChatCall from '../ChatCall/ChatCall';
import InputDropdown from '@common/Input/InputDropdown';

import './ChatHeader.scss';

interface IChatHeader {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHeader: React.FC<IChatHeader> = ({ setOpen }) => {
  const [id, setId] = React.useState(-1);
  const listActionChat = [
    {
      icon: PhoneOutlined,
      tooltipTitle: 'VoiceCall',
      handleClick: function () {
        setId(0);
      },
    },
    {
      icon: VideoCameraOutlined,
      tooltipTitle: 'VideoCall',
      handleClick: function () {
        setId(1);
      },
    },
    {
      icon: UserOutlined,
      tooltipTitle: 'UserInfo',
      handleClick: function () {
        setOpen(true);
      },
    },
  ];

  return (
    <div className="chat-header">
      <div className="user-info">
        <Avatar
          path="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/277551484_1607305416300980_1426726336589949572_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NDE6kmkwFQ8AX9-U3bh&_nc_ht=scontent.fdad3-1.fna&oh=00_AT8SGcvhT_y6-Lc16cMBv0OwsUOg0x7ef7Yp1yb_1teoEQ&oe=635BDBD2"
          imgWidth={35}
          username="A"
          className="user-info__avatar"
        />
        <Title level={5} className="user-info__name">
          Danh Huy
        </Title>
        <div className="user-info__status">
          <CheckCircleFilled className="status__icon" />
        </div>
      </div>
      <div className="group-aciton">
        <div className="search-action">
          <Dropdown
            overlay={<InputDropdown />}
            trigger={['click']}
            placement="bottomRight"
            className={'search-action__dropdown'}
          >
            <SearchOutlined className="custom-chat-icon" />
          </Dropdown>
        </div>
        {listActionChat.map((item, index) => {
          const ChatActionItem = item.icon;
          return (
            <Button
              key={index}
              className="group-action__btn"
              onClick={item.handleClick}
            >
              <Tooltip
                className="custom-chat-icon"
                placement="top"
                tooltipTitle={item.tooltipTitle}
              >
                <ChatActionItem />
              </Tooltip>
            </Button>
          );
        })}
        <div className="detail-actions">
          <Dropdown
            overlay={<ActionsChatMenu />}
            trigger={['click']}
            placement="bottomLeft"
            className="detail-actions__menu"
          >
            <EllipsisOutlined className="custom-chat-icon" />
          </Dropdown>
        </div>
        {id === 0 && (
          <ChatCall title="Audio" onClose={() => setId(-1)} isOpen={true} />
        )}
        {id === 1 && (
          <ChatCall title="Video" onClose={() => setId(-1)} isOpen={true} />
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
