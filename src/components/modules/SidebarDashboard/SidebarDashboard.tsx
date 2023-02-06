import SidebarChats from '@modules/SidebarChats/SidebarChats';
import SidebarContacts from '@modules/SidebarContacts/SidebarContacts';
import SidebarGroups from '@modules/SidebarGroups/SidebarGroups';
import SidebarProfile from '@modules/SidebarProfile/SidebarProfile';
import SidebarSearchUsers from '@modules/SidebarSearchUsers/SidebarSearchUsers';
import Notification from '../Notification/Notification';
import clsx from 'clsx';
import * as React from 'react';
import ENavbar from 'src/interfaces/ENavbar';
import { selectDarkLight } from 'src/store/darkLightSlice';
import { useAppSelector } from 'src/store/hooks';
import { selectNavBar } from 'src/store/navbarSlice';

import './SidebarDashboard.scss';

const SidebarDashboard: React.FC = () => {
  const isDark = useAppSelector(selectDarkLight);
  const navbarAction = useAppSelector(selectNavBar);

  return (
    <div className={clsx('sidebar', { 'dark-mode': isDark })}>
      {navbarAction === ENavbar.NOTIFICATION && <Notification />}
      {navbarAction === ENavbar.PROFILE && <SidebarProfile />}
      {navbarAction === ENavbar.CHATS && <SidebarChats />}
      {navbarAction === ENavbar.GROUPS && <SidebarGroups />}
      {navbarAction === ENavbar.CONTACTS && <SidebarContacts />}
      {navbarAction === ENavbar.SEARCH && <SidebarSearchUsers />}
    </div>
  );
};

export default SidebarDashboard;
