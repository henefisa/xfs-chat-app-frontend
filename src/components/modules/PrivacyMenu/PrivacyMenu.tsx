import * as React from 'react';
import { MenuProps } from 'antd';

import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import Menu from '@common/Menu/Menu';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/store/hooks';
import { selectDarkLight } from 'src/store/darkLightSlice';

import './PrivacyMenu.scss';
import clsx from 'clsx';

interface IPrivacyMenuProps extends MenuProps {}

const PrivacyMenu: React.FC<IPrivacyMenuProps> = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.settings' });
  const isDark = useAppSelector(selectDarkLight);

  const menu: MenuProps['items'] = [
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title" level={5}>
            {t('btn-everyone')}
          </Title>
        </Button>
      ),
      key: 0,
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title" level={5}>
            {t('btn-selected')}
          </Title>
        </Button>
      ),
      key: 1,
    },
    {
      label: (
        <Button className="menu-item">
          <Title className="menu-item__title" level={5}>
            {t('btn-nobody')}
          </Title>
        </Button>
      ),
      key: 2,
    },
  ];

  return (
    <Menu
      className={clsx('privacy-menu', { 'dark-mode': isDark })}
      items={menu}
    />
  );
};

export default PrivacyMenu;
