import React from 'react';
import Title from 'src/components/common/Title/Title';
import { useTranslation } from 'react-i18next';
import Button from '@common/Button/Button';
import Conversation from '@common/Conversation/Conversation';

import './ArchiveConversation.scss';
const ArchiveConversation = () => {
  const { t } = useTranslation('dashboard', { keyPrefix: 'sidebar.archive' });
  return (
    <div className="archive">
      <div className="archive__header">
        <Title level={4} className="archive-heading">
          {t('archive-store')}
        </Title>
      </div>
      <div className="archive__content">
      </div>
    </div>
  );
};

export default ArchiveConversation;
