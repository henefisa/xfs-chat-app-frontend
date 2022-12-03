import { Avatar } from 'antd';
import { GroupProps } from 'antd/lib/avatar';
import clsx from 'clsx';
import * as React from 'react';

import './Avatar.scss';
interface IAvatarGroupProps extends GroupProps {
  className?: string;
  children: React.ReactNode;
}

const AvatarGroup: React.FC<IAvatarGroupProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <Avatar.Group className={clsx('avatar-group', className)} {...rest}>
      {children}
    </Avatar.Group>
  );
};

export default AvatarGroup;
