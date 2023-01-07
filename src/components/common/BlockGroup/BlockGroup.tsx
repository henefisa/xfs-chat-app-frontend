import clsx from 'clsx';
import * as React from 'react';
import { selectDarkLight } from 'src/store/darkLightSlice';
import { useAppSelector } from 'src/store/hooks';

import './BlockGroup.scss';

interface BlockGroupProps {
  avtTitle: string;
  name: string;
  pill: string;
}

const BlockGroup: React.FC<BlockGroupProps> = ({ avtTitle, name, pill }) => {
  const isDark = useAppSelector(selectDarkLight);
  return (
    <div className={clsx('block-group', { 'dark-mode': isDark })}>
      <div className="block-group__avatar">
        <span>{avtTitle}</span>
      </div>
      <div className="block-group__name">
        <div className="title">{name}</div>
        <div className="pill">{pill}</div>
      </div>
    </div>
  );
};

export default BlockGroup;
