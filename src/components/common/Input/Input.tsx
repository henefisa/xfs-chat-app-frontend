import * as React from "react";
import { InputProps, Input as AInput } from "antd";
import clsx from "clsx";

import "./Input.scss";

interface IInputProps extends InputProps {}

const Input: React.FC<IInputProps> = ({ className, ...rest }) => {
  return <AInput className={clsx("input", className)} {...rest} />;
};

export default Input;
