import {
  AlertOutlined,
  ApiOutlined,
  ContactsOutlined,
  MessageOutlined,
  SearchOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import Avatar from '@common/Avatar/Avatar';
import Button from '@common/Button/Button';
import Dropdown from '@common/Dropdown/Dropdown';
import Tooltip from '@common/Tooltip/Tooltip';
import LanguageDropDown from '@modules/LanguageDropDown/LanguageDropDown';
import UserMenu from '@modules/UserMenu/UserMenu';
import ENavbar from 'src/interfaces/ENavbar';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectNavBar, updateNavbar } from 'src/store/navbarSlice';
import { selectUserProfile } from 'src/store/userSlice';
import { changeDarkLight, selectDarkLight } from 'src/store/darkLightSlice';
import clsx from 'clsx';

import './NavDashboard.scss';

const NavDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navbarIndex = useAppSelector(selectNavBar);
  const userProfileStore = useAppSelector(selectUserProfile);
  const isDark = useAppSelector(selectDarkLight);
  const { t } = useTranslation('dashboard', { keyPrefix: 'navbar' });

  const navBarMenu = React.useMemo(() => {
    return [
      {
        icon: UserOutlined,
        tooltipTitle: t('profile'),
        key: ENavbar.PROFILE,
        path: 'dashboard',
      },
      {
        icon: MessageOutlined,
        tooltipTitle: t('chat'),
        key: ENavbar.CHATS,
        path: 'dashboard',
      },
      {
        icon: UsergroupAddOutlined,
        tooltipTitle: t('groups'),
        key: ENavbar.GROUPS,
        path: 'dashboard',
      },
      {
        icon: ContactsOutlined,
        tooltipTitle: t('contacts'),
        key: ENavbar.CONTACTS,
        path: 'dashboard',
      },
      {
        icon: SearchOutlined,
        tooltipTitle: t('search'),
        key: ENavbar.SEARCH,
        path: 'dashboard',
      },
      {
        icon: UserAddOutlined,
        tooltipTitle: t('invitation'),
        key: ENavbar.INVITATION,
        path: 'dashboard',
      },
      {
        icon: SettingOutlined,
        tooltipTitle: t('settings'),
        key: ENavbar.SETTINGS,
        path: 'settings',
      },
    ];
  }, [t]);

  const handleThemeChange = () => {
    dispatch(changeDarkLight());
  };

  return (
    <div className={clsx('navbar-dash', { 'dark-mode': isDark })}>
      <Link to="/" className="logo">
        <img className="logo__img" src="/images/logos/logo.svg" alt="Logo" />
      </Link>

      <div className="menu-dashboard">
        {navBarMenu.map((item) => {
          const MenuIcon = item.icon;
          return (
            <Button
              key={item.key}
              className="menu-dashboard__btn"
              onClick={() => {
                dispatch(updateNavbar(item.key));
                navigate(`/${item.path}`);
              }}
            >
              <Tooltip
                className={clsx('custom-nav-icon', { 'dark-mode': isDark })}
                placement="top"
                tooltipTitle={item.tooltipTitle}
                isActive={navbarIndex === item.key}
              >
                <MenuIcon />
              </Tooltip>
            </Button>
          );
        })}
      </div>

      <div className="actions-dashboard">
        <div className="actions-dashboard__item">
          <LanguageDropDown
            placement="topRight"
            className={clsx({ 'dark-mode': isDark })}
          />
        </div>
        <div className="actions-dashboard__item">
          <Button className="btn-theme" onClick={handleThemeChange}>
            <Tooltip
              className={clsx('custom-nav-icon', { 'dark-mode': isDark })}
              tooltipTitle={t('dark-light')}
              placement="right"
            >
              {isDark ? <ApiOutlined /> : <AlertOutlined />}
            </Tooltip>
          </Button>
        </div>
        <div className="actions-dashboard__item">
          <Dropdown
            overlay={<UserMenu />}
            trigger={['click']}
            placement="topLeft"
            className={clsx('custom-dropdown-menu', { 'dark-mode': isDark })}
          >
            <Avatar
              path={userProfileStore?.avatar}
              username={
                userProfileStore?.username
                  ? userProfileStore.username.charAt(0).toUpperCase()
                  : ''
              }
              imgWidth={36}
              className="custom-avatar"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default NavDashboard;
