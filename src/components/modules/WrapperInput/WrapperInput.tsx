import React from 'react';

import Input from '@common/Input/Input';
import InputPassword from '@common/Input/InputPassword';

import './WrapperInput.scss';

interface IIconProps {
  className?: string;
}

interface IWrapperInputProps {
  PrefixIcon: React.FC<IIconProps>;
  inputType: string;
  className?: string;
  placeholder?: string;
  inputDefaultValue?: string;
}

const WrapperInput: React.FC<IWrapperInputProps> = ({
  PrefixIcon,
  inputType,
  className,
  placeholder,
  inputDefaultValue,
  ...rest
}) => {
  let InputComp = Input;
  if (inputType === 'text' || inputType === 'email') {
    InputComp = Input;
  } else if (inputType === 'password') {
    InputComp = InputPassword;
  }

  return (
    <div className='login-input' {...rest}>
      <div className='wrapper-prefix-icon'>
        <PrefixIcon className='prefix-icon' />
      </div>
      <InputComp className={className} placeholder={placeholder} defaultValue={inputDefaultValue} />
    </div>
  );
};

export default WrapperInput;
