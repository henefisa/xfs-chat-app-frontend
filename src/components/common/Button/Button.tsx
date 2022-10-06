import * as React from 'react';
import { ButtonProps, Button as AButton } from 'antd';
import clsx from 'clsx';

import './Button.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IButtonProps extends ButtonProps {}

const Button: React.FC<IButtonProps> = ({ className, ...rest }) => {
  return <AButton className={clsx('button', className)} {...rest} />;
};

export default Button;
