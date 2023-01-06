import clsx from 'clsx';
import * as React from 'react';
import Input from '@common/Input/Input';

import { SearchOutlined } from '@ant-design/icons';
import { useAppSelector } from 'src/store/hooks';
import { selectDarkLight } from 'src/store/darkLightSlice';

import './SearchSidebar.scss';

interface SearchSidebarProps {
  placeholder: string;
  className?: string;
  onChange?: (value: string) => void;
}

const SearchSidebar: React.FC<SearchSidebarProps> = ({
  className,
  placeholder,
  onChange,
}) => {
  const isDark = useAppSelector(selectDarkLight);
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    onChange(e.target.value);
  };

  return (
    <div className={clsx('search-sidebar', { 'dark-mode': isDark }, className)}>
      <Input
        className="search-sidebar__input"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <span>
        <SearchOutlined className="search-sidebar__icon" />
      </span>
    </div>
  );
};

export default SearchSidebar;
