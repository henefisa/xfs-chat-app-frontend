import * as React from 'react';
import Avatar from '@common/Avatar/Avatar';
import clsx from 'clsx';
import { selectDarkLight } from 'src/store/darkLightSlice';
import { useAppSelector } from 'src/store/hooks';

import '../Carousel.scss';

interface CarouselItemProps {
  path: string;
  name: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ path, name }) => {
  const isDark = useAppSelector(selectDarkLight);
  return (
    <div className={clsx('carousel-item', { 'dark-mode': isDark })}>
      <div className="carousel-item__avatar">
        <Avatar
          path={path}
          imgWidth={35.2}
          username="Patrick"
          className="custom-avatar"
        />
        <span className="carousel-item__status" />
      </div>
      <h5 className="carousel-item__name">{name}</h5>
    </div>
  );
};

export default CarouselItem;
