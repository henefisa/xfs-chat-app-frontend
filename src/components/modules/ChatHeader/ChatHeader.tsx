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
import { useTranslation } from 'react-i18next';

import './ChatHeader.scss';

interface IChatHeader {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHeader: React.FC<IChatHeader> = ({ setOpen }) => {
  const [id, setId] = React.useState(-1);
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-header',
  });
  const handleClickuser = () => {
    setOpen(true);
  };

  const listActionChat = React.useMemo(() => {
    return [
      {
        icon: PhoneOutlined,
        tooltipTitle: t('voice-call'),
        handleClick: function () {
          setId(0);
        },
      },
      {
        icon: VideoCameraOutlined,
        tooltipTitle: t('video-call'),
        handleClick: function () {
          setId(1);
        },
      },
      {
        icon: UserOutlined,
        tooltipTitle: t('user-info'),
        handleClick: function () {
          setOpen(true);
        },
      },
    ];
  }, [t]);

  return (
    <div className="chat-header">
      <div className="user-info">
        <Avatar
          path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
          imgWidth={35}
          username="A"
          className="user-info__avatar"
        />
        <Title level={5} className="user-info__name" onClick={handleClickuser}>
          Danh Huy
        </Title>
        <div className="user-info__status">
          <CheckCircleFilled className="status__icon" />
        </div>
      </div>
      <div className="group-aciton">
        <div className="search-action">
          <Dropdown
            autoFocus={true}
            overlay={<InputDropdown />}
            trigger={['click']}
            placement="bottomRight"
            className={'search-action__dropdown'}
          >
            <Tooltip tooltipTitle={t('search')} placement="bottom">
              <SearchOutlined className="custom-chat-icon" />
            </Tooltip>
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
            <Tooltip tooltipTitle={t('setting')} placement="bottom">
              <EllipsisOutlined className="custom-chat-icon" />
            </Tooltip>
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
