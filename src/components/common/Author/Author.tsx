import * as React from 'react';
import { HeartFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './Author.scss';

const Author: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <div className="author">
      {t('author-title')}
      <HeartFilled className="author__heart-icon" /> {t('author')}
    </div>
  );
};

export default Author;
