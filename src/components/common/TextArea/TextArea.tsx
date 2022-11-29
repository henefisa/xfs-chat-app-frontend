import * as React from 'react';
import clsx from 'clsx';
import { Input as AInput } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import './TextArea.scss';

export interface ITextAreaProps extends TextAreaProps {}

const TextArea: React.FC<ITextAreaProps> = ({ className, ...rest }) => {
  return <AInput.TextArea className={clsx('text-area', className)} {...rest} />;
};

export default TextArea;
