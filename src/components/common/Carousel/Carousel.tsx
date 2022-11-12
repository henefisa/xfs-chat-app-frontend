import * as React from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import './Carousel.scss';

interface Children {
  children: React.ReactNode;
}

const Carousel: React.FC<Children> = ({ children }) => {
  const ref =
    React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events: draggable } = useDraggable(ref, {
    applyRubberBandEffect: true,
  });

  return (
    <div className="carousel" {...draggable} ref={ref}>
      {children}
    </div>
  );
};

export default Carousel;
