import * as React from 'react';
import './Carousel.scss';

interface Children {
  children: React.ReactNode;
}

const Carousel: React.FC<Children> = ({ children }) => {
  return <div className="carousel">{children}</div>;
};

export default Carousel;
