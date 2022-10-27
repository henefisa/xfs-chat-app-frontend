import * as React from 'react';
import Input from '../Input/Input';

import { SearchOutlined } from '@ant-design/icons';

import './SearchSidebar.scss';

const SearchSidebar: React.FC = () => {
  return (
    <div className="search-sidebar">
      <Input
        className="search-sidebar__input"
        placeholder="Search messages or users"
      />
      <span>
        <SearchOutlined className="search-sidebar__icon" />
      </span>
    </div>
  );
};

export default SearchSidebar;
