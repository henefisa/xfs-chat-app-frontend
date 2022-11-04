import * as React from 'react';
import { selectNavBar } from 'src/store/navbarSlice';
import { useAppSelector } from 'src/store/hooks';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import SidebarContacts from '../SidebarContacts/SidebarContacts';
import SidebarGroups from '../SidebarGroups/SidebarGroups';
import SidebarChats from '../SidebarChats/SidebarChats';

import './SidebarDashboard.scss';

const SidebarDashboard: React.FC = () => {
  const navbarAction = useAppSelector(selectNavBar);

  return (
    <div className="sidebar">
      {navbarAction === 'Profile' && <SidebarProfile />}
      {navbarAction === 'Chats' && <SidebarChats />}
      {navbarAction === 'Groups' && <SidebarGroups />}
      {navbarAction === 'Contacts' && <SidebarContacts />}
    </div>
  );
};

export default SidebarDashboard;
