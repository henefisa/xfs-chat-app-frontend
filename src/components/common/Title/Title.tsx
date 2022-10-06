import * as React from 'react';
import { Typography } from 'antd';
import clsx from 'clsx';

type TitleProps = React.ComponentProps<typeof Typography.Title>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITitleProps extends TitleProps {
  className?: string;
}

const Title: React.FC<ITitleProps> = ({ className, ...rest }) => {
  return <Typography.Title className={clsx('title', className)} {...rest} />;
};

export default Title;
