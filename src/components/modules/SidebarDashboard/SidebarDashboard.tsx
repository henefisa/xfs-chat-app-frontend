import * as React from 'react';

import './SidebarDashboard.scss';
import SidebarChats from '../SidebarChats/SidebarChats';

const SidebarDashboard: React.FC = () => {
  return (
    <div className="sidebar">
      <SidebarChats/>
    </div>
  );
};

export default SidebarDashboard;
