import * as React from 'react';
import clsx from 'clsx';
import { Avatar as AAvatar, AvatarProps } from 'antd';

import './Avatar.scss';

interface IAvatarProps extends AvatarProps {
  imgPath?: string;
  userName: string;
  imgWidth: number;
  className?: string;
}

const Avatar: React.FC<IAvatarProps> = ({
  imgPath,
  userName,
  imgWidth,
  className,
  ...rest
}) => {
  return (
    <AAvatar
      className={clsx('avatar', className)}
      src={imgPath}
      size={imgWidth}
      {...rest}
    >
      {userName}
    </AAvatar>
  );
};

export default Avatar;
