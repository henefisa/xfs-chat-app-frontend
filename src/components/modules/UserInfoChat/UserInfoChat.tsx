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
import { selectFriend } from 'src/store/userSlice';
import AttachedFileItem from '../AttachedFileItem/AttachedFileItem';

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

  const userInfoChat = [
    {
      title: t1('name'),
      desc: selectedFriend?.fullName ?? selectedFriend?.username,
    },
    { title: 'Email', desc: selectedFriend?.email },
    { title: t1('time'), desc: `${date.getHours()}:${date.getMinutes()}` },
    {
      title: t1('location'),
      desc: selectedFriend?.location || 'SomeWhere',
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
        <Avatar
          path={selectedFriend?.avatar}
          imgWidth={96}
          username={
            selectedFriend?.fullName?.charAt(0).toUpperCase() ??
            selectedFriend?.username.charAt(0).toUpperCase()
          }
          className="custom-avatar"
        />
        <Title level={5} className="username">
          {selectedFriend?.fullName ?? selectedFriend?.username}
        </Title>
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
