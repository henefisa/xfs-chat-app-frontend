import React, { FunctionComponent } from "react";
import { InputProps } from "antd";
import clsx from "clsx";

import "./LoginInput.scss";

interface IInputProps extends InputProps {}

interface ILoginInputProps {
  PrefixIcon: React.ForwardRefExoticComponent<any>;
  SuffixInput: FunctionComponent<IInputProps>;
  className?: string;
  placeholder?: string;
  dfValue?: string;
}

const LoginInput: React.FC<ILoginInputProps> = ({
  PrefixIcon,
  SuffixInput,
  className,
  placeholder,
  dfValue,
  ...rest
}) => {
  return (
    <div className="login-input" {...rest}>
      <div className="wrapper-prefix-icon">
        <PrefixIcon className="prefix-icon" />
      </div>
      <SuffixInput
        className={clsx("suffix-input", className)}
        placeholder={placeholder}
        defaultValue={dfValue}
      />
    </div>
  );
};

export default LoginInput;
