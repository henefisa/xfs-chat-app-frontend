import {
  CheckCircleFilled,
  EllipsisOutlined,
  PhoneOutlined,
  SearchOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import * as React from 'react';

import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Dropdown from '@common/Dropdown/Dropdown';
import InputDropdown from '@common/Input/InputDropdown';
import Title from '@common/Title/Title';
import Tooltip from '@common/Tooltip/Tooltip';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';
import ActionsChatMenu from '@modules/ActionsChatMenu/ActionsChatMenu';
import ChatCall from '@modules/ChatCall/ChatCall';
import {
  selectFriend,
  selectConversation,
  selectUserProfile,
} from 'src/store/userSlice';
import getMemberConversation from 'src/utils/getMemberConversation';
import getGroupTitle from 'src/utils/getGroupTitle';
import AvatarGroupChat from '@modules/AvatarGroupChat/AvatarGroupChat';

import './ChatHeader.scss';

interface IChatHeader {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHeader: React.FC<IChatHeader> = ({ setOpen }) => {
  const [id, setId] = React.useState(-1);
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-header',
  });
  const [hasConversation, setHasConversation] = React.useState<boolean>(false);

  const { selectedFriend } = useAppSelector(selectFriend);
  const { selectedConversation } = useAppSelector(selectConversation);
  const userProfileStore = useAppSelector(selectUserProfile);

  React.useEffect(() => {
    selectedConversation ? setHasConversation(true) : setHasConversation(false);
  }, [selectedConversation]);
  const handleClickuser = () => {
    setOpen(true);
  };

  const name = selectedFriend?.fullName ?? selectedFriend?.username;
  const nameMember =
    getMemberConversation(selectedConversation, userProfileStore)?.fullName ??
    getMemberConversation(selectedConversation, userProfileStore)?.username;
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
        {hasConversation ? (
          <>
            {selectedConversation?.isGroup ? (
              <>
                <AvatarGroupChat
                  conversation={selectedConversation}
                  imgWidth={26}
                />
                <Title
                  level={5}
                  className="user-info__name"
                  onClick={handleClickuser}
                >
                  {selectedConversation.title ||
                    getGroupTitle(selectedConversation, userProfileStore)}
                </Title>
              </>
            ) : (
              <>
                <Avatar
                  path={
                    getMemberConversation(
                      selectedConversation,
                      userProfileStore
                    )?.avatar
                  }
                  imgWidth={46}
                  username={nameMember?.charAt(0).toUpperCase()}
                  className="user-info__avatar"
                />
                <Title
                  level={5}
                  className="user-info__name"
                  onClick={handleClickuser}
                >
                  {selectedConversation?.title || nameMember}
                </Title>
              </>
            )}
          </>
        ) : (
          <>
            <Avatar
              path={selectedFriend?.avatar}
              imgWidth={46}
              username={name?.charAt(0).toUpperCase()}
              className="user-info__avatar"
            />
            <Title
              level={5}
              className="user-info__name"
              onClick={handleClickuser}
            >
              {name}
            </Title>
          </>
        )}
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
