import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectActionNavBar } from 'src/store/navbarAction';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import SidebarContacts from '../SidebarContacts/SidebarContacts';
import SidebarGroups from '../SidebarGroups/SidebarGroups';
import SidebarChats from '../SidebarChats/SidebarChats';

import './SidebarDashboard.scss';

const SidebarDashboard: React.FC = () => {
  const navbarAction = useSelector(selectActionNavBar);
  console.log(navbarAction);

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
