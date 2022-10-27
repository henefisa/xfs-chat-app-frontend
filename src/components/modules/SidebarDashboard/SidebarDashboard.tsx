import * as React from 'react';

import './SidebarDashboard.scss';
import SidebarChats from '../SidebarChats/SidebarChats';
import SidebarProfile from '../SidebarProfile/SidebarProfile';
import SidebarGroups from '../SidebarGroups/SidebarGroups';

const SidebarDashboard: React.FC = () => {
  return (
    <div className="sidebar">
      {/* <SidebarProfile/> */}
      {/* <SidebarChats/> */}
      <SidebarGroups/>
    </div>
  );
};

export default SidebarDashboard;
