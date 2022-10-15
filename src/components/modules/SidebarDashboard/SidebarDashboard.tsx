import * as React from 'react';
import SidebarProfile from '@modules/SidebarProfile/SidebarProfile';

import './SidebarDashboard.scss';

const SidebarDashboard: React.FC = () => {
  return (
    <div className="sidebar">
      <SidebarProfile />
    </div>
  );
};

export default SidebarDashboard;
