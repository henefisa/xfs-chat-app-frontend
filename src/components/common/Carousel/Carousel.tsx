import * as React from 'react';
import './Carousel.scss';

interface Children {
  children: any;
}

const Carousel: React.FC<Children> = ({ children }) => {
  return <div className="carousel">{children}</div>;
};

export default Carousel;
