import * as React from 'react';
import Avatar from '../../Avatar/Avatar';

import '../Carousel.scss';

interface CarouselItemProps {
  path: string;
  name: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ path, name }) => {
  return (
    <div className="carousel-item">
      <div className="carousel-item__avatar">
        <Avatar
          path={path}
          imgWidth={35.2}
          userName="Patrick"
          className="custom-avatar"
        />
        <span className="carousel-item__status" />
      </div>
      <h5>{name}</h5>
    </div>
  );
};

export default CarouselItem;
