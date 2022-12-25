import InvitationList from '@modules/InvitationList/InvitationList';
import SidebarChats from '@modules/SidebarChats/SidebarChats';
import SidebarContacts from '@modules/SidebarContacts/SidebarContacts';
import SidebarGroups from '@modules/SidebarGroups/SidebarGroups';
import SidebarProfile from '@modules/SidebarProfile/SidebarProfile';
import SidebarSearchUsers from '@modules/SidebarSearchUsers/SidebarSearchUsers';
import * as React from 'react';
import ENavbar from 'src/interfaces/ENavbar';
import { useAppSelector } from 'src/store/hooks';
import { selectNavBar } from 'src/store/navbarSlice';

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
      {navbarAction === ENavbar.INVITATION && <InvitationList />}
    </div>
  );
};

export default SidebarDashboard;
