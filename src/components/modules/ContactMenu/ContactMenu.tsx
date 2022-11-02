import * as React from 'react';
import { Menu, MenuProps } from 'antd';
import {
  ShareAltOutlined,
  StopOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import Title from '@common/Title/Title';
import Button from '@common/Button/Button';

import './ContactMenu.scss';

interface IContactMenuProps extends MenuProps {}

const menu: MenuProps['items'] = [
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title" level={5}>
          Share
        </Title>
        <ShareAltOutlined className="icon" />
      </Button>
    ),
    key: 0,
  },
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title" level={5}>
          Block
        </Title>
        <StopOutlined className="icon" />
      </Button>
    ),
    key: 1,
  },
  {
    label: (
      <Button className="menu-item">
        <Title className="menu-item__title" level={5}>
          Remove
        </Title>
        <DeleteOutlined className="icon" />
      </Button>
    ),
    key: 2,
  },
];

const ContactMenu: React.FC<IContactMenuProps> = () => {
  return <Menu className="contact-menu" items={menu} />;
};

export default ContactMenu;
