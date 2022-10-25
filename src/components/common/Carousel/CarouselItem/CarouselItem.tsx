import * as React from 'react';
import Avatar from '../../Avatar/Avatar';

import './CarouselItem.scss';

const CarouselItem: React.FC = () => {
  return (
    <div className="carousel-item">
      <div className="carousel-item__avatar">
        <Avatar
          path="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
          imgWidth={35.2}
          userName="Patrick"
          className="custom-avatar"
        />
        <span className="carousel-item__status" />
      </div>
      <h5>Patrick</h5>
    </div>
  );
};

export default CarouselItem;
