import * as React from 'react';
import { selectNavBar } from 'src/store/navbarSlice';
import { useAppSelector } from 'src/store/hooks';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import SidebarContacts from '../SidebarContacts/SidebarContacts';
import SidebarGroups from '../SidebarGroups/SidebarGroups';
import SidebarChats from '../SidebarChats/SidebarChats';
import SidebarSettings from '../SidebarSettings/SidebarSettings';
import SidebarSearchUsers from '../SidebarSearchUsers/SidebarSearchUsers';
import NavbarEnum from 'src/Enum/NavbarEnum';

import './SidebarDashboard.scss';

const SidebarDashboard: React.FC = () => {
  const navbarAction = useAppSelector(selectNavBar);

  return (
    <div className="sidebar">
      {navbarAction === NavbarEnum.Profile && <SidebarProfile />}
      {navbarAction === NavbarEnum.Chat && <SidebarChats />}
      {navbarAction === NavbarEnum.Groups && <SidebarGroups />}
      {navbarAction === NavbarEnum.Contacts && <SidebarContacts />}
      {navbarAction === NavbarEnum.Search && <SidebarSearchUsers />}
      {navbarAction === NavbarEnum.Settings && <SidebarSettings />}
    </div>
  );
};

export default SidebarDashboard;
