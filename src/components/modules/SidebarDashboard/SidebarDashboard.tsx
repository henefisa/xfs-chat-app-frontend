import * as React from 'react';
import SidebarProfile from '@modules/SidebarProfile/SidebarProfile';

import './SidebarDashboard.scss';
import SidebarChats from '../SidebarChats/SidebarChats';

const SidebarDashboard: React.FC = () => {
  return (
    <div className="sidebar">
      {/* <SidebarProfile /> */}
      <SidebarChats/>
    </div>
  );
};

export default SidebarDashboard;
