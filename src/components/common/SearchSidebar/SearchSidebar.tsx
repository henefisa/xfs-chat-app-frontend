import * as React from 'react';
import Input from '../Input/Input';

import { SearchOutlined } from '@ant-design/icons';

import './SearchSidebar.scss';

interface SearchSidebarProps {
  placeholder: string;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({ placeholder }) => {
  return (
    <div className="search-sidebar">
      <Input className="search-sidebar__input" placeholder={placeholder} />
      <span>
        <SearchOutlined className="search-sidebar__icon" />
      </span>
    </div>
  );
};

export default SearchSidebar;
