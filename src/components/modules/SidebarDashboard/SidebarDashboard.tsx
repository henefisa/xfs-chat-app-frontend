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
      {navbarAction === ENavbar.Profile && <SidebarProfile />}
      {navbarAction === ENavbar.Chat && <SidebarChats />}
      {navbarAction === ENavbar.Groups && <SidebarGroups />}
      {navbarAction === ENavbar.Contacts && <SidebarContacts />}
      {navbarAction === ENavbar.Search && <SidebarSearchUsers />}
      {navbarAction === ENavbar.Settings && <SidebarSettings />}
    </div>
  );
};

export default SidebarDashboard;
