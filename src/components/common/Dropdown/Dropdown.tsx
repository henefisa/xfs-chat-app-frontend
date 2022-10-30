import * as React from 'react';
import clsx from 'clsx';
import { Dropdown as ADropdown, Space, DropDownProps } from 'antd';

import './Dropdown.scss';

interface IDropDownProps extends DropDownProps {
  className?: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<IDropDownProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <ADropdown className={clsx('dropdown', className)} {...rest}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>{children}</Space>
      </a>
    </ADropdown>
  );
};

export default Dropdown;
