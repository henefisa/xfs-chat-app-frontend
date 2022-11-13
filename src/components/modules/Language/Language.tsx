import * as React from 'react';
import Title from '@common/Title/Title';
import LanguageDropDown from '@modules/LanguageDropDown/LanguageDropDown';
import { useTranslation } from 'react-i18next';

import './Language.scss';

const Language: React.FC = () => {
  const { t } = useTranslation('languages');

  return (
    <div className="language">
      <Title className="language__title" level={5}>
        {t('title')}
      </Title>
      <LanguageDropDown placement="bottomLeft" className="language__menu" />
    </div>
  );
};

export default Language;
