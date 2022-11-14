import * as React from 'react';
import { InputProps, Input as AInput, InputRef } from 'antd';
import clsx from 'clsx';

import './Input.scss';

export interface IInputProps extends InputProps {}

type Ref = InputRef;

const Input = React.forwardRef<Ref, IInputProps>(
  ({ className, ...rest }, ref) => {
    return <AInput className={clsx('input', className)} ref={ref} {...rest} />;
  }
);

Input.displayName = 'Input';

export default Input;
