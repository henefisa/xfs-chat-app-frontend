import * as React from 'react';
import clsx from 'clsx';
import { Avatar as AAvatar, AvatarProps } from 'antd';

import './Avatar.scss';

interface IAvatarProps extends AvatarProps {
  path?: string | null;
  username?: string;
  imgWidth: number;
  className?: string;
}

const Avatar: React.FC<IAvatarProps> = ({
  path,
  username,
  imgWidth,
  className,
  ...rest
}) => {
  return (
    <AAvatar
      className={clsx('avatar', className)}
      src={path}
      size={imgWidth}
      {...rest}
    >
      {username}
    </AAvatar>
  );
};

export default Avatar;
