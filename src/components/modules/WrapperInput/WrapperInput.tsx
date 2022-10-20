import * as React from 'react';
import clsx from 'clsx';

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
  inputOnChange?: (value: string) => void;
}

const WrapperInput: React.FC<IWrapperInputProps> = ({
  PrefixIcon,
  inputType,
  className,
  placeholder,
  inputDefaultValue,
  inputOnChange,
  ...rest
}) => {
  let InputComp = Input;
  if (inputType === 'text' || inputType === 'email') {
    InputComp = Input;
  } else if (inputType === 'password') {
    InputComp = InputPassword;
  }

  return (
    <div className="wrapper-input" {...rest}>
      <div className="prefix-icon">
        <PrefixIcon />
      </div>
      <InputComp
        className={clsx('suffix-input', className)}
        placeholder={placeholder}
        defaultValue={inputDefaultValue}
        onChange={(e) => {
          if (inputOnChange) {
            inputOnChange(e.target.value);
          }
        }}
      />
    </div>
  );
};

export default WrapperInput;