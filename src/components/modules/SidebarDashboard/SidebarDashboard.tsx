import * as React from 'react';

import './SidebarDashboard.scss';
import SidebarGroups from '../SidebarGroups/SidebarGroups';

const SidebarDashboard: React.FC = () => {
  return (
    <div className="sidebar">
      <SidebarGroups/>
    </div>
  );
};

export default SidebarDashboard;
