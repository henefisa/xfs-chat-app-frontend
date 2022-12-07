import clsx from 'clsx';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Title from '@common/Title/Title';

import './Logo.scss';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className, ...rest }) => {
  return (
    <Link to="/" className={clsx('logo', className)} {...rest}>
      <img
        className="logo__img"
        src="/images/logos/logo.svg"
        alt="Chat App Logo"
      />
      <Title className="app-name" level={4}>
        RVK Chat App
      </Title>
    </Link>
  );
};

export default Logo;
