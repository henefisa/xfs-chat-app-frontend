import * as React from 'react';
import { selectNavBar } from 'src/store/navbarSlice';
import { useAppSelector } from 'src/store/hooks';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import SidebarContacts from '../SidebarContacts/SidebarContacts';
import SidebarGroups from '../SidebarGroups/SidebarGroups';
import SidebarChats from '../SidebarChats/SidebarChats';
import SidebarSettings from '../SidebarSettings/SidebarSettings';
import SidebarSearchUsers from '../SidebarSearchUsers/SidebarSearchUsers';
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
      {navbarAction === ENavbar.SETTINGS && <SidebarSettings />}
    </div>
  );
};

export default SidebarDashboard;
