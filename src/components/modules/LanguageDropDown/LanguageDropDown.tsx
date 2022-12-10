import { GlobalOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import * as React from 'react';
import Dropdown from '@common/Dropdown/Dropdown';
import LanguageMenu from '@modules/LanguageMenu/LanguageMenu';

import './LanguageDropDown.scss';

interface ILanguageDropDownProps {
  className?: string;
  placement:
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'topCenter'
    | 'bottomCenter'
    | undefined;
}

const LanguageDropDown: React.FC<ILanguageDropDownProps> = ({
  className,
  placement,
}) => {
  return (
    <Dropdown
      overlay={<LanguageMenu />}
      trigger={['click']}
      placement={placement}
      className={clsx('custom-dropdown-menu', className)}
    >
      <GlobalOutlined />
    </Dropdown>
  );
};

export default LanguageDropDown;
