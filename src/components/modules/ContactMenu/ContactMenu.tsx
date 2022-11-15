import * as React from 'react';
import { MenuProps } from 'antd';
import Menu from '@common/Menu/Menu';

import {
  ShareAltOutlined,
  StopOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import Title from '@common/Title/Title';
import Button from '@common/Button/Button';

import './ContactMenu.scss';

interface IContactMenuProps extends MenuProps {}

const ContactMenu: React.FC<IContactMenuProps> = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.contacts' });

  const menu: MenuProps['items'] = React.useMemo(() => {
    return [
      {
        label: (
          <Button className="menu-item">
            <Title className="menu-item__title" level={5}>
              {t('menu-share')}
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
              {t('menu-block')}
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
              {t('menu-xóa')}
            </Title>
            <DeleteOutlined className="icon" />
          </Button>
        ),
        key: 2,
      },
    ];
  }, []);

  return <Menu className="contact-menu" items={menu} />;
};

export default ContactMenu;
