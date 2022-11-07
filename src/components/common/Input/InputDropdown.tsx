import * as React from 'react';
import { Menu, MenuProps } from 'antd';
import Input from './Input';
import clsx from 'clsx';

import './InputDropdown.scss';

interface IMenuProps extends MenuProps {}

const menu: MenuProps['items'] = [
  {
    label: (
      <div className="dropdown-search">
        <Input className="dropdown-search__input" placeholder="Search..." />
      </div>
    ),
    key: 0,
  },
];

const InputDropdown: React.FC<IMenuProps> = ({ className, ...rest }) => {
  return (
    <Menu
      className={clsx('input-dropdown', className)}
      {...rest}
      items={menu}
    />
  );
};

export default InputDropdown;
