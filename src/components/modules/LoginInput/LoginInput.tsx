import React, { FunctionComponent } from 'react';
import { InputProps } from 'antd';
import clsx from 'clsx';

import './LoginInput.scss';

interface IInputProps extends InputProps {}

interface IIconProps {
  className?: string;
}

interface ILoginInputProps {
  PrefixIcon: React.FC<IIconProps>;
  SuffixInput: FunctionComponent<IInputProps>;
  className?: string;
  placeholder?: string;
  inputDefaultValue?: string;
}

const LoginInput: React.FC<ILoginInputProps> = ({
  PrefixIcon,
  SuffixInput,
  className,
  placeholder,
  inputDefaultValue,
  ...rest
}) => {
  return (
    <div className='login-input' {...rest}>
      <div className='wrapper-prefix-icon'>
        <PrefixIcon className='prefix-icon' />
      </div>
      <SuffixInput
        className={clsx('suffix-input', className)}
        placeholder={placeholder}
        defaultValue={inputDefaultValue}
      />
    </div>
  );
};

export default LoginInput;
