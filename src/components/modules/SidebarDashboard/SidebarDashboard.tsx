import * as React from 'react';
import { selectNavBar } from 'src/store/navbarSlice';
import { useAppSelector } from 'src/store/hooks';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import SidebarContacts from '../SidebarContacts/SidebarContacts';
import SidebarGroups from '../SidebarGroups/SidebarGroups';
import SidebarChats from '../SidebarChats/SidebarChats';
import SidebarSettings from '../SidebarSettings/SidebarSettings';

import './SidebarDashboard.scss';

const SidebarDashboard: React.FC = () => {
  const navbarAction = useAppSelector(selectNavBar);

  return (
    <div className="sidebar">
      {navbarAction === 0 && <SidebarProfile />}
      {navbarAction === 1 && <SidebarChats />}
      {navbarAction === 2 && <SidebarGroups />}
      {navbarAction === 3 && <SidebarContacts />}
      {navbarAction === 4 && <SidebarSettings />}
    </div>
  );
};

export default SidebarDashboard;
