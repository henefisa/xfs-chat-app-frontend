import * as React from 'react';
import { Divider, Collapse } from 'antd';
import {
  MoreOutlined,
  CheckCircleFilled,
  UserOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import Title from '@common/Title/Title';
import Dropdown from '@common/Dropdown/Dropdown';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import Avatar from '@common/Avatar/Avatar';
import AttachedFileItem from '../AttachedFileItem/AttachedFileItem';
import { useTranslation } from 'react-i18next';

import './SidebarProfile.scss';

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

  const userInfo = React.useMemo(() => {
    return [
      { title: t('name'), desc: 'Patricia Smith' },
      { title: t('email'), desc: 'admin@mgail.com' },
      { title: t('time'), desc: '15:30 PM' },
      { title: t('location'), desc: 'Danang, VN' },
    ];
  }, [t]);

  return (
    <div className="sidebar-profile">
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
          path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
          imgWidth={96}
          username="A"
          className="custom-avatar"
        />
        <Title level={5} className="user-info__name">
          Danh Huy
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
          If several languages coalesce, the grammar of the resulting language
          is more simple and regular than that of the individual.
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
