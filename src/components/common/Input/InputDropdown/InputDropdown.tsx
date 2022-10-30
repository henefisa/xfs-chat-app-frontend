import * as React from 'react';
import { Menu, MenuProps } from 'antd';

import Input from '../Input';
import './InputDropdown.scss';
import clsx from 'clsx';

interface IMenuProps extends MenuProps {}

const menu: MenuProps['items'] = [
  {
    label: (
      <div className={clsx('input-dropdwn__search-chat')}>
        <Input className="input-dropdwn__input" placeholder="Search..." />
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
