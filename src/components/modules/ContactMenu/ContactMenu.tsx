import * as React from 'react';
import { MenuProps } from 'antd';
import Menu from '@common/Menu/Menu';
import { useTranslation } from 'react-i18next';

import {
  ShareAltOutlined,
  StopOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import { selectDarkLight } from 'src/store/darkLightSlice';
import { useAppSelector } from 'src/store/hooks';
import clsx from 'clsx';

import './ContactMenu.scss';

interface IContactMenuProps extends MenuProps {}

const ContactMenu: React.FC<IContactMenuProps> = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.contacts' });

  const isDark = useAppSelector(selectDarkLight);

  const menu: MenuProps['items'] = [
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title" level={5}>
            {t('menu-share')}
          </Title>
          <ShareAltOutlined className="menu-item__icon" />
        </Button>
      ),
      key: 0,
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title" level={5}>
            {t('menu-block')}
          </Title>
          <StopOutlined className="menu-item__icon" />
        </Button>
      ),
      key: 1,
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title" level={5}>
            {t('menu-remove')}
          </Title>
          <DeleteOutlined className="menu-item__icon" />
        </Button>
      ),
      key: 2,
    },
  ];

  return (
    <Menu
      className={clsx('contact-menu', { 'dark-mode': isDark })}
      items={menu}
    />
  );
};

export default ContactMenu;
