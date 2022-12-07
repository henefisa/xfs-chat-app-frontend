import * as React from 'react';
import { ButtonProps, SpinProps, Button as AButton } from 'antd';
import clsx from 'clsx';
import Spin from '@common/Spin/Spin';
import { Loading3QuartersOutlined } from '@ant-design/icons';

import './Button.scss';

interface IButtonProps extends ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  spinSize?: SpinProps['size'];
}

const Button: React.FC<IButtonProps> = ({
  className,
  loading,
  children,
  spinSize,
  ...rest
}) => {
  return (
    <AButton className={clsx('button', className)} disabled={loading} {...rest}>
      {loading ? (
        <Spin
          size={spinSize}
          className="spinner"
          spinIcon={<Loading3QuartersOutlined className="spinner__icon" spin />}
        />
      ) : (
        children
      )}
    </AButton>
  );
};

export default Button;
