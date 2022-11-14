import * as React from 'react';
import { ScrollContainer } from 'react-indiana-drag-scroll';

import './Carousel.scss';

interface Children {
  children: React.ReactNode;
}

const Carousel: React.FC<Children> = ({ children }) => {
  return <ScrollContainer className="carousel">{children}</ScrollContainer>;
};

export default Carousel;
