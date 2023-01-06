import * as React from 'react';
import { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

import Title from '@common/Title/Title';
import Button from '@common/Button/Button';
import Menu from '@common/Menu/Menu';
import { selectDarkLight } from 'src/store/darkLightSlice';
import { useAppSelector } from 'src/store/hooks';

import './ProfileMenu.scss';
import clsx from 'clsx';

interface IProfileMenuProps extends MenuProps {}

const ProfileMenu: React.FC<IProfileMenuProps> = () => {
  const { t } = useTranslation('common');
  const isDark = useAppSelector(selectDarkLight);

  const menu: MenuProps['items'] = React.useMemo(() => {
    return [
      {
        label: (
          <Button className="menu-item">
            <Title className="menu-item__title" level={5}>
              {t('edit')}
            </Title>
          </Button>
        ),
        key: 0,
      },
      {
        label: (
          <Button className="menu-item">
            <Title className="menu-item__title" level={5}>
              {t('action')}
            </Title>
          </Button>
        ),
        key: 1,
      },
      {
        type: 'divider',
      },
      {
        label: (
          <Button className="menu-item">
            <Title className="menu-item__title" level={5}>
              {t('another-action')}
            </Title>
          </Button>
        ),
        key: 2,
      },
    ];
  }, [t]);

  return (
    <Menu
      className={clsx('profile-menu', { 'dark-mode': isDark })}
      items={menu}
    />
  );
};

export default ProfileMenu;
