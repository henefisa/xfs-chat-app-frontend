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

import './SidebarProfile.scss';

const { Panel } = Collapse;

const userInfo = [
  { title: 'Name', desc: 'Patricia Smith' },
  { title: 'Email', desc: 'admin@mgail.com' },
  { title: 'Time', desc: '15:30 PM' },
  { title: 'Location', desc: 'Danang, VN' },
];

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
  return (
    <div className="sidebar-profile">
      <div className="header-profile">
        <div className="title">
          <Title level={4}>My Profile</Title>
        </div>
        <div className="actions">
          <Dropdown
            overlay={<ProfileMenu />}
            trigger={['click']}
            placement="bottomRight"
          >
            <MoreOutlined className="actions__menu-icon" />
          </Dropdown>
        </div>
      </div>
      <div className="profile-avatar">
        <Avatar
          path="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/277551484_1607305416300980_1426726336589949572_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NDE6kmkwFQ8AX9-U3bh&_nc_ht=scontent.fdad3-1.fna&oh=00_AT8SGcvhT_y6-Lc16cMBv0OwsUOg0x7ef7Yp1yb_1teoEQ&oe=635BDBD2"
          imgWidth={96}
          userName="A"
          className="custom-avatar"
        />
        <Title level={5} className="username">
          Danh Huy
        </Title>
        <div className="status">
          <CheckCircleFilled className="status__icon" />
          <Title level={5} className="status__name">
            Active
          </Title>
        </div>
      </div>
      <Divider />
      <Title className="description" level={5}>
        If several languages coalesce, the grammar of the resulting language is
        more simple and regular than that of the individual.
      </Title>
      <Collapse bordered={false} expandIconPosition="end" className="user-info">
        <Panel
          className="user-info__panel"
          header={
            <div className="panel-header">
              <UserOutlined className="panel-icon" />
              <Title level={5} className="panel-title">
                About
              </Title>
            </div>
          }
          key="1"
        >
          <ul className="panel-inner">
            {userInfo.map((item, index) => (
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
      <Collapse bordered={false} expandIconPosition="end" className="attached">
        <Panel
          className="attached__panel"
          header={
            <div className="panel-header">
              <PaperClipOutlined className="panel-icon" />
              <Title level={5} className="panel-title">
                Attached Files
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
  );
};

export default SidebarProfile;
