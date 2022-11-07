import * as React from 'react';
import { Switch as ASwitch, SwitchProps } from 'antd';
import clsx from 'clsx';
import { SwitchChangeEventHandler } from 'antd/lib/switch';

import './Switch.scss';

interface ISwitchProps extends SwitchProps {
  className?: string;
  onChange?: SwitchChangeEventHandler;
}

const Switch: React.FC<ISwitchProps> = ({ className, onChange, ...rest }) => {
  return (
    <ASwitch
      className={clsx('switch', className)}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Switch;
