import { Spin as ASpin, SpinProps } from 'antd';
import clsx from 'clsx';
import * as React from 'react';

import './Spin.scss';

interface ISpinProps extends SpinProps {
  className?: string;
  spinIcon?: React.ReactElement;
}

const Spin: React.FC<ISpinProps> = ({ className, spinIcon, ...rest }) => {
  return (
    <ASpin className={clsx('spin', className)} indicator={spinIcon} {...rest} />
  );
};

export default Spin;
