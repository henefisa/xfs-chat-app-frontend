import {
  CheckCircleFilled,
  EllipsisOutlined,
  PhoneOutlined,
  SearchOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { useState, useCallback, useMemo } from 'react';
import type { Dispatch, SetStateAction, FC } from 'react';
import Button from '@common/Button/Button';
import Dropdown from '@common/Dropdown/Dropdown';
import InputDropdown from '@common/Input/InputDropdown';
import Tooltip from '@common/Tooltip/Tooltip';
import { useTranslation } from 'react-i18next';
import ActionsChatMenu from '@modules/ActionsChatMenu/ActionsChatMenu';
import ChatCall from '@modules/ChatCall/ChatCall';
import AvatarConversation from 'src/components/modules/AvatarConversation/AvatarConversation';
import './ChatHeader.scss';

interface IChatHeader {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ChatHeader: FC<IChatHeader> = ({ setOpen }) => {
  const [id, setId] = useState(-1);
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-header',
  });

  const onClickuser = useCallback(() => {
    return () => setOpen(true);
  }, []);
  const listActionChat = useMemo(() => {
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
        <AvatarConversation handleOpenDetail={onClickuser()} imgSize={46} />
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
