import * as React from 'react';
import { InputProps, Input as AInput } from 'antd';
import clsx from 'clsx';

import './Input.scss';

export interface IInputPasswordProps extends InputProps {}

const InputPassword: React.FC<IInputPasswordProps> = ({
  className,
  ...rest
}) => {
  return (
    <AInput.Password
      className={clsx('input', 'input-password', className)}
      {...rest}
    />
  );
};

export default InputPassword;
