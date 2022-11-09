import * as React from 'react';
import clsx from 'clsx';
import Title from '../Title/Title';

import './Logo.scss';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className, ...rest }) => {
  return (
    <div className={clsx('logo', className)} {...rest}>
      <img
        className="logo__img"
        src="/images/logos/logo.svg"
        alt="Chat App Logo"
      />
      <Title className="app-name" level={4}>
        RVK Chat App
      </Title>
    </div>
  );
};

export default Logo;
