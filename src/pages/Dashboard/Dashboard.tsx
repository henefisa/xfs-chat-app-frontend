import * as React from 'react';
import NavbarDash from '@modules/NavbarDash/NavbarDash';

import './Dashboard.scss';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <NavbarDash />
      <div className="side-bar">Sidebar</div>
      <div className="chat-ui">Chat UI</div>
    </div>
  );
};

export default Dashboard;
