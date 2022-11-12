import * as React from 'react';
import { Divider as ADivider, DividerProps } from 'antd';
import clsx from 'clsx';

import './Divider.scss';

interface IDividerProps extends DividerProps {}

const Divider: React.FC<IDividerProps> = ({ className, ...rest }) => {
  return <ADivider className={clsx('divider', className)} {...rest} />;
};

export default Divider;
