import * as React from 'react';
import clsx from 'clsx';
import { useState } from 'react';

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

  const [inputValue, setInputValue] = useState('');

  return (
    <div className="wrapper-input" {...rest}>
      <div className="wrapper-input__prefix">
        <PrefixIcon className="wrapper-input__prefix-icon" />
      </div>
      <InputComp
        className={clsx('wrapper-input__suffix-input', className)}
        placeholder={placeholder}
        defaultValue={inputDefaultValue}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (inputOnChange) {
            inputOnChange(e.target.value);
          }
        }}
      />
    </div>
  );
};

export default WrapperInput;
