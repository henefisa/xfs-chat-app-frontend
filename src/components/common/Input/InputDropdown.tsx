import * as React from 'react';
import Input from './Input';
import { useTranslation } from 'react-i18next';

import './InputDropdown.scss';

const InputDropdown: React.FC = () => {
  const { t } = useTranslation('dashboard', {
    keyPrefix: 'chat-ui.chat-header',
  });
  return (
    <div className="dropdown-search">
      <Input
        className="dropdown-search__input"
        placeholder={t('search-dropdown')}
      />
    </div>
  );
};

export default InputDropdown;
