import * as React from 'react';
import clsx from 'clsx';

import './Card.scss';

interface ICardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<ICardProps> = ({ className, ...rest }) => {
  return <div className={clsx('card', className)} {...rest}></div>;
};

export default Card;
