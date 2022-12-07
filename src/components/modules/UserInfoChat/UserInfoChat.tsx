import {
  CheckCircleFilled,
  CloseOutlined,
  PaperClipOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Title from '@common/Title/Title';
import { Collapse, Divider } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';
import {
  selectFriend,
  selectConversation,
  selectUserProfile,
} from 'src/store/userSlice';
import AttachedFileItem from '../AttachedFileItem/AttachedFileItem';
import getMemberConversation from 'src/utils/getMemberConversation';
import getGroupTitle from 'src/utils/getGroupTitle';
import AvatarGroupChat from '../AvatarGroupChat/AvatarGroupChat';

import './UserInfoChat.scss';

const { Panel } = Collapse;

interface IUserInfoChat {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserInfoChat: React.FC<IUserInfoChat> = ({ setClose }) => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.user-info-chat',
  });
  const { t: t1 } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.user-info-chat.about',
  });

  const date = new Date();
  const { selectedFriend } = useAppSelector(selectFriend);
  const [hasConversation, setHasConversation] = React.useState<boolean>(false);

  const { selectedConversation } = useAppSelector(selectConversation);
  const userProfileStore = useAppSelector(selectUserProfile);
  const name = selectedFriend?.fullName ?? selectedFriend?.username;
  const nameMember =
    getMemberConversation(selectedConversation, userProfileStore)?.fullName ??
    getMemberConversation(selectedConversation, userProfileStore)?.username ??
    selectedFriend?.fullName ??
    selectedFriend?.username;
  React.useEffect(() => {
    selectedConversation ? setHasConversation(true) : setHasConversation(false);
  }, [selectedConversation]);

  const userInfoChat = [
    {
      title: t1('name'),
      desc: nameMember || selectedConversation?.title,
    },
    {
      title: 'Email',
      desc:
        getMemberConversation(selectedConversation, userProfileStore)?.email ||
        selectedFriend?.email,
    },
    { title: t1('time'), desc: `${date.getHours()}:${date.getMinutes()}` },
    {
      title: t1('location'),
      desc:
        getMemberConversation(selectedConversation, userProfileStore)
          ?.location ||
        selectedFriend?.location ||
        'SomeWhere',
    },
  ];

  const listAttachedFile = [
    {
      name: 'Admin-A.zip',
      type: 'zip',
      size: '12.9 MB',
    },
    {
      name: 'Image-1.jpg',
      type: 'jpg',
      size: '4.5 MB',
    },
    {
      name: 'Image-2.jpg',
      type: 'jpg',
      size: '3.6 MB',
    },
    {
      name: 'Landing-A.zip',
      type: 'zip',
      size: '6.4 MB',
    },
  ];

  return (
    <div className="sidebar-user">
      <div className="header-user">
        <Button className="header-user__btn" onClick={() => setClose(false)}>
          <CloseOutlined />
        </Button>
      </div>
      <div className="user-avatar">
        {hasConversation ? (
          <>
            {selectedConversation?.isGroup ? (
              <>
                <AvatarGroupChat
                  conversation={selectedConversation}
                  imgWidth={26}
                />
                <Title level={5} className="username">
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
                  imgWidth={96}
                  username={nameMember?.charAt(0).toUpperCase()}
                  className="custom-avatar"
                />
                <Title level={5} className="username">
                  {selectedConversation?.title || nameMember}
                </Title>
              </>
            )}
          </>
        ) : (
          <>
            <Avatar
              path={selectedFriend?.avatar}
              imgWidth={96}
              username={name?.charAt(0).toUpperCase()}
              className="custom-avatar"
            />
            <Title level={5} className="username">
              {name}
            </Title>
          </>
        )}
        <div className="status">
          <CheckCircleFilled className="status__icon" />
          <Title level={5} className="status__name">
            {t('active')}
          </Title>
        </div>
      </div>
      <Divider />
      <div className="content-profile">
        <Title className="description" level={5}>
          {selectedFriend?.description || 'Hello, have a nice day at work!'}
        </Title>
        <Collapse
          bordered={false}
          expandIconPosition="end"
          className="user-info"
        >
          <Panel
            className="user-info__panel"
            header={
              <div className="panel-header">
                <UserOutlined className="panel-header__icon" />
                <Title level={5} className="panel-header__title">
                  {t1('title')}
                </Title>
              </div>
            }
            key="1"
          >
            <ul className="panel-inner">
              {userInfoChat.map((item, index) => (
                <li key={index} className="info-item">
                  <Title level={5} className="info-item__title">
                    {item.title}
                  </Title>
                  <Title level={5} className="info-item__desc">
                    {item.desc}
                  </Title>
                </li>
              ))}
            </ul>
          </Panel>
        </Collapse>
        <Collapse
          bordered={false}
          expandIconPosition="end"
          className="attached"
        >
          <Panel
            className="attached__panel"
            header={
              <div className="panel-header">
                <PaperClipOutlined className="panel-header__icon" />
                <Title level={5} className="panel-header__title">
                  {t('attached-file')}
                </Title>
              </div>
            }
            key="1"
          >
            <div className="list-file">
              {listAttachedFile.map((item, index) => (
                <AttachedFileItem key={index} item={item} />
              ))}
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default UserInfoChat;
