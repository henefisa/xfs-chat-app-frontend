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

const ItemsChat = [
  {
    icon: PhoneOutlined,
    tooltipTitle: 'VoiceCall',
  },
  {
    icon: VideoCameraOutlined,
    tooltipTitle: 'VideoCall',
  },
  {
    icon: UserOutlined,
    tooltipTitle: 'UserInfo',
  },
];

const activeIndex = 0;

const ChatHeader: React.FC<IChatHeader> = ({ setOpen }) => {
  const [id, setId] = React.useState(-1);

  return (
    <div className="chat-header">
      <div className="profile-avatar">
        <Avatar
          path="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/277551484_1607305416300980_1426726336589949572_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NDE6kmkwFQ8AX9-U3bh&_nc_ht=scontent.fdad3-1.fna&oh=00_AT8SGcvhT_y6-Lc16cMBv0OwsUOg0x7ef7Yp1yb_1teoEQ&oe=635BDBD2"
          imgWidth={35}
          username="A"
          className="custom-avatar"
        />
        <Title level={5} className="username">
          Danh Huy
        </Title>
        <div className="status">
          <CheckCircleFilled className="status__icon" />
        </div>
      </div>
      <div className="items-chat">
        <div className="search">
          <Dropdown
            overlay={<InputDropdown />}
            trigger={['click']}
            placement="bottomRight"
            className={'chat-header-search__dropdown'}
          >
            <SearchOutlined className="custom-chat-icon" />
          </Dropdown>
        </div>
        {ItemsChat.map((item, index) => {
          const ChatIcon = item.icon;
          return (
            <Button
              key={index}
              className="items-chat__btn"
              onClick={() => {
                if (index === 2) {
                  setOpen(true);
                }
                if (id === index) {
                  setId(-1);
                } else {
                  setId(index);
                }
              }}
            >
              <Tooltip
                className="custom-chat-icon"
                placement="top"
                tooltipTitle={item.tooltipTitle}
                isActive={index === activeIndex ? true : false}
              >
                <ChatIcon />
              </Tooltip>
            </Button>
          );
        })}
        <div className="actions">
          <div className="actions__item">
            <Dropdown
              overlay={<ActionsChatMenu />}
              trigger={['click']}
              placement="bottom"
              className="custom-dropdown-menu"
            >
              <EllipsisOutlined className="custom-chat-icon" />
            </Dropdown>
          </div>
        </div>
        {id === 0 && <ChatCall title="Audio" onClose={() => setId(-1)} />}
        {id === 1 && <ChatCall title="Video" onClose={() => setId(-1)} />}
      </div>
    </div>
  );
};

export default ChatHeader;
