import * as React from 'react';
import { selectNavBar } from 'src/store/navbarSlice';
import { useAppSelector } from 'src/store/hooks';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import SidebarContacts from '../SidebarContacts/SidebarContacts';
import SidebarGroups from '../SidebarGroups/SidebarGroups';
import SidebarChats from '../SidebarChats/SidebarChats';
import SidebarSettings from '../SidebarSettings/SidebarSettings';
import SidebarSearchUsers from '../SidebarSearchUsers/SidebarSearchUsers';

import './SidebarDashboard.scss';

const SidebarDashboard: React.FC = () => {
  const navbarAction = useAppSelector(selectNavBar);

  return (
    <div className="sidebar">
      {navbarAction === 'profile' && <SidebarProfile />}
      {navbarAction === 'chats' && <SidebarChats />}
      {navbarAction === 'groups' && <SidebarGroups />}
      {navbarAction === 'contacts' && <SidebarContacts />}
      {navbarAction === 'settings' && <SidebarSettings />}
    </div>
  );
};

export default SidebarDashboard;
