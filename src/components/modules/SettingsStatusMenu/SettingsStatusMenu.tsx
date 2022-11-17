import * as React from 'react';
import { MenuProps } from 'antd';

import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import Menu from '@common/Menu/Menu';
import { useTranslation } from 'react-i18next';

import './SettingsStatusMenu.scss';

interface ISettingsStatusMenu extends MenuProps {}

const SettingsMenu: React.FC<ISettingsStatusMenu> = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.settings' });
  const menu: MenuProps['items'] = [
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title" level={5}>
            {t('available')}
          </Title>
        </Button>
      ),
      key: 0,
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title" level={5}>
            {t('busy')}
          </Title>
        </Button>
      ),
      key: 1,
    },
  ];

  return <Menu className="settings-status-menu" items={menu} />;
};

export default SettingsMenu;
