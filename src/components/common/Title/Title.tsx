import * as React from 'react';
import { Typography } from 'antd';
import clsx from 'clsx';

type TitleProps = React.ComponentProps<typeof Typography.Title>;

interface ITitleProps extends TitleProps {}

const Title: React.FC<ITitleProps> = ({ className, ...rest }) => {
  return <Typography.Title className={clsx('title', className)} {...rest} />;
};

export default Title;
