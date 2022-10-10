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
  inputValue?: string;
  className?: string;
  placeholder?: string;
  inputDefaultValue?: string;
  inputOnChange?: (value: string) => void;
}

const WrapperInput: React.FC<IWrapperInputProps> = ({
  PrefixIcon,
  inputType,
  inputValue,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputOnChange) {
      inputOnChange(e.target.value);
    }
  };

  return (
    <div className="wrapper-input" {...rest}>
      <div className="prefix-icon">
        <PrefixIcon />
      </div>
      <InputComp
        className={clsx('suffix-input', className)}
        placeholder={placeholder}
        defaultValue={inputDefaultValue}
        value={inputValue ? inputValue : inputDefaultValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default WrapperInput;
