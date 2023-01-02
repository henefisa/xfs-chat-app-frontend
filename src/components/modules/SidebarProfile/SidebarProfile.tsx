import {
  CheckCircleFilled,
  MoreOutlined,
  PaperClipOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Avatar from '@common/Avatar/Avatar';
import Dropdown from '@common/Dropdown/Dropdown';
import Title from '@common/Title/Title';
import { Collapse, Divider } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';
import { selectUserProfile } from 'src/store/userSlice';
import AttachedFileItem from '@modules/AttachedFileItem/AttachedFileItem';
import ProfileMenu from '@modules/ProfileMenu/ProfileMenu';

import './SidebarProfile.scss';
import { selectDarkLight } from 'src/store/darkLightSlice';
import clsx from 'clsx';

const { Panel } = Collapse;

const listAttachedFile = [
  {
    name: 'Admin-A.zip',
    type: 'zip',
    size: '12.5 MB',
  },
  {
    name: 'Image-1.jpg',
    type: 'jpg',
    size: '4.2 MB',
  },
  {
    name: 'Image-2.jpg',
    type: 'jpg',
    size: '3.1 MB',
  },
  {
    name: 'Landing-A.zip',
    type: 'zip',
    size: '6.7 MB',
  },
];

const SidebarProfile: React.FC = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.profile' });
  const isDark = useAppSelector(selectDarkLight);
  const userProfileStore = useAppSelector(selectUserProfile);
  const name = userProfileStore?.fullName ?? userProfileStore?.username;

  const date = new Date();

  const userInfo = React.useMemo(() => {
    return [
      {
        title: t('name'),
        desc: name,
      },
      { title: t('email'), desc: userProfileStore?.email },
      {
        title: t('time'),
        desc: `${date.getHours()}:${date.getMinutes()}`,
      },
      { title: t('location'), desc: userProfileStore?.location ?? 'SomeWhere' },
    ];
  }, [t, userProfileStore]);

  return (
    <div className={clsx('sidebar-profile', { 'dark-mode': isDark })}>
      <div className="header-profile">
        <Title level={4} className="profile-heading">
          {t('heading')}
        </Title>
        <div className="action-menu">
          <Dropdown
            overlay={<ProfileMenu />}
            trigger={['click']}
            placement="bottomRight"
          >
            <MoreOutlined className="actions-menu__icon" />
          </Dropdown>
        </div>
      </div>
      <div className="user-info">
        <Avatar
          path={userProfileStore?.avatar}
          imgWidth={96}
          username={name?.charAt(0).toUpperCase()}
          className="custom-avatar"
        />
        <Title level={5} className="user-info__name">
          {name}
        </Title>
        <div className="user-info__status">
          <CheckCircleFilled className="status-icon" />
          <Title level={5} className="status-title">
            {t('status.online')}
          </Title>
        </div>
      </div>
      <Divider />
      <div className="content-profile">
        <Title className="user-description" level={5}>
          {userProfileStore?.description ?? 'Hello, have a nice day at work!'}
        </Title>
        <Collapse
          bordered={false}
          expandIconPosition="end"
          className="user-profile"
        >
          <Panel
            className="user-profile__panel"
            header={
              <div className="panel-header">
                <UserOutlined className="panel-header__icon" />
                <Title level={5} className="panel-header__title">
                  {t('about')}
                </Title>
              </div>
            }
            key="1"
          >
            <ul className="panel-inner">
              {userInfo.map((item, index) => (
                <li key={index} className="profile-item">
                  <Title level={5} className="profile-item__title">
                    {item.title}
                  </Title>
                  <Title level={5} className="profile-item__desc">
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

export default SidebarProfile;
