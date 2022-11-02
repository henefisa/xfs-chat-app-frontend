import * as React from 'react';
import './SidebarDashboard.scss';
import SidebarContacts from '../SidebarContacts/SidebarContacts';

const SidebarDashboard: React.FC = () => {
  return (
    <div className="sidebar">
      <SidebarContacts />
    </div>
  );
};

export default SidebarDashboard;
