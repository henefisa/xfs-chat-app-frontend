import { InputRef } from 'antd';
import clsx from 'clsx';
import * as React from 'react';

import Input, { IInputProps } from '@common/Input/Input';
import InputPassword, {
  IInputPasswordProps,
} from '@common/Input/InputPassword';

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
  let InputComp:
    | React.ForwardRefExoticComponent<
        IInputProps & React.RefAttributes<InputRef>
      >
    | React.FC<IInputPasswordProps> = Input;

  switch (inputType) {
    case 'text': {
      InputComp = Input;
      break;
    }
    case 'password': {
      InputComp = InputPassword;
      break;
    }
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
