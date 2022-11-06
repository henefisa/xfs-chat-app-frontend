import * as React from 'react';
import { Menu as AMenu, MenuProps } from 'antd';
import clsx from 'clsx';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

import './Menu.scss';

interface IMenuProps extends MenuProps {
  className: string;
  items: ItemType[];
  onClick?: MenuClickEventHandler;
}

const Menu: React.FC<IMenuProps> = ({ className, items, onClick, ...rest }) => {
  return (
    <AMenu
      className={clsx('menu', className)}
      items={items}
      onClick={onClick}
      {...rest}
    />
  );
};

export default Menu;
