import * as React from 'react';
import { selectNavBar } from 'src/store/navbarSlice';
import { useAppSelector } from 'src/store/hooks';
import SidebarProfile from '@modules/SidebarProfile/SidebarProfile';
import SidebarContacts from '@modules/SidebarContacts/SidebarContacts';
import SidebarGroups from '@modules/SidebarGroups/SidebarGroups';
import SidebarChats from '@modules/SidebarChats/SidebarChats';
import SidebarSearchUsers from '@modules/SidebarSearchUsers/SidebarSearchUsers';
import ENavbar from 'src/interfaces/ENavbar';

import './SidebarDashboard.scss';

const SidebarDashboard: React.FC = () => {
  const navbarAction = useAppSelector(selectNavBar);

  return (
    <div className="sidebar">
      {navbarAction === ENavbar.PROFILE && <SidebarProfile />}
      {navbarAction === ENavbar.CHATS && <SidebarChats />}
      {navbarAction === ENavbar.GROUPS && <SidebarGroups />}
      {navbarAction === ENavbar.CONTACTS && <SidebarContacts />}
      {navbarAction === ENavbar.SEARCH && <SidebarSearchUsers />}
    </div>
  );
};

export default SidebarDashboard;
